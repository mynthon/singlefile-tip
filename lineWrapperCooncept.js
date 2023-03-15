wrapLongCodeLine = (code) => {
    const triggers = ['.', ',', '{', '(', ';'];
    const strings = ['"', '\'', '`'];

    let output = '';
    let lastSplitPos=0;
    let currentPos=0;
    let currentStringWrap = '';
    let minLineLength = 100;
    let currLineLength = 0;

    for(currentPos=0; currentPos<code.length; currentPos++) {
      currLineLength++;

      if (currentStringWrap) {
        if (code[currentPos] === currentStringWrap) {
          currentStringWrap = '';
        }
        continue;
      }

      if (strings.includes(code[currentPos])) {
        currentStringWrap = code[currentPos];
        continue;
      }

      if(currLineLength < minLineLength) {
        continue;
      }

      if (triggers.includes(code[currentPos])) {
        output += code.slice(lastSplitPos, currentPos);
        output += '\n';
        lastSplitPos = currentPos;
        currLineLength = 0;
      }
    }

    return output + code.slice(lastSplitPos, currentPos);
  }


  input = 'function wrapper(param1, param2) {wrapper = 90; const probe = Array(); probe = [1, 2, 3,4,5,6,7]}; let second = () => {cons obj = {"param": 234, "rad": Math.pi() * 2, "nested":{"array":[1,2,3,4], "caaa": remote.obj(1234,67,99)}}};function wrapper(param1, param2) {wrapper = 90; const probe = Array(); probe = [1, 2, 3,4,5,6,7]}; let second = () => {cons obj = {"param": 234, "rad": Math.pi() * 2, "nested":{"array":[1,2,3,4], "caaa": remote.obj(1234,67,99)}}}';

  console.log(wrapLongCodeLine(input))