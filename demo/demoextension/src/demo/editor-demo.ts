import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { DemoDispatcher } from './demo-dispatcher';


interface Item {
    key: string;
    title: string;
    description: string;
    value: string;
}

interface Coordinate {
    x: number;
    y: number;
}

// デモ用のドキュメント。整合性を保つ単位で作るべきだが、お試しなのでごった煮。
export class DemoDocument {
    private coords: Coordinate[] = [];
    private items: Item[] = [];

    setValue( key: string, value: string) {
        this.items.filter(item=>item.key = key).map(item => item.value = value);
    }

    addCoord( x: number, y: number) {
        this.coords.push({x: x, y: y});
    }

    clearAllCoords() {
        this.coords = [];
    }
    
    // デモなので適当。本当なら、意味のある塊で型をチェックする
    fromJSON(json: any) {
        if(!json) {
            return;
        }

        if(json.items instanceof Array) {
            const items: Item[] = [];

            for(let item of json.items) {
                // エラーチェックが必要
                items.push( { title: item.title, description: item.description, key: item.key, value: item.value } );
            }

            this.items = items;
        }

        if(json.coords instanceof Array) {
            const coords: Coordinate[] = [];
            for(let coord of json.coords) {
                const x = Number( coord.x );
                const y = Number( coord.y );
                
                coords.push( {x: x, y: y});
            }
            this.coords = coords;
        }
    }

    toJSON(): any {
        return {
            items: this.items,
            coords: this.coords
        };
    }
}

interface Message {
    type: string;
    data?: any;
}

export class EditorProvider implements vscode.CustomTextEditorProvider {
	private static readonly viewType = 'demo.editor';
    public static register(context: vscode.ExtensionContext): vscode.Disposable { 
		const provider = new EditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(EditorProvider.viewType, provider);
		return providerRegistration;
    }
    
    private rootPath: string;
    private html: string;
	constructor(
		private readonly context: vscode.ExtensionContext
	) {
        console.log('construct');
        this.rootPath = path.join(this.context.extensionPath, 'public');
        const htmlPath = path.join(this.rootPath, 'index.html');
        const rootUri = vscode.Uri.file(this.rootPath);
        const tmp = fs.readFileSync( htmlPath, { encoding: 'utf8' } );
        this.html = tmp.replace('<base href="/">', `<base href="${rootUri.with({scheme:'vscode-resource'}).toString()}/">`);
    }

    // どのドキュメントをどのWebviewPanelに開くという情報を貰って、エディタを準備する
	public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
        console.log('resolve');
        let data = new DemoDocument();
        webviewPanel.webview.html = this.html;
        webviewPanel.webview.options = {
            localResourceRoots: [ vscode.Uri.file(this.rootPath) ],
            enableScripts: true
        };

        const dispatcher = new DemoDispatcher();
        dispatcher.register('demo.reopen', () => vscode.commands.executeCommand('demo.reopen-view'));
        dispatcher.register('demo.hello', () => vscode.commands.executeCommand('demo.helloworld'));
        // 保存したらViewに教える
        vscode.workspace.onDidChangeTextDocument( event => {
            const text = event.document.getText();
            if(event.document.uri.toString() !==  document.uri.toString()) {
                return;
            }
            let json = {};
            if (text.trim().length !== 0) {
                try {
                    json = JSON.parse(text);
                } catch {
                    throw new Error('Could not get document as json. Content is not valid json');
                }
            }
            data.fromJSON(json);
            console.log('update!');
            webviewPanel.webview.postMessage( { type: 'updateAll', data: data.toJSON() } );
        } );

        // Viewの変更を反映する
        webviewPanel.webview.onDidReceiveMessage( (msg: Message) => {
            switch(msg.type) {
            case 'editor.set-value':
                data.setValue(msg.data.key, msg.data.value);
                break;
            case 'editor.add-coord':
                data.addCoord(msg.data.x, msg.data.y);
                break;
            case 'editor.save':
                const edit = new vscode.WorkspaceEdit();
                const json = data.toJSON();
                edit.replace(
                    document.uri,
                    new vscode.Range(0, 0, document.lineCount, 0),
                    JSON.stringify(json, null, 2));
                vscode.workspace.applyEdit(edit);
                break;
            case 'editor.ready':
                console.log('editor.ready');
                webviewPanel.webview.postMessage( { type: 'updateAll', data: data.toJSON() } );
                break;
            }
            // とりあえずつけた
            dispatcher.dispatch(msg);
        } );

        const text = document.getText();
        let json = {};
        if (text.trim().length !== 0) {
            try {
                json = JSON.parse(text);
            } catch {
                throw new Error('Could not get document as json. Content is not valid json');
            }
        }
        
        webviewPanel.webview.postMessage( {type: 'demo.goto', data: { id: 'editor' } } );

        data.fromJSON(json);
    }
}
