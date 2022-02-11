// Test how external libraries are bundled.
// Note the '* as x' import, this is very important to get a runnable cjs module in the end.
// Don NOT use 
//   'import repeat from "repeat-string";
// that will not work in the end.
import * as repeat from "repeat-string";
export const makeMyString = (obj) => `myNum=${obj.myNum} myString=${obj.myString}`;
export const makeDoubleString = (str) => repeat(str, 2);
//# sourceMappingURL=myfunctions.js.map