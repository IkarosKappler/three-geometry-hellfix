"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDoubleString = exports.makeMyString = void 0;
// Test how external libraries are bundled.
// Note the '* as x' import, this is very important to get a runnable cjs module in the end.
// Don NOT use 
//   'import repeat from "repeat-string";
// that will not work in the end.
var repeat = require("repeat-string");
var makeMyString = function (obj) { return "myNum=" + obj.myNum + " myString=" + obj.myString; };
exports.makeMyString = makeMyString;
var makeDoubleString = function (str) { return repeat(str, 2); };
exports.makeDoubleString = makeDoubleString;
//# sourceMappingURL=myfunctions.js.map