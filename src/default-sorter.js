function sort(imports) {
  const sections = {
    nodeModules: [],
    relatives: [],
    stylesheets: []
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
  if (sections.stylesheets.length) {
    sections.stylesheets.sort(compare);
    results.push(sections.stylesheets.join('\n'));
  }
  return results.join('\n\n');
}

function compare(a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

function getImportType(imp) {
  if (imp.includes('.css') || imp.includes('.scss') || imp.includes('.less')) {
    return 'stylesheets';
  }
  return imp.includes('./') ? 'relatives' : 'nodeModules';
}

exports.sort = sort;
