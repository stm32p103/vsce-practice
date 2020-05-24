// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DemoProvider, Demo, DemoPanelManager } from './demo-navigation';
import { DemoDispatcher } from './demo/demo-dispatcher';
import { EditorProvider } from './demo/editor-demo';

export function activate(context: vscode.ExtensionContext) {
	// Hello world コマンド
	console.log('Congratulations, your extension "demoextension" is now active!');
	let disposable = vscode.commands.registerCommand('demo.helloworld', () => {
		vscode.window.showInformationMessage('Hello World from DemoExtension!');
	});
	
	const dispatcher = new DemoDispatcher();
	dispatcher.register('demo.reopen', () => vscode.commands.executeCommand('demo.reopen-view'));
	dispatcher.register('demo.hello', () => vscode.commands.executeCommand('demo.helloworld'));

	// デモ画面を開くコマンド
	const mng = new DemoPanelManager(context, dispatcher);
	mng.load();	
	vscode.commands.registerCommand('demo.open', (demo: Demo) => {
		vscode.window.showInformationMessage(`${demo.title}`);
		mng.open(demo.id);
	});

	// ツリービュー
	const demoProvder = new DemoProvider();
	vscode.window.registerTreeDataProvider('demo.list', new DemoProvider());

	vscode.commands.registerCommand('demo.reopen-view', () => {
		mng.reload();
	});

	
	console.log('register provider');
	context.subscriptions.push(EditorProvider.register(context));

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log( 'deactivated' );
}
