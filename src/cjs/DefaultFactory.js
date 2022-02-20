"use strict";
// import { Matrix4, Object3D, Vector2, Vector3 } from "three";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultFactory = void 0;
exports.DefaultFactory = {
    newVector2: function (x, y) { return new window["THREE"].Vector2(x, y); },
    newVector3: function (x, y, z) { return new window["THREE"].Vector3(x, y, z); },
    newMatrix3: function () { return new window["THREE"].Matrix3(); },
    newMatrix4: function () { return new window["THREE"].Matrix4(); },
    newObject3D: function () { return new window["THREE"].Object3D(); },
    newBox3: function () { return new window["THREE"].Box3(); },
    newSphere: function () { return new window["THREE"].Sphere(); },
    newBufferGeometry: function () { return new window["THREE"].BufferGeometry(); },
    generateUUID: function () { return window["THREE"].MathUtils.generateUUID(); },
    newFloat32BufferAttribute: function (array, itemSize, normalized) { return new window["THREE"].Float32BufferAttribute(array, itemSize, normalized); },
    newColor: function () { return new window["THREE"].Color; },
    newBufferAttribute: function (array, itemSize, normalized) { return new window["THREE"].BufferAttribute(array, itemSize, normalized); }
};
//# sourceMappingURL=DefaultFactory.js.map