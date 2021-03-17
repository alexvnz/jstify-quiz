const array = process.argv.slice(2).map((x) => +x);
const { length } = array;

let incSequence = Array.from({ length }, (_, i) => 1),
  decSequence = Array.from({ length }, (_, i) => 1),
  maxIncLength = 0;

const incPaths = Array.from({ length }, (_, i) => [[i]]);
const decPaths = Array.from({ length }, (_, i) => [[i]]);
const nextIncStep = (i, j) => incPaths[i].map((path) => [...path, j]);
const nextDecStep = (i, j) => decPaths[i].map((path) => [...path, j]);

for (let j = 1; j < length; j++) {
  for (let i = 0; i < j; i++) {
    // calculate increasing subsequences and their paths
    if (array[i] < array[j]) {
      const step = nextIncStep(i, j);
      if (incSequence[i] + 1 > incSequence[j]) {
        incSequence[j] = incSequence[i] + 1;
        incPaths[j] = step;
        if (incSequence[j] > maxIncLength) {
          maxIncLength = incSequence[j];
        }
      } else if (incSequence[i] + 1 === incSequence[j]) {
        incPaths[j].push(...step)
      }
    }
    // calculate decreasing subsequences
    if (array[i] > array[j]) {
      const step = nextDecStep(i, j);
      if (decSequence[i] + 1 > decSequence[j]) {
        decSequence[j] = decSequence[i] + 1;
        decPaths[j] = step;
      } else if (decSequence[i] + 1 === decSequence[j]) {
        decPaths[j].push(...step)
      }
    }
  }
}

// take paths with the max and max - 1 length
const flatIncPaths = incPaths.flat().filter((x) => x.length >= maxIncLength - 1);
const flatDecPath = decPaths.flat();

let maxLength = 0
for (let h = 0; h < flatIncPaths.length; h++) {
  const incPath = flatIncPaths[h];
  // copy decreasing paths
  let decPathsCopy = [...flatDecPath];
  for (let i = 0; i < incPath.length; i++) {
    // remove decreasing paths with the used index
    decPathsCopy = decPathsCopy.filter((path) => !path.includes(incPath[i]))
  }
  // find the longest remaining decreasing path
  const maxDecPath = decPathsCopy.reduce((res, path) => {
    return res.length > path.length ? res : path;
  }, []);

  if (maxDecPath.length + incPath.length > maxLength) {
    maxLength = maxDecPath.length + incPath.length;
  }
}
// output min uncolored numbers
console.log('Min uncolored numbers:', length - maxLength);

/* colored output
let maxLength = 0,
  result = [];
// get the result with max length
for (let h = 0; h < flatIncPaths.length; h++) {
  const incPath = flatIncPaths[h];
  // output the result as the array of objects - value and color
  const output = array.map((x) => ({ value: x, color: '' }));
  // copy decreasing paths
  let decPathsCopy = [...flatDecPath];
  for (let i = 0; i < incPath.length; i++) {
    // color the increasing number
    output[incPath[i]].color = 'black';
    // remove decreasing paths with the used index
    decPathsCopy = decPathsCopy.filter((path) => !path.includes(incPath[i]))
  }
  // find the longest remaining decreasing path
  const maxDecPath = decPathsCopy.reduce((res, path) => {
    return res.length > path.length ? res : path;
  }, []);
  for (let j = 0; j < maxDecPath.length; j++) {
    // color the decreasing number
    output[maxDecPath[j]].color = 'white';
  }

  if (maxDecPath.length + incPath.length > maxLength) {
    maxLength = maxDecPath.length + incPath.length;
    result = [...output];
  }
}

const colors = {
  reset: '\x1b[0m',
  black: '\x1b[40m',
  white: '\x1b[47m',
  red: '\x1b[41m',
  yellow: '\x1b[33m',
};
// output coloured values - the values without the colour == the red numbers to distinguish the output
const string = result.reduce((res, x) => {
  return (res += `${x.color ? colors[x.color] : colors.red}${colors.yellow} ${x.value} ${colors.reset}`)
}, '');
console.log(string); */
