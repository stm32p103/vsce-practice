import * as vscode from 'vscode';
import axios from 'axios';
import { CREDENTIAL } from './credential';
// http://localhost:8080/rest/api/2/issue/SAM-1


export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('jira.helloWorld', async () => {
		const a = await axios.get( 'http://localhost:8080/rest/api/2/issue/SAM-1', { auth: CREDENTIAL } );
		const data = a.data;
		console.log( data.fields );

		vscode.window.showInformationMessage('Hello World from jira!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
