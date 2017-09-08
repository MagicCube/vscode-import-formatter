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
