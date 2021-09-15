const { convertFnToArrowFn, convertArrowFnToFn } = require('./convertFn');

const fn = [
/* #0 */ `function jstify(str) { console.log(str); }`,
/* #1 */ `function () {}`,
/* #2 */ `
  function (a, b, c) {
    // function body
  }`,
/* #3 */ `function jstify2(){
    // function body
    console.log();
  }`,
/* #4 */ `function jstify(){
    let a, b;
    // function body
    function innerFn(a, b) {
      console.log();
    };
  }`
];
const fnRes = [
/* #0 */ `const jstify = (str) => { console.log(str); }`,
/* #1 */ `() => {}`,
/* #2 */ `(a, b, c) => {
    // function body
  }`,
/* #3 */ `const jstify2 = () => {
    // function body
    console.log();
  }`,
/* #4 */ `const jstify = () => {
    let a, b;
    // function body
    const innerFn = (a, b) => {
      console.log();
    };
  }`
];

const arrowFn = [
/* #0 */ `const jstify = (str) => { console.log(str); }`,
/* #1 */ `() => {}`,
/* #2 */ `let jstify = (str) => { }`,
/* #3 */ `(a, b) => {
    // function body
    console.log(str);
  }`,
/* #4 */ `const jstify = () => {
    let a, b;
    // function body
    const innerFn = (a, b) => {
      console.log();
    };
  }`
];
const arrowFnRes = [
/* #0 */ `function jstify(str) { console.log(str); }`,
/* #1 */ `function () {}`,
/* #2 */ `function jstify(str) { }`,
/* #3 */ `function (a, b) {
    // function body
    console.log(str);
  }`,
/* #4 */ `function jstify() {
    let a, b;
    // function body
    function innerFn(a, b) {
      console.log();
    };
  }`
];

for (let i = 0; i < 5; i++) {
  test(`Convert function to arrow function: fn ${i}`, (done) => {
    expect(convertFnToArrowFn(fn[i])).toStrictEqual(fnRes[i]);
    done();
  })
}

for (let i = 0; i < 5; i++) {
  test(`Convert arrow function to function: arrow fn ${i}`, (done) => {
    expect(convertArrowFnToFn(arrowFn[i])).toStrictEqual(arrowFnRes[i]);
    done();
  })
}
