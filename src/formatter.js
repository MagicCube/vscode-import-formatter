const vscode = require('vscode');

const lexer = require('./lexer');
const sorter = require('./sorters/default-sorter');

/**
 * Returns an array of actions to format the document.
 *
 * @param {any} document
 * @returns
 */
function format(document) {
  const range = findImports(document);
  if (!range) {
    return null;
  }

  const imports = extractImports(document, range);
  const code = sortImports(imports);

  return createReplaceEdit(document, range, `${code}\n`);
}

/**
 * Generate code for the resorted imports.
 *
 * @param {any} imports
 */
function sortImports(imports) {
  return sorter.sort(imports);
}

/**
 * Return a new TextEdit which will replace the range with the given code.
 *
 * @param {any} range
 * @param {any} code
 * @returns
 */
function createReplaceEdit(document, range, code) {
  const edit = new vscode.WorkspaceEdit();
  edit.replace(document.uri, range, code);
  return edit;
}

/**
 * Returns an array which contains all the import code lines.
 *
 * @param {any} document
 * @param {any} range
 */
function extractImports(document, range) {
  const codes = document.getText(range).trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  return codes.split('\n').filter(
    (line) => {
      const code = line.trim();
      return lexer.isImportStatement(code) || lexer.isRequireStatement(code);
    });
}

/**
 * Returns a vscode.Range object which represents the range contains all the leading imports.
 * Returns null if no import was found.
 *
 * @param {any} document
 * @returns
 */
function findImports(document) {
  const firstLine = findFirstImportLine(document);
  if (!firstLine) {
    return null;
  }
  const lastLine = findLastImportLine(document, firstLine);
  return new vscode.Range(
    firstLine.range.start,
    lastLine.range.end
  );
}

/**
 * Find the first import statement in the document.
 *
 * @param {any} document
 * @returns
 */
function findFirstImportLine(document) {
  let lineNumber = 0;
  let line = document.lineAt(lineNumber);
  while (!lexer.isImportStatement(line.text) && !lexer.isRequireStatement(line.text)) {
    lineNumber++;
    if (lineNumber === document.lineCount - 1) {
      return null;
    } else {
      line = document.lineAt(lineNumber);
    }
  };
  return line;
}

/**
 * Find the last import line in the document.
 *
 * @param {any} document
 * @param {any} startLine
 * @returns
 */
function findLastImportLine(document, startLine) {
  let lineNumber = startLine.lineNumber;
  let line = document.lineAt(lineNumber);
  while (
    lexer.isImportStatement(line.text) ||
    lexer.isRequireStatement(line.text) ||
    lexer.isEmpty(line.text)
  ) {
    lineNumber++;
    if (lineNumber === document.lineCount - 1) {
      return line;
    }
    line = document.lineAt(lineNumber);
  };
  return document.lineAt(lineNumber - 1);
}

exports.format = format;
