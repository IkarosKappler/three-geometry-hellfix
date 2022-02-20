/**
 * THE ORIGINAL SOURCE COOE IS HERE:
 *    https://github.com/mrdoob/three.js/blob/dev/examples/jsm/deprecated/Geometry.js
 *
 * This is a backport of the old (deprecated) THREE.Face3 class.
 *
 * It got deprecated in version r125 and was announced to be completely dropped in future versions.
 *
 * As it was a very useful class I wanted to preserve it for some of my projects which depend on it.
 *
 * And here this is a Typescript port, too. Enjoy!
 *    - Ikaros Kappler
 *
 * @date 2022-02-11
 */
import { Box3, Color, Sphere, Vector2, Vector3 } from 'three';
import { Face3 } from './Face3';
import { MorphNormal, ThreeFactory } from './interfaces';
export declare class Gmetry {
    uuid: string;
    name: string;
    type: string;
    vertices: Array<Vector3>;
    colors: Array<Color>;
    faces: Array<Face3>;
    faceVertexUvs: Array<Array<[Vector2, Vector2, Vector2]>>;
    morphTargets: Array<any>;
    morphNormals: Array<MorphNormal>;
    skinWeights: Array<number>;
    skinIndices: Array<number>;
    lineDistances: Array<number>;
    boundingBox: Box3;
    boundingSphere: Sphere;
    elementsNeedUpdate: boolean;
    verticesNeedUpdate: boolean;
    uvsNeedUpdate: boolean;
    normalsNeedUpdate: boolean;
    colorsNeedUpdate: boolean;
    lineDistancesNeedUpdate: boolean;
    groupsNeedUpdate: boolean;
    parameters: object;
    isGeometry: boolean;
    private factory;
    private _m1;
    private _obj;
    private _offset;
    constructor(factory?: ThreeFactory);
    applyMatrix4(matrix: any): this;
    rotateX(angle: any): this;
    rotateY(angle: any): this;
    rotateZ(angle: any): this;
    translate(x: any, y: any, z: any): this;
    scale(x: any, y: any, z: any): this;
    lookAt(vector: any): this;
    fromBufferGeometry(geometry: any): this;
    center(): this;
    normalize(): this;
    computeFaceNormals(): void;
    computeVertexNormals(areaWeighted?: boolean): void;
    computeFlatVertexNormals(): void;
    computeMorphNormals(): void;
    computeBoundingBox(): void;
    computeBoundingSphere(): void;
    merge(geometry: any, matrix: any, materialIndexOffset?: number): void;
    mergeMesh(mesh: any): void;
    mergeVertices(precisionPoints?: number): number;
    setFromPoints(points: any): this;
    sortFacesByMaterialIndex(): void;
    toJSON(): {
        metadata: {
            version: number;
            type: string;
            generator: string;
        };
        uuid: any;
        type: any;
        name: any;
        data: any;
    };
    clone(): Gmetry;
    copy(source: any): this;
    toBufferGeometry(): import("three").BufferGeometry;
    computeTangents(): void;
    computeLineDistances(): void;
    applyMatrix(matrix: any): this;
    dispose(): void;
    static createBufferGeometryFromObject(object: any, factory?: any): any;
}
