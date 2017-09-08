const vscode = require('vscode');

const formatter = require('./formatter');

vscode.commands.registerCommand('importFormatter.format', () => {
  const { activeTextEditor } = vscode.window;
  if (activeTextEditor && activeTextEditor.document.languageId.startsWith('javascript')) {
    const { document } = activeTextEditor;
    const edit = formatter.format(document);
    return vscode.workspace.applyEdit(edit);
  }
});
