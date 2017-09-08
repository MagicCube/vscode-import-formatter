const vscode = require('vscode');

const formatter = require('./formatter');

// Register as Javascript formatting provider
vscode.languages.registerDocumentFormattingEditProvider('javascript', {
  provideDocumentFormattingEdits(document) {
    return formatter.format(document);
  }
});
