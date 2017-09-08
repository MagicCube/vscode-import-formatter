const pathUtil = require('path');

const lexer = require('../lexer');

/**
 * Return sorted codes.
 *
 * @param {any} imports
 * @returns
 */
function sort(imports) {
  const sections = {
    npmModules: [],
    npmAssets: [],
    relativeModules: [],
    relativeAssets: []
  };

  imports.forEach((imp) => {
    const type = getFileType(imp);
    sections[type].push(imp);
  });

  const results = [];
  if (sections.npmModules.length) {
    sections.npmModules.sort(compare);
    results.push(sections.npmModules.join('\n'));
  }
  if (sections.npmAssets.length) {
    sections.npmAssets.sort(compare);
    results.push(sections.npmAssets.join('\n'));
  }
  if (sections.relativeModules.length) {
    sections.relativeModules.sort(compare);
    results.push(sections.relativeModules.join('\n'));
  }
  if (sections.relativeAssets.length) {
    sections.relativeAssets.sort(compare);
    results.push(sections.relativeAssets.join('\n'));
  }
  return results.join('\n\n');
}

/**
 * Compare strings in locale mode, meanwhile ignore case.
 *
 * @param {any} a
 * @param {any} b
 * @returns
 */
function compare(a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

/**
 * Get file type from import/require statement.
 *
 * @param {any} code
 * @returns
 */
function getFileType(code) {
  const path = lexer.extractFilePath(code);
  const ext = pathUtil.extname(path).toLowerCase();
  const isModule = ext === '' || ext === '.js' || ext === '.jsx' || ext === '.ts';
  const isRelative = path.includes('./');
  if (isModule) {
    if (isRelative) {
      return 'relativeModules';
    } else {
      return 'npmModules';
    }
  } else {
    if (isRelative) {
      return 'relativeAssets';
    } else {
      return 'npmAssets';
    }
  }
}

exports.sort = sort;
