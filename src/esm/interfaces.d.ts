import { Vector3 } from "three";
export interface VertexNormals {
    a: Vector3;
    b: Vector3;
    c: Vector3;
}
export interface Group {
    start: number;
    materialIndex: number;
    count: number;
}
export interface MorphTarget {
    name: string;
    vertices: Array<Vector3>;
    normals: Array<Vector3>;
}
export interface MorphNormal {
    vertexNormals: VertexNormals[];
    faceNormals: Array<Vector3>;
    name: string;
}
