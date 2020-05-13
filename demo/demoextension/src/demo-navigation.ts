import * as vscode from 'vscode';
export interface Demo {
	id: string;
    title: string;
    children?: Demo[];
}

const demoList: Demo[] = [
	{ id: 'hello', title: 'はじめに' },
	{ id: 'samples', title: 'サンプル', children: [
        { id: 'warning', title: '警告の表示' },
        { id: 'checksheet', title: 'チェックシート' },
        { id: 'jira', title: 'Jiraとの連携' }
    ] },
];

export class DemoProvider implements vscode.TreeDataProvider<Demo> {
    // TreeViewは基本的には静的
    // もし一度出力した内容を変更したければ、onDidChangeTreeDataイベントを提供する
    // https://code.visualstudio.com/api/extension-guides/tree-view
    private _onDidChangeTreeData: vscode.EventEmitter<Demo | undefined> = new vscode.EventEmitter<Demo | undefined>();
    readonly onDidChangeTreeData: vscode.Event<Demo | undefined> = this._onDidChangeTreeData.event;
    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

	constructor() {}
	getChildren(element?: Demo): vscode.ProviderResult<Demo[]> {
        let ret: Demo[] = [];
        if( !element ) {
            ret = demoList;
        } else if( element.children !== undefined ) {
            ret = element.children;
        }
        return ret;
	}

	getTreeItem(element: Demo): vscode.TreeItem | Thenable<vscode.TreeItem> {
        let collapsibleState;

        if( element.children && element.children.length > 0 ) {
            collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        } else {
            collapsibleState = vscode.TreeItemCollapsibleState.None;
        }

		return new vscode.TreeItem( `${element.title}: ${element.id}`, collapsibleState );
	}
}

import * as path from 'path';
import * as fs from 'fs';
export class DemoPanelManager {
    private panel: vscode.WebviewPanel | undefined;
    private html: string = '';
    private rootPath: string = '';
    constructor( private context: vscode.ExtensionContext ) {}

    // 適当
    load() {
        this.rootPath = path.join(this.context.extensionPath, 'public');
        const htmlPath = path.join(this.rootPath, 'index.html');
        const rootUri = vscode.Uri.file(this.rootPath);
        const tmp = fs.readFileSync( htmlPath, { encoding: 'utf8' } );
        this.html = tmp.replace('<base href="/">', `<base href="${rootUri.with({scheme:'vscode-resource'}).toString()}/">`);
    }
    open(id: string) {
        if(!this.panel) {
            this.panel = vscode.window.createWebviewPanel( 'demo.view', 'Demo', vscode.ViewColumn.One,{
                localResourceRoots: [ vscode.Uri.file(this.rootPath) ],
                enableScripts: true,
                retainContextWhenHidden: true
            } );
            this.panel.webview.html = this.html;
            this.panel.onDidDispose( () => {
                this.panel = undefined;
            } );
        } else {
            this.panel.reveal();
        }
        
        this.panel.webview.postMessage( id );
    }
}
