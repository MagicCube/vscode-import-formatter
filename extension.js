const vscode = require('vscode');

const formatter = require('./src/formatter');

// Register as Javascript formatting provider
vscode.languages.registerDocumentFormattingEditProvider('javascript', {
  provideDocumentFormattingEdits(document) {
    // Triggered when using 'Format Document' command,
    // or if the user choose formatting before saving.
    return formatter.format(document);
  }
});
