const vscode = require('vscode');
const MyWebviewViewProvider = require('./webViewProvider.js');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  	console.log('Congratulations, your extension "myfirstextension" is now active!');
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
