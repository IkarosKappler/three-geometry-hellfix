import { Box3, BufferAttribute, BufferGeometry, Color, Float32BufferAttribute, Matrix3, Matrix4, Object3D, Sphere, Vector2, Vector3 } from "three";

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
    name: string;
 }

 // Custom interfaces
 export interface ThreeFactory {
    newVector2(x?:number, y?:number) : Vector2;
    newVector3(x?:number, y?:number, z?:number) : Vector3;
    newMatrix3():Matrix3;
    newMatrix4():Matrix4;
    newObject3D():Object3D;
    newBox3():Box3;
    newSphere():Sphere;
    newBufferGeometry():BufferGeometry;
    generateUUID(): string;
    newFloat32BufferAttribute(array: number | Iterable<number> | ArrayLike<number> | ArrayBuffer, itemSize: number, normalized?: boolean): Float32BufferAttribute;
    newColor(): Color;
    newBufferAttribute(array: ArrayLike<number>, itemSize: number, normalized?: boolean): BufferAttribute;
 }