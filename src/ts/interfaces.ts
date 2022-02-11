import { Vector3 } from "three";

export interface VertexNormals {
    a: Vector3;
    b: Vector3;
    c: Vector3;
}

//  group = {
//     start: i * 3,
//     materialIndex: materialIndex
// };
// group.count = ( i * 3 ) - group.start;
// Check again if this interface is really need as THREE should already have this
export interface Group {
    start: number;
    materialIndex: number;
    count: number;
 }

//  const morphTarget = {};
// 			morphTarget.name = morphTargets[ i ].name;
 export interface MorphTarget {
    name: string;
    vertices: Array<Vector3>; // TODO: check if this is Vector2
    normals: Array<Vector3>; // TODO: check if this is Vector2
 }

//  const morphNormal = {};
//  morphNormal.vertexNormals = [];
// morphNormal.faceNormals = [];
 export interface MorphNormal {
    vertexNormals: VertexNormals[]; // Array<Vector3>; // TODO: check if Vector2?
    faceNormals: Array<Vector3>; // TODO: is Vector2?
 }