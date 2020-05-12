// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DemoProvider, Demo } from './demo-navigation';
import * as path from 'path';
import * as fs from 'fs';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
let html: string = '';

export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "demoextension" is now active!');
	const rootPath = path.join(context.extensionPath, 'public');
	const htmlPath = path.join(rootPath, 'index.html');
	const rootUri = vscode.Uri.file(rootPath);
	const tmp = fs.readFileSync( htmlPath, { encoding: 'utf8' } );
	html = tmp.replace('<base href="/">', `<base href="${rootUri.with({scheme:'vscode-resource'}).toString()}/">`);
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('demo.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from DemoExtension!');
	});
	
	vscode.commands.registerCommand('demo.open', (demo: Demo) => {
		vscode.window.showInformationMessage(`${demo.title}`);
		
		const panel = vscode.window.createWebviewPanel( 'demo.view', 'Demo', vscode.ViewColumn.One,{
			localResourceRoots: [ vscode.Uri.file(rootPath) ],
			enableScripts: true,
			retainContextWhenHidden: true
		} );
		panel.webview.html = html;
		panel.webview.onDidReceiveMessage( () => {
			panel.webview.postMessage( demo.id );
		} );
	});

	const demoProvder = new DemoProvider();

	vscode.window.registerTreeDataProvider('demo.list', new DemoProvider());
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log( 'deactivated' );
}
