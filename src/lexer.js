/**
 * Returns whether the line is an import statement.
 *
 * @param {any} line
 * @returns {boolean}
 */
function isImportStatement(line) {
  // TODO: Rewrite with babel or regex.
  const code = line.trim();
  if (code.startsWith('import ')) {
    return true;
  }
  return false;
}

/**
 * Returns whether the line is empty.
 *
 * @param {any} line
 * @returns
 */
function isEmpty(line) {
  const code = line.trim();
  if (code === '') {
    return true;
  }
  return false;
}


module.exports = {
  isEmpty,
  isImportStatement
};
