module.exports = {
  convertFnToArrowFn: (str) => {
    const regexp = /function(.*\(.*\)\s*){/g;

    let matches = str.matchAll(regexp);
    matches = Array.from(matches);
    if (!matches.length) {
      return str;
    }

    let newStr = '';
    let index = matches[0].index;
    for (const match of matches) {
      newStr += str.substring(index, match.index);
      const args = match[0].split(/function|\(|\)/);
      const functionName = args[1].trim();
      const functionArgs = args[2].trim();
      if (functionName) {
        newStr += `const ${functionName} = `;
      }

      newStr += '(';
      if (functionArgs) {
        newStr += functionArgs;
      }

      newStr += ') => {';
      index = match.index + match[0].length;
    }
    newStr += str.substring(index);
    return newStr;
  },

  convertArrowFnToFn: (str) => {
    const regexp = /((const|var|let)\s.*=\s*)?\(.*\)\s*=>\s*{/g;

    let matches = str.matchAll(regexp);
    matches = Array.from(matches);
    if (!matches.length) {
      return str;
    }

    let newStr = '';
    let index = matches[0].index;
    for (const match of matches) {
      newStr += str.substring(index, match.index);
      const args = match[0].split(/const|var|let|=|\(|\)/);
      const functionName = args.length === 6 ? args[1].trim() : null;
      const functionArgs = args.length === 6 ? args[3].trim() : args[1].trim();
      newStr += 'function ';
      if (functionName) {
        newStr += `${functionName}`;
      }

      newStr += '(';
      if (functionArgs) {
        newStr += functionArgs;
      }

      newStr += ') {';
      index = match.index + match[0].length;
    }
    newStr += str.substring(index);
    return newStr;
  }
}
