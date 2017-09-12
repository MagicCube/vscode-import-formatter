const IMPORT_REGX = /^import\s[\s\w\{\}\$\,\*]*['"]([@\w\-\.\/]+)['"]/;
const REQUIRE_REGX = /^(var|const|let)\s*([\w\${}\s\,\:]+)\s*=\s*require\s*\(['"]([@\w\-\.]+)["']/;

/**
 * Returns whether the code is an import statement.
 *
 * @param {any} rawCode
 * @returns {boolean}
 */
function isImportStatement(rawCode) {
  const code = rawCode.trim();
  return IMPORT_REGX.test(code);
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
  return REQUIRE_REGX.test(code);
}

/**
 * Returns whether the code is empty.
 *
 * @param {any} rawCode
 * @returns
 */
function isEmpty(rawCode) {
  const code = rawCode.trim();
  return code === '';
}

function extractFilePath(rawCode) {
  const code = rawCode.trim();
  let match = code.match(IMPORT_REGX);
  if (match && match[1]) {
    return match[1];
  }
  match = code.match(REQUIRE_REGX);
  if (match && match[3]) {
    return match[3];
  }
  return null;
}

module.exports = {
  extractFilePath,
  isEmpty,
  isImportStatement,
  isRequireStatement
};
