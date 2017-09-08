/**
 * Return sorted codes.
 *
 * @param {any} imports
 * @returns
 */
function sort(imports) {
  const sections = {
    nodeModules: [],
    relatives: [],
    assets: []
  };

  imports.forEach((imp) => {
    const type = getImportType(imp);
    sections[type].push(imp);
  });

  const results = [];
  if (sections.nodeModules.length) {
    sections.nodeModules.sort(compare);
    results.push(sections.nodeModules.join('\n'));
  }
  if (sections.relatives.length) {
    sections.relatives.sort(compare);
    results.push(sections.relatives.join('\n'));
  }
  if (sections.assets.length) {
    sections.assets.sort(compare);
    results.push(sections.assets.join('\n'));
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
 * Get import type.
 *
 * @param {any} imp
 * @returns
 */
function getImportType(imp) {
  // TODO: Rewrite with babel or regex.
  if (
    imp.includes('.css') ||
    imp.includes('.scss') ||
    imp.includes('.less')) {
    return 'assets';
  }
  return imp.includes('./') ? 'relatives' : 'nodeModules';
}

exports.sort = sort;
