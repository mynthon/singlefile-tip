/**
 * This plugins wraps long output lines so it is easier for copy-paste output code.
 * It is especially usable for output that is generated to single-line by terser plugin.
 */

const wrapLongCodeLine = (code, minLineLength) => {
  const triggers = ['.', ',', '{', '(', ';'];
  const strings = ['"', '\'', '`'];

  let output = '';
  let lastSplitPos=0;
  let currentPos=0;
  let currentStringWrap = '';
  let currLineLength = 0;

  for(currentPos=0; currentPos<code.length; currentPos++) {
    currLineLength++;

    // check if current char is closing quot; mark
    if (currentStringWrap) {
      if (code[currentPos] === currentStringWrap) {
        currentStringWrap = '';
      }
      continue;
    }

    // if current char is &quot; start parsing string
    if (strings.includes(code[currentPos])) {
      currentStringWrap = code[currentPos];
      continue;
    }

    // current line is still shorter than min. required length
    if(currLineLength < minLineLength) {
      continue;
    }

    if (code[currentPos] === '\n') {
      currLineLength = 0;
      continue;
    }

    // if current char is one of the safe-to-break characters break the line
    if (triggers.includes(code[currentPos])) {
      output += code.slice(lastSplitPos, currentPos);
      output += '\n';
      lastSplitPos = currentPos;
      currLineLength = 0;
    }
  }

  return output + code.slice(lastSplitPos, currentPos);
}

/**
 *
 * @param {*} options
 * @returns
 */
export default function WrapOutputLines (options = {}) {

  const {lineLength = 200} = options;

  return {
    name: 'test-plugin',
    generateBundle(_, bundle) {
      for (const fileName in bundle) {
        const output = bundle[fileName];
        if (output.isAsset) continue; // skip over assets
        output.code = wrapLongCodeLine(output.code, lineLength);
      }
    },
  };
}
