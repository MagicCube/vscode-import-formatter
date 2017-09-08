/**
 * Returns whether the code is an import statement.
 *
 * @param {any} rawCode
 * @returns {boolean}
 */
function isImportStatement(rawCode) {
  const code = rawCode.trim();
  return (
    code.match(/^import\s/) !== null
  );
}

/**
 * Returns whether the code is using require();
 *
 * The following codes will return true:
 *   var a = require('a');
 *   const b = require('b');
 *   let c = require('c');
 *
 * The following code will return false:
 *   require('a');
 *
 * @param {any} rawCode
 * @returns
 */
function isRequireStatement(rawCode) {
  const code = rawCode.trim();
  return (
    code.match(/var|const|let\s*([\w\$]+)\s*=\s*require\s*\(/)
  );
}

/**
 * Returns whether the code is empty.
 *
 * @param {any} rawCode
 * @returns
 */
function isEmpty(rawCode) {
  const code = rawCode.trim();
  if (code === '') {
    return true;
  }
  return false;
}

module.exports = {
  isEmpty,
  isImportStatement
};
