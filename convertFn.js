const getNameAndArgs = (fnToArrowFn, match) => {
  if (fnToArrowFn) {
    const args = match.split(/function|\(|\)/);
    return { functionName: args[1].trim(), functionArgs: args[2].trim() };
  }

  const args = match.split(/const|var|let|=|\(|\)/);
  const functionName = args.length === 6 ? args[1].trim() : null;
  const functionArgs = args.length === 6 ? args[3].trim() : args[1].trim();
  return { functionName, functionArgs };
}

module.exports = {
  convertFn: (str) => {
    const regexp1 = /function(.*\(.*\)\s*){/g;
    const regexp2 = /((const|var|let)\s.*=\s*)?\(.*\)\s*=>\s*{/g;
    let matches = Array.from(str.matchAll(regexp1));
    let fnToArrowFn = true;
    if (!matches.length) {
      matches = Array.from(str.matchAll(regexp2));
      fnToArrowFn = false;
    }

    if (!matches.length) {
      return str;
    }

    let newStr = '';
    let index = matches[0].index;
    for (const match of matches) {
      newStr += str.substring(index, match.index);
      const { functionName, functionArgs } = getNameAndArgs(fnToArrowFn, match[0])
      newStr += fnToArrowFn ? '' : 'function ';
      if (functionName) {
        newStr += fnToArrowFn ? `const ${functionName} = ` : `${functionName}`;
      }

      newStr += '(';
      if (functionArgs) {
        newStr += functionArgs;
      }

      newStr += fnToArrowFn ? ') => {' : ') {';
      index = match.index + match[0].length;
    }
    newStr += str.substring(index);
    return newStr;
  }
}
