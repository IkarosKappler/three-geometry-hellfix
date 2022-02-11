import { CONST_A, CONST_B } from "./myconstants";
import { makeDoubleString, makeMyString } from "./myfunctions";
export class MyClass {
    constructor() {
        this.myNum = CONST_A;
        this.myString = CONST_B;
    }
    getMe() {
        return makeMyString(this);
    }
    getMeDouble() {
        return makeDoubleString(makeMyString(this));
    }
    printMe() {
        console.log(this.getMe());
    }
    printMeDouble() {
        console.log(this.getMeDouble());
    }
}
//# sourceMappingURL=myclasses.js.map