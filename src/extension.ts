import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand('type', (args) => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const position = editor.selection.active;
			const line = editor.document.lineAt(position.line);
			if (args.text === '\n' && editor.document.languageId === 'dr') {
				// 替换回车为：换行 + Tab
				vscode.commands.executeCommand('default:type', { text: '\n\t' });
			} else {
				vscode.commands.executeCommand('default:type', args);
			}
		} else {
			vscode.commands.executeCommand('default:type', args);
		}
	});
}

export function deactivate() { }