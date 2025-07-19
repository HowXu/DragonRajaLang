import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// 注册文本编辑器命令
	let disposable = vscode.commands.registerCommand('auto-tab-on-enter.onEnter', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const position = editor.selection.active;

		// 插入换行符和Tab
		editor.edit(editBuilder => {
			if (!(editor && editor.document.languageId === 'dr')) {
				editBuilder.insert(position, '\n');
			}else{
				editBuilder.insert(position, '\n\t');
			}
			
		}).then(() => {
			// 移动光标到行尾
			const newPosition = position.translate(1, 1);
			editor.selection = new Selection(newPosition, newPosition);
		});
	});

	// 绑定回车键到我们的命令
	const enterBinding = vscode.commands.registerCommand('type', (args) => {
		if (args.text === '\n') {
			vscode.commands.executeCommand('auto-tab-on-enter.onEnter');
			return;
		}
		vscode.commands.executeCommand('default:type', args);
	});

	context.subscriptions.push(disposable, enterBinding);
}

// 添加 Selection 类
class Selection extends vscode.Selection {
	constructor(anchor: vscode.Position, active: vscode.Position) {
		super(anchor, active);
	}
}

export function deactivate() { }