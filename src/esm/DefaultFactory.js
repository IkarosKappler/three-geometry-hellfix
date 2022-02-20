// import { Matrix4, Object3D, Vector2, Vector3 } from "three";
export const DefaultFactory = {
    newVector2: (x, y) => { return new window["THREE"].Vector2(x, y); },
    newVector3: (x, y, z) => { return new window["THREE"].Vector3(x, y, z); },
    newMatrix3: () => { return new window["THREE"].Matrix3(); },
    newMatrix4: () => { return new window["THREE"].Matrix4(); },
    newObject3D: () => { return new window["THREE"].Object3D(); },
    newBox3: () => { return new window["THREE"].Box3(); },
    newSphere: () => { return new window["THREE"].Sphere(); },
    newBufferGeometry: () => { return new window["THREE"].BufferGeometry(); },
    generateUUID: () => { return window["THREE"].MathUtils.generateUUID(); },
    newFloat32BufferAttribute: (array, itemSize, normalized) => { return new window["THREE"].Float32BufferAttribute(array, itemSize, normalized); },
    newColor: () => { return new window["THREE"].Color; },
    newBufferAttribute: (array, itemSize, normalized) => { return new window["THREE"].BufferAttribute(array, itemSize, normalized); }
};
//# sourceMappingURL=DefaultFactory.js.map