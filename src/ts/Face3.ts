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

import * as THREE from "three";

export class Face3 {

    a:number;
    b:number;
    c:number;
    normal:THREE.Vector3;
    vertexNormals:Array<THREE.Vector3>;
    color: THREE.Color;
    vertexColors: Array<THREE.Color>;
    materialIndex: number;

	constructor( a:number, b:number, c:number, normal:THREE.Vector3, color:string | number | THREE.Color , materialIndex:number = 0 ) {

		this.a = a;
		this.b = b;
		this.c = c;

		this.normal = ( normal && normal.isVector3 ) ? normal : new THREE.Vector3();
		this.vertexNormals = Array.isArray( normal ) ? normal : [];

		this.color = ( color && color.isColor ) ? color : new THREE.Color();
		this.vertexColors = Array.isArray( color ) ? color : [];

		this.materialIndex = materialIndex;

	}

	clone() {

        // TODO: check if new expression is correct
		// return new this.constructor().copy( this );
        return new Face3(this.a, this.b, this.c, this.normal.clone(), this.color.clone(), this.materialIndex).copy( this );


	}

	copy( source ) {

		this.a = source.a;
		this.b = source.b;
		this.c = source.c;

		this.normal.copy( source.normal );
		this.color.copy( source.color );

		this.materialIndex = source.materialIndex;

		for ( let i = 0, il = source.vertexNormals.length; i < il; i ++ ) {

			this.vertexNormals[ i ] = source.vertexNormals[ i ].clone();

		}

		for ( let i = 0, il = source.vertexColors.length; i < il; i ++ ) {

			this.vertexColors[ i ] = source.vertexColors[ i ].clone();

		}

		return this;

	}

}