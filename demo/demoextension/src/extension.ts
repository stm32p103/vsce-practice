// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DemoProvider, Demo, DemoPanelManager } from './demo-navigation';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
	// Hello world コマンド
	console.log('Congratulations, your extension "demoextension" is now active!');
	let disposable = vscode.commands.registerCommand('demo.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from DemoExtension!');
	});
	
	// デモ画面を開くコマンド
	const mng = new DemoPanelManager(context);
	mng.load();	
	vscode.commands.registerCommand('demo.open', (demo: Demo) => {
		vscode.window.showInformationMessage(`${demo.title}`);
		mng.open(demo.id);
	});

	// ツリービュー
	const demoProvder = new DemoProvider();
	vscode.window.registerTreeDataProvider('demo.list', new DemoProvider());


	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log( 'deactivated' );
}
