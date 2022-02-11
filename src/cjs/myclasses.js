"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
var myconstants_1 = require("./myconstants");
var myfunctions_1 = require("./myfunctions");
var MyClass = /** @class */ (function () {
    function MyClass() {
        this.myNum = myconstants_1.CONST_A;
        this.myString = myconstants_1.CONST_B;
    }
    MyClass.prototype.getMe = function () {
        return (0, myfunctions_1.makeMyString)(this);
    };
    MyClass.prototype.getMeDouble = function () {
        return (0, myfunctions_1.makeDoubleString)((0, myfunctions_1.makeMyString)(this));
    };
    MyClass.prototype.printMe = function () {
        console.log(this.getMe());
    };
    MyClass.prototype.printMeDouble = function () {
        console.log(this.getMeDouble());
    };
    return MyClass;
}());
exports.MyClass = MyClass;
//# sourceMappingURL=myclasses.js.map