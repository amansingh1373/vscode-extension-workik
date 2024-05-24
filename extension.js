const vscode = require('vscode');
const MyWebviewViewProvider = require('./webViewProvider.js');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  	console.log('extension activated');
	let disposable = vscode.commands.registerCommand('chatExtension.refreshExtension', () => {
        vscode.commands.executeCommand('workbench.action.reloadWindow'); // Reload the window to refresh the extension
    });
	context.subscriptions.push(disposable);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'chatExtension',
			new MyWebviewViewProvider(context)
		)
	);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
