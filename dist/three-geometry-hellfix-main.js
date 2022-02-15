/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cjs/DirectGeometry.js":
/*!***********************************!*\
  !*** ./src/cjs/DirectGeometry.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * THE ORIGINAL SOURCE COOE IS HERE:
 *    https://github.com/mrdoob/three.js/blob/dev/examples/jsm/deprecated/Geometry.js
 *
 * This is a backport of the old (deprecated) THREE.DirectGeometry class.
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirectGeometry = void 0;
//  import * as THREE from "three";
var three_1 = __webpack_require__(/*! three */ "./node_modules/three/build/three.cjs");
var DirectGeometry = /** @class */ (function () {
    function DirectGeometry() {
        this.vertices = [];
        this.normals = [];
        this.colors = [];
        this.uvs = [];
        this.uvs2 = [];
        this.groups = [];
        this.morphTargets = { position: null, normal: null };
        this.skinWeights = [];
        this.skinIndices = [];
        // this.lineDistances = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        // update flags
        this.verticesNeedUpdate = false;
        this.normalsNeedUpdate = false;
        this.colorsNeedUpdate = false;
        this.uvsNeedUpdate = false;
        this.groupsNeedUpdate = false;
    }
    DirectGeometry.prototype.computeGroups = function (geometry) {
        var groups = [];
        var group, i;
        var materialIndex = undefined;
        var faces = geometry.faces;
        for (i = 0; i < faces.length; i++) {
            var face = faces[i];
            // materials
            if (face.materialIndex !== materialIndex) {
                materialIndex = face.materialIndex;
                if (group !== undefined) {
                    group.count = (i * 3) - group.start;
                    groups.push(group);
                }
                group = {
                    start: i * 3,
                    materialIndex: materialIndex
                };
            }
        }
        if (group !== undefined) {
            group.count = (i * 3) - group.start;
            groups.push(group);
        }
        this.groups = groups;
    };
    DirectGeometry.prototype.fromGeometry = function (geometry) {
        var faces = geometry.faces;
        var vertices = geometry.vertices;
        var faceVertexUvs = geometry.faceVertexUvs;
        var hasFaceVertexUv = faceVertexUvs[0] && faceVertexUvs[0].length > 0;
        var hasFaceVertexUv2 = faceVertexUvs[1] && faceVertexUvs[1].length > 0;
        // morphs
        var morphTargets = geometry.morphTargets;
        var morphTargetsLength = morphTargets.length;
        var morphTargetsPosition;
        if (morphTargetsLength > 0) {
            morphTargetsPosition = [];
            for (var i = 0; i < morphTargetsLength; i++) {
                morphTargetsPosition[i] = {
                    name: morphTargets[i].name,
                    data: []
                };
            }
            this.morphTargets.position = morphTargetsPosition;
        }
        var morphNormals = geometry.morphNormals;
        var morphNormalsLength = morphNormals.length;
        var morphTargetsNormal;
        if (morphNormalsLength > 0) {
            morphTargetsNormal = [];
            for (var i = 0; i < morphNormalsLength; i++) {
                morphTargetsNormal[i] = {
                    name: morphNormals[i].name,
                    data: []
                };
            }
            this.morphTargets.normal = morphTargetsNormal;
        }
        // skins
        var skinIndices = geometry.skinIndices;
        var skinWeights = geometry.skinWeights;
        var hasSkinIndices = skinIndices.length === vertices.length;
        var hasSkinWeights = skinWeights.length === vertices.length;
        //
        if (vertices.length > 0 && faces.length === 0) {
            console.error('THREE.DirectGeometry: Faceless geometries are not supported.');
        }
        for (var i = 0; i < faces.length; i++) {
            var face = faces[i];
            this.vertices.push(vertices[face.a], vertices[face.b], vertices[face.c]);
            var vertexNormals = face.vertexNormals;
            if (vertexNormals.length === 3) {
                this.normals.push(vertexNormals[0], vertexNormals[1], vertexNormals[2]);
            }
            else {
                var normal = face.normal;
                this.normals.push(normal, normal, normal);
            }
            var vertexColors = face.vertexColors;
            if (vertexColors.length === 3) {
                this.colors.push(vertexColors[0], vertexColors[1], vertexColors[2]);
            }
            else {
                var color = face.color;
                this.colors.push(color, color, color);
            }
            if (hasFaceVertexUv === true) {
                var vertexUvs = faceVertexUvs[0][i];
                if (vertexUvs !== undefined) {
                    this.uvs.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);
                }
                else {
                    console.warn('THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ', i);
                    this.uvs.push(new three_1.Vector2(), new three_1.Vector2(), new three_1.Vector2());
                }
            }
            if (hasFaceVertexUv2 === true) {
                var vertexUvs = faceVertexUvs[1][i];
                if (vertexUvs !== undefined) {
                    this.uvs2.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);
                }
                else {
                    console.warn('THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ', i);
                    this.uvs2.push(new three_1.Vector2(), new three_1.Vector2(), new three_1.Vector2());
                }
            }
            // morphs
            for (var j = 0; j < morphTargetsLength; j++) {
                var morphTarget = morphTargets[j].vertices;
                morphTargetsPosition[j].data.push(morphTarget[face.a], morphTarget[face.b], morphTarget[face.c]);
            }
            for (var j = 0; j < morphNormalsLength; j++) {
                var morphNormal = morphNormals[j].vertexNormals[i];
                morphTargetsNormal[j].data.push(morphNormal.a, morphNormal.b, morphNormal.c);
            }
            // skins
            if (hasSkinIndices) {
                this.skinIndices.push(skinIndices[face.a], skinIndices[face.b], skinIndices[face.c]);
            }
            if (hasSkinWeights) {
                this.skinWeights.push(skinWeights[face.a], skinWeights[face.b], skinWeights[face.c]);
            }
        }
        this.computeGroups(geometry);
        this.verticesNeedUpdate = geometry.verticesNeedUpdate;
        this.normalsNeedUpdate = geometry.normalsNeedUpdate;
        this.colorsNeedUpdate = geometry.colorsNeedUpdate;
        this.uvsNeedUpdate = geometry.uvsNeedUpdate;
        this.groupsNeedUpdate = geometry.groupsNeedUpdate;
        if (geometry.boundingSphere !== null) {
            this.boundingSphere = geometry.boundingSphere.clone();
        }
        if (geometry.boundingBox !== null) {
            this.boundingBox = geometry.boundingBox.clone();
        }
        return this;
    };
    return DirectGeometry;
}());
exports.DirectGeometry = DirectGeometry;
//# sourceMappingURL=DirectGeometry.js.map

/***/ }),

/***/ "./src/cjs/Face3.js":
/*!**************************!*\
  !*** ./src/cjs/Face3.js ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Face3 = void 0;
// TODO: only import required types
// import * as THREE from "three";
var three_1 = __webpack_require__(/*! three */ "./node_modules/three/build/three.cjs");
var Face3 = /** @class */ (function () {
    function Face3(a, b, c, normal, color, materialIndex) {
        if (materialIndex === void 0) { materialIndex = 0; }
        this.a = a;
        this.b = b;
        this.c = c;
        // this.normal = ( normal && normal.isVector3 ) ? normal : new THREE.Vector3();
        // this.vertexNormals = Array.isArray( normal ) ? normal : [];
        // TODO: verify correctness
        this.normal = (normal && (normal instanceof three_1.Vector3 && normal.isVector3)) ? normal : new three_1.Vector3();
        this.vertexNormals = Array.isArray(normal) ? normal : [];
        // this.color = ( color && color.isColor ) ? color : new THREE.Color();
        this.color = (color && (color instanceof three_1.Color && color.isColor)) ? color : new three_1.Color(); // TODO: verify correctness
        this.vertexColors = Array.isArray(color) ? color : [];
        this.materialIndex = materialIndex;
    }
    Face3.prototype.clone = function () {
        // TODO: check if new expression is correct
        // return new this.constructor().copy( this );
        return new Face3(this.a, this.b, this.c, this.normal.clone(), this.color.clone(), this.materialIndex).copy(this);
    };
    Face3.prototype.copy = function (source) {
        this.a = source.a;
        this.b = source.b;
        this.c = source.c;
        this.normal.copy(source.normal);
        this.color.copy(source.color);
        this.materialIndex = source.materialIndex;
        for (var i = 0, il = source.vertexNormals.length; i < il; i++) {
            this.vertexNormals[i] = source.vertexNormals[i].clone();
        }
        for (var i = 0, il = source.vertexColors.length; i < il; i++) {
            this.vertexColors[i] = source.vertexColors[i].clone();
        }
        return this;
    };
    return Face3;
}());
exports.Face3 = Face3;
//# sourceMappingURL=Face3.js.map

/***/ }),

/***/ "./src/cjs/Gmetry.js":
/*!***************************!*\
  !*** ./src/cjs/Gmetry.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * THE ORIGINAL SOURCE COOE IS HERE:
 *    https://github.com/mrdoob/three.js/blob/dev/examples/jsm/deprecated/Geometry.js
 *
 * This is a backport of the old (deprecated) THREE.Geometry class.
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gmetry = void 0;
var three_1 = __webpack_require__(/*! three */ "./node_modules/three/build/three.cjs");
var DirectGeometry_1 = __webpack_require__(/*! ./DirectGeometry */ "./src/cjs/DirectGeometry.js");
var Face3_1 = __webpack_require__(/*! ./Face3 */ "./src/cjs/Face3.js");
// import * as THREE from "three";
var _m1 = new three_1.Matrix4();
var _obj = new three_1.Object3D();
var _offset = new three_1.Vector3();
// this.faceVertexUvs[0].push([
//     new THREE.Vector2(0.0, ratioJ),
//     new THREE.Vector2(0.0, ratioI),
//     new THREE.Vector2(1.0, ratioJ)
//   ]);
//   this.faceVertexUvs[0].push([
//     new THREE.Vector2(0.0, ratioI),
//     new THREE.Vector2(1.0, ratioI),
//     new THREE.Vector2(1.0, ratioJ)
//   ]);
var Gmetry = /** @class */ (function () {
    function Gmetry() {
        // super();
        // EventDispatcher.call( this );
        // new Face3( 1, 2,3 );
        this.uuid = three_1.MathUtils.generateUUID();
        this.name = '';
        this.type = 'Geometry';
        this.vertices = [];
        this.colors = [];
        this.faces = [];
        this.faceVertexUvs = [[]];
        this.morphTargets = [];
        this.morphNormals = [];
        this.skinWeights = [];
        this.skinIndices = [];
        this.lineDistances = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        // update flags
        this.elementsNeedUpdate = false;
        this.verticesNeedUpdate = false;
        this.uvsNeedUpdate = false;
        this.normalsNeedUpdate = false;
        this.colorsNeedUpdate = false;
        this.lineDistancesNeedUpdate = false;
        this.groupsNeedUpdate = false;
        // Added this line as 'prototype' is not really accessed in Typescript
        this.isGeometry = true;
    }
    Gmetry.prototype.applyMatrix4 = function (matrix) {
        var normalMatrix = new three_1.Matrix3().getNormalMatrix(matrix);
        for (var i = 0, il = this.vertices.length; i < il; i++) {
            var vertex = this.vertices[i];
            vertex.applyMatrix4(matrix);
        }
        for (var i = 0, il = this.faces.length; i < il; i++) {
            var face = this.faces[i];
            face.normal.applyMatrix3(normalMatrix).normalize();
            for (var j = 0, jl = face.vertexNormals.length; j < jl; j++) {
                face.vertexNormals[j].applyMatrix3(normalMatrix).normalize();
            }
        }
        if (this.boundingBox !== null) {
            this.computeBoundingBox();
        }
        if (this.boundingSphere !== null) {
            this.computeBoundingSphere();
        }
        this.verticesNeedUpdate = true;
        this.normalsNeedUpdate = true;
        return this;
    };
    Gmetry.prototype.rotateX = function (angle) {
        // rotate geometry around world x-axis
        _m1.makeRotationX(angle);
        this.applyMatrix4(_m1);
        return this;
    };
    Gmetry.prototype.rotateY = function (angle) {
        // rotate geometry around world y-axis
        _m1.makeRotationY(angle);
        this.applyMatrix4(_m1);
        return this;
    };
    Gmetry.prototype.rotateZ = function (angle) {
        // rotate geometry around world z-axis
        _m1.makeRotationZ(angle);
        this.applyMatrix4(_m1);
        return this;
    };
    Gmetry.prototype.translate = function (x, y, z) {
        // translate geometry
        _m1.makeTranslation(x, y, z);
        this.applyMatrix4(_m1);
        return this;
    };
    Gmetry.prototype.scale = function (x, y, z) {
        // scale geometry
        _m1.makeScale(x, y, z);
        this.applyMatrix4(_m1);
        return this;
    };
    Gmetry.prototype.lookAt = function (vector) {
        _obj.lookAt(vector);
        _obj.updateMatrix();
        this.applyMatrix4(_obj.matrix);
        return this;
    };
    Gmetry.prototype.fromBufferGeometry = function (geometry) {
        var scope = this;
        var index = geometry.index !== null ? geometry.index : undefined;
        var attributes = geometry.attributes;
        if (attributes.position === undefined) {
            console.error('THREE.Geometry.fromBufferGeometry(): Position attribute required for conversion.');
            return this;
        }
        var position = attributes.position;
        var normal = attributes.normal;
        var color = attributes.color;
        var uv = attributes.uv;
        var uv2 = attributes.uv2;
        if (uv2 !== undefined)
            this.faceVertexUvs[1] = [];
        for (var i = 0; i < position.count; i++) {
            scope.vertices.push(new three_1.Vector3().fromBufferAttribute(position, i));
            if (color !== undefined) {
                scope.colors.push(new three_1.Color().fromBufferAttribute(color, i));
            }
        }
        function addFace(a, b, c, materialIndex) {
            var vertexColors = (color === undefined) ? [] : [
                scope.colors[a].clone(),
                scope.colors[b].clone(),
                scope.colors[c].clone()
            ];
            var vertexNormals = (normal === undefined) ? [] : [
                new three_1.Vector3().fromBufferAttribute(normal, a),
                new three_1.Vector3().fromBufferAttribute(normal, b),
                new three_1.Vector3().fromBufferAttribute(normal, c)
            ];
            var face = new Face3_1.Face3(a, b, c, vertexNormals, vertexColors, materialIndex);
            scope.faces.push(face);
            if (uv !== undefined) {
                scope.faceVertexUvs[0].push([
                    new three_1.Vector2().fromBufferAttribute(uv, a),
                    new three_1.Vector2().fromBufferAttribute(uv, b),
                    new three_1.Vector2().fromBufferAttribute(uv, c)
                ]);
            }
            if (uv2 !== undefined) {
                scope.faceVertexUvs[1].push([
                    new three_1.Vector2().fromBufferAttribute(uv2, a),
                    new three_1.Vector2().fromBufferAttribute(uv2, b),
                    new three_1.Vector2().fromBufferAttribute(uv2, c)
                ]);
            }
        }
        var groups = geometry.groups;
        if (groups.length > 0) {
            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                var start = group.start;
                var count = group.count;
                for (var j = start, jl = start + count; j < jl; j += 3) {
                    if (index !== undefined) {
                        addFace(index.getX(j), index.getX(j + 1), index.getX(j + 2), group.materialIndex);
                    }
                    else {
                        addFace(j, j + 1, j + 2, group.materialIndex);
                    }
                }
            }
        }
        else {
            if (index !== undefined) {
                for (var i = 0; i < index.count; i += 3) {
                    addFace(index.getX(i), index.getX(i + 1), index.getX(i + 2));
                }
            }
            else {
                for (var i = 0; i < position.count; i += 3) {
                    addFace(i, i + 1, i + 2);
                }
            }
        }
        this.computeFaceNormals();
        if (geometry.boundingBox !== null) {
            this.boundingBox = geometry.boundingBox.clone();
        }
        if (geometry.boundingSphere !== null) {
            this.boundingSphere = geometry.boundingSphere.clone();
        }
        return this;
    };
    Gmetry.prototype.center = function () {
        this.computeBoundingBox();
        this.boundingBox.getCenter(_offset).negate();
        this.translate(_offset.x, _offset.y, _offset.z);
        return this;
    };
    Gmetry.prototype.normalize = function () {
        this.computeBoundingSphere();
        var center = this.boundingSphere.center;
        var radius = this.boundingSphere.radius;
        var s = radius === 0 ? 1 : 1.0 / radius;
        var matrix = new three_1.Matrix4();
        matrix.set(s, 0, 0, -s * center.x, 0, s, 0, -s * center.y, 0, 0, s, -s * center.z, 0, 0, 0, 1);
        this.applyMatrix4(matrix);
        return this;
    };
    Gmetry.prototype.computeFaceNormals = function () {
        var cb = new three_1.Vector3(), ab = new three_1.Vector3();
        for (var f = 0, fl = this.faces.length; f < fl; f++) {
            var face = this.faces[f];
            var vA = this.vertices[face.a];
            var vB = this.vertices[face.b];
            var vC = this.vertices[face.c];
            cb.subVectors(vC, vB);
            ab.subVectors(vA, vB);
            cb.cross(ab);
            cb.normalize();
            face.normal.copy(cb);
        }
    };
    Gmetry.prototype.computeVertexNormals = function (areaWeighted) {
        if (areaWeighted === void 0) { areaWeighted = true; }
        var vertices = new Array(this.vertices.length);
        for (var v = 0, vl = this.vertices.length; v < vl; v++) {
            vertices[v] = new three_1.Vector3();
        }
        if (areaWeighted) {
            // vertex normals weighted by triangle areas
            // http://www.iquilezles.org/www/articles/normals/normals.htm
            var cb = new three_1.Vector3(), ab = new three_1.Vector3();
            for (var f = 0, fl = this.faces.length; f < fl; f++) {
                var face = this.faces[f];
                var vA = this.vertices[face.a];
                var vB = this.vertices[face.b];
                var vC = this.vertices[face.c];
                cb.subVectors(vC, vB);
                ab.subVectors(vA, vB);
                cb.cross(ab);
                vertices[face.a].add(cb);
                vertices[face.b].add(cb);
                vertices[face.c].add(cb);
            }
        }
        else {
            this.computeFaceNormals();
            for (var f = 0, fl = this.faces.length; f < fl; f++) {
                var face = this.faces[f];
                vertices[face.a].add(face.normal);
                vertices[face.b].add(face.normal);
                vertices[face.c].add(face.normal);
            }
        }
        for (var v = 0, vl = this.vertices.length; v < vl; v++) {
            vertices[v].normalize();
        }
        for (var f = 0, fl = this.faces.length; f < fl; f++) {
            var face = this.faces[f];
            var vertexNormals = face.vertexNormals;
            if (vertexNormals.length === 3) {
                vertexNormals[0].copy(vertices[face.a]);
                vertexNormals[1].copy(vertices[face.b]);
                vertexNormals[2].copy(vertices[face.c]);
            }
            else {
                vertexNormals[0] = vertices[face.a].clone();
                vertexNormals[1] = vertices[face.b].clone();
                vertexNormals[2] = vertices[face.c].clone();
            }
        }
        if (this.faces.length > 0) {
            this.normalsNeedUpdate = true;
        }
    };
    Gmetry.prototype.computeFlatVertexNormals = function () {
        this.computeFaceNormals();
        for (var f = 0, fl = this.faces.length; f < fl; f++) {
            var face = this.faces[f];
            var vertexNormals = face.vertexNormals;
            if (vertexNormals.length === 3) {
                vertexNormals[0].copy(face.normal);
                vertexNormals[1].copy(face.normal);
                vertexNormals[2].copy(face.normal);
            }
            else {
                vertexNormals[0] = face.normal.clone();
                vertexNormals[1] = face.normal.clone();
                vertexNormals[2] = face.normal.clone();
            }
        }
        if (this.faces.length > 0) {
            this.normalsNeedUpdate = true;
        }
    };
    Gmetry.prototype.computeMorphNormals = function () {
        // save original normals
        // - create temp variables on first access
        //   otherwise just copy (for faster repeated calls)
        for (var f = 0, fl = this.faces.length; f < fl; f++) {
            var face = this.faces[f];
            if (!face.__originalFaceNormal) {
                face.__originalFaceNormal = face.normal.clone();
            }
            else {
                face.__originalFaceNormal.copy(face.normal);
            }
            if (!face.__originalVertexNormals)
                face.__originalVertexNormals = [];
            for (var i = 0, il = face.vertexNormals.length; i < il; i++) {
                if (!face.__originalVertexNormals[i]) {
                    face.__originalVertexNormals[i] = face.vertexNormals[i].clone();
                }
                else {
                    face.__originalVertexNormals[i].copy(face.vertexNormals[i]);
                }
            }
        }
        // use temp geometry to compute face and vertex normals for each morph
        var tmpGeo = new Gmetry();
        tmpGeo.faces = this.faces;
        for (var i = 0, il = this.morphTargets.length; i < il; i++) {
            // create on first access
            if (!this.morphNormals[i]) {
                this.morphNormals[i] = {}; // TODO: is this typecast really necessary?
                this.morphNormals[i].faceNormals = [];
                this.morphNormals[i].vertexNormals = [];
                var dstNormalsFace = this.morphNormals[i].faceNormals;
                var dstNormalsVertex = this.morphNormals[i].vertexNormals;
                for (var f = 0, fl = this.faces.length; f < fl; f++) {
                    var faceNormal = new three_1.Vector3();
                    var vertexNormals = { a: new three_1.Vector3(), b: new three_1.Vector3(), c: new three_1.Vector3() };
                    dstNormalsFace.push(faceNormal);
                    dstNormalsVertex.push(vertexNormals);
                }
            }
            var morphNormals = this.morphNormals[i];
            // set vertices to morph target
            tmpGeo.vertices = this.morphTargets[i].vertices;
            // compute morph normals
            tmpGeo.computeFaceNormals();
            tmpGeo.computeVertexNormals();
            // store morph normals
            for (var f = 0, fl = this.faces.length; f < fl; f++) {
                var face = this.faces[f];
                var faceNormal = morphNormals.faceNormals[f];
                var vertexNormals = morphNormals.vertexNormals[f];
                faceNormal.copy(face.normal);
                vertexNormals.a.copy(face.vertexNormals[0]);
                vertexNormals.b.copy(face.vertexNormals[1]);
                vertexNormals.c.copy(face.vertexNormals[2]);
            }
        }
        // restore original normals
        for (var f = 0, fl = this.faces.length; f < fl; f++) {
            var face = this.faces[f];
            face.normal = face.__originalFaceNormal;
            face.vertexNormals = face.__originalVertexNormals;
        }
    };
    Gmetry.prototype.computeBoundingBox = function () {
        if (this.boundingBox === null) {
            this.boundingBox = new three_1.Box3();
        }
        this.boundingBox.setFromPoints(this.vertices);
    };
    Gmetry.prototype.computeBoundingSphere = function () {
        if (this.boundingSphere === null) {
            this.boundingSphere = new three_1.Sphere();
        }
        this.boundingSphere.setFromPoints(this.vertices);
    };
    Gmetry.prototype.merge = function (geometry, matrix, materialIndexOffset) {
        if (materialIndexOffset === void 0) { materialIndexOffset = 0; }
        if (!(geometry && geometry.isGeometry)) {
            console.error('THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.', geometry);
            return;
        }
        var normalMatrix;
        var vertexOffset = this.vertices.length, vertices1 = this.vertices, vertices2 = geometry.vertices, faces1 = this.faces, faces2 = geometry.faces, colors1 = this.colors, colors2 = geometry.colors;
        if (matrix !== undefined) {
            normalMatrix = new three_1.Matrix3().getNormalMatrix(matrix);
        }
        // vertices
        for (var i = 0, il = vertices2.length; i < il; i++) {
            var vertex = vertices2[i];
            var vertexCopy = vertex.clone();
            if (matrix !== undefined)
                vertexCopy.applyMatrix4(matrix);
            vertices1.push(vertexCopy);
        }
        // colors
        for (var i = 0, il = colors2.length; i < il; i++) {
            colors1.push(colors2[i].clone());
        }
        // faces
        for (var i = 0, il = faces2.length; i < il; i++) {
            var face = faces2[i];
            var normal = void 0, color = void 0;
            var faceVertexNormals = face.vertexNormals, faceVertexColors = face.vertexColors;
            var faceCopy = new Face3_1.Face3(face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset);
            faceCopy.normal.copy(face.normal);
            if (normalMatrix !== undefined) {
                faceCopy.normal.applyMatrix3(normalMatrix).normalize();
            }
            for (var j = 0, jl = faceVertexNormals.length; j < jl; j++) {
                normal = faceVertexNormals[j].clone();
                if (normalMatrix !== undefined) {
                    normal.applyMatrix3(normalMatrix).normalize();
                }
                faceCopy.vertexNormals.push(normal);
            }
            faceCopy.color.copy(face.color);
            for (var j = 0, jl = faceVertexColors.length; j < jl; j++) {
                color = faceVertexColors[j];
                faceCopy.vertexColors.push(color.clone());
            }
            faceCopy.materialIndex = face.materialIndex + materialIndexOffset;
            faces1.push(faceCopy);
        }
        // uvs
        for (var i = 0, il = geometry.faceVertexUvs.length; i < il; i++) {
            var faceVertexUvs2 = geometry.faceVertexUvs[i];
            if (this.faceVertexUvs[i] === undefined)
                this.faceVertexUvs[i] = [];
            for (var j = 0, jl = faceVertexUvs2.length; j < jl; j++) {
                var uvs2 = faceVertexUvs2[j], uvsCopy = [];
                for (var k = 0, kl = uvs2.length; k < kl; k++) {
                    uvsCopy.push(uvs2[k].clone());
                }
                // this.faceVertexUvs[ i ].push( uvsCopy );
                // TODO: verify correctness
                this.faceVertexUvs[i].push(uvsCopy);
            }
        }
    };
    Gmetry.prototype.mergeMesh = function (mesh) {
        if (!(mesh && mesh.isMesh)) {
            console.error('THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.', mesh);
            return;
        }
        if (mesh.matrixAutoUpdate)
            mesh.updateMatrix();
        this.merge(mesh.geometry, mesh.matrix);
    };
    /*
     * Checks for duplicate vertices with hashmap.
     * Duplicated vertices are removed
     * and faces' vertices are updated.
     */
    Gmetry.prototype.mergeVertices = function (precisionPoints) {
        if (precisionPoints === void 0) { precisionPoints = 4; }
        var verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
        var unique = [], changes = [];
        var precision = Math.pow(10, precisionPoints);
        for (var i = 0, il = this.vertices.length; i < il; i++) {
            var v = this.vertices[i];
            var key = Math.round(v.x * precision) + '_' + Math.round(v.y * precision) + '_' + Math.round(v.z * precision);
            if (verticesMap[key] === undefined) {
                verticesMap[key] = i;
                unique.push(this.vertices[i]);
                changes[i] = unique.length - 1;
            }
            else {
                //console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
                changes[i] = changes[verticesMap[key]];
            }
        }
        // if faces are completely degenerate after merging vertices, we
        // have to remove them from the geometry.
        var faceIndicesToRemove = [];
        for (var i = 0, il = this.faces.length; i < il; i++) {
            var face = this.faces[i];
            face.a = changes[face.a];
            face.b = changes[face.b];
            face.c = changes[face.c];
            var indices = [face.a, face.b, face.c];
            // if any duplicate vertices are found in a Face3
            // we have to remove the face as nothing can be saved
            for (var n = 0; n < 3; n++) {
                if (indices[n] === indices[(n + 1) % 3]) {
                    faceIndicesToRemove.push(i);
                    break;
                }
            }
        }
        for (var i = faceIndicesToRemove.length - 1; i >= 0; i--) {
            var idx = faceIndicesToRemove[i];
            this.faces.splice(idx, 1);
            for (var j = 0, jl = this.faceVertexUvs.length; j < jl; j++) {
                this.faceVertexUvs[j].splice(idx, 1);
            }
        }
        // Use unique set of vertices
        var diff = this.vertices.length - unique.length;
        this.vertices = unique;
        return diff;
    };
    Gmetry.prototype.setFromPoints = function (points) {
        this.vertices = [];
        for (var i = 0, l = points.length; i < l; i++) {
            var point = points[i];
            this.vertices.push(new three_1.Vector3(point.x, point.y, point.z || 0));
        }
        return this;
    };
    Gmetry.prototype.sortFacesByMaterialIndex = function () {
        var faces = this.faces;
        var length = faces.length;
        // tag faces
        for (var i = 0; i < length; i++) {
            faces[i]._id = i; // TODO: can we use a proper type for _id?
        }
        // sort faces
        function materialIndexSort(a, b) {
            return a.materialIndex - b.materialIndex;
        }
        faces.sort(materialIndexSort);
        // sort uvs
        var uvs1 = this.faceVertexUvs[0];
        var uvs2 = this.faceVertexUvs[1];
        var newUvs1, newUvs2;
        if (uvs1 && uvs1.length === length)
            newUvs1 = [];
        if (uvs2 && uvs2.length === length)
            newUvs2 = [];
        for (var i = 0; i < length; i++) {
            var id = faces[i]._id;
            if (newUvs1)
                newUvs1.push(uvs1[id]);
            if (newUvs2)
                newUvs2.push(uvs2[id]);
        }
        if (newUvs1)
            this.faceVertexUvs[0] = newUvs1;
        if (newUvs2)
            this.faceVertexUvs[1] = newUvs2;
    };
    Gmetry.prototype.toJSON = function () {
        var data = {
            metadata: {
                version: 4.5,
                type: 'Geometry',
                generator: 'Geometry.toJSON'
            },
            // TODO: check this (this is new)
            uuid: null,
            type: null,
            name: null,
            data: null
        };
        // standard Geometry serialization
        data.uuid = this.uuid;
        data.type = this.type;
        if (this.name !== '')
            data.name = this.name;
        if (this.parameters !== undefined) {
            var parameters = this.parameters;
            for (var key in parameters) {
                if (parameters[key] !== undefined)
                    data[key] = parameters[key];
            }
            return data;
        }
        var vertices = [];
        for (var i = 0; i < this.vertices.length; i++) {
            var vertex = this.vertices[i];
            vertices.push(vertex.x, vertex.y, vertex.z);
        }
        var faces = [];
        var normals = [];
        var normalsHash = {};
        var colors = [];
        var colorsHash = {};
        var uvs = [];
        var uvsHash = {};
        for (var i = 0; i < this.faces.length; i++) {
            var face = this.faces[i];
            var hasMaterial = true;
            var hasFaceUv = false; // deprecated
            var hasFaceVertexUv = this.faceVertexUvs[0][i] !== undefined;
            var hasFaceNormal = face.normal.length() > 0;
            var hasFaceVertexNormal = face.vertexNormals.length > 0;
            var hasFaceColor = face.color.r !== 1 || face.color.g !== 1 || face.color.b !== 1;
            var hasFaceVertexColor = face.vertexColors.length > 0;
            var faceType = 0;
            faceType = setBit(faceType, 0, 0); // isQuad
            faceType = setBit(faceType, 1, hasMaterial);
            faceType = setBit(faceType, 2, hasFaceUv);
            faceType = setBit(faceType, 3, hasFaceVertexUv);
            faceType = setBit(faceType, 4, hasFaceNormal);
            faceType = setBit(faceType, 5, hasFaceVertexNormal);
            faceType = setBit(faceType, 6, hasFaceColor);
            faceType = setBit(faceType, 7, hasFaceVertexColor);
            faces.push(faceType);
            faces.push(face.a, face.b, face.c);
            faces.push(face.materialIndex);
            if (hasFaceVertexUv) {
                var faceVertexUvs = this.faceVertexUvs[0][i];
                faces.push(getUvIndex(faceVertexUvs[0]), getUvIndex(faceVertexUvs[1]), getUvIndex(faceVertexUvs[2]));
            }
            if (hasFaceNormal) {
                faces.push(getNormalIndex(face.normal));
            }
            if (hasFaceVertexNormal) {
                var vertexNormals = face.vertexNormals;
                faces.push(getNormalIndex(vertexNormals[0]), getNormalIndex(vertexNormals[1]), getNormalIndex(vertexNormals[2]));
            }
            if (hasFaceColor) {
                faces.push(getColorIndex(face.color));
            }
            if (hasFaceVertexColor) {
                var vertexColors = face.vertexColors;
                faces.push(getColorIndex(vertexColors[0]), getColorIndex(vertexColors[1]), getColorIndex(vertexColors[2]));
            }
        }
        function setBit(value, position, enabled) {
            return enabled ? value | (1 << position) : value & (~(1 << position));
        }
        function getNormalIndex(normal) {
            var hash = normal.x.toString() + normal.y.toString() + normal.z.toString();
            if (normalsHash[hash] !== undefined) {
                return normalsHash[hash];
            }
            normalsHash[hash] = normals.length / 3;
            normals.push(normal.x, normal.y, normal.z);
            return normalsHash[hash];
        }
        function getColorIndex(color) {
            var hash = color.r.toString() + color.g.toString() + color.b.toString();
            if (colorsHash[hash] !== undefined) {
                return colorsHash[hash];
            }
            colorsHash[hash] = colors.length;
            colors.push(color.getHex());
            return colorsHash[hash];
        }
        function getUvIndex(uv) {
            var hash = uv.x.toString() + uv.y.toString();
            if (uvsHash[hash] !== undefined) {
                return uvsHash[hash];
            }
            uvsHash[hash] = uvs.length / 2;
            uvs.push(uv.x, uv.y);
            return uvsHash[hash];
        }
        data.data = {};
        data.data.vertices = vertices;
        data.data.normals = normals;
        if (colors.length > 0)
            data.data.colors = colors;
        if (uvs.length > 0)
            data.data.uvs = [uvs]; // temporal backward compatibility
        data.data.faces = faces;
        return data;
    };
    Gmetry.prototype.clone = function () {
        /*
         // Handle primitives
         const parameters = this.parameters;
         if ( parameters !== undefined ) {
         const values = [];
         for ( const key in parameters ) {
         values.push( parameters[ key ] );
         }
         const geometry = Object.create( this.constructor.prototype );
         this.constructor.apply( geometry, values );
         return geometry;
         }
         return new this.constructor().copy( this );
         */
        return new Gmetry().copy(this);
    };
    Gmetry.prototype.copy = function (source) {
        // reset
        this.vertices = [];
        this.colors = [];
        this.faces = [];
        this.faceVertexUvs = [[]];
        this.morphTargets = [];
        this.morphNormals = [];
        this.skinWeights = [];
        this.skinIndices = [];
        this.lineDistances = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        // name
        this.name = source.name;
        // vertices
        var vertices = source.vertices;
        for (var i = 0, il = vertices.length; i < il; i++) {
            this.vertices.push(vertices[i].clone());
        }
        // colors
        var colors = source.colors;
        for (var i = 0, il = colors.length; i < il; i++) {
            this.colors.push(colors[i].clone());
        }
        // faces
        var faces = source.faces;
        for (var i = 0, il = faces.length; i < il; i++) {
            this.faces.push(faces[i].clone());
        }
        // face vertex uvs
        for (var i = 0, il = source.faceVertexUvs.length; i < il; i++) {
            var faceVertexUvs = source.faceVertexUvs[i];
            if (this.faceVertexUvs[i] === undefined) {
                this.faceVertexUvs[i] = [];
            }
            for (var j = 0, jl = faceVertexUvs.length; j < jl; j++) {
                var uvs = faceVertexUvs[j], uvsCopy = [];
                for (var k = 0, kl = uvs.length; k < kl; k++) {
                    var uv = uvs[k];
                    uvsCopy.push(uv.clone());
                }
                this.faceVertexUvs[i].push(uvsCopy);
            }
        }
        // morph targets
        var morphTargets = source.morphTargets;
        for (var i = 0, il = morphTargets.length; i < il; i++) {
            // const morphTarget = {};
            // TODO: verify correctness
            var morphTarget = {};
            morphTarget.name = morphTargets[i].name;
            // vertices
            if (morphTargets[i].vertices !== undefined) {
                morphTarget.vertices = [];
                for (var j = 0, jl = morphTargets[i].vertices.length; j < jl; j++) {
                    morphTarget.vertices.push(morphTargets[i].vertices[j].clone());
                }
            }
            // normals
            if (morphTargets[i].normals !== undefined) {
                morphTarget.normals = [];
                for (var j = 0, jl = morphTargets[i].normals.length; j < jl; j++) {
                    morphTarget.normals.push(morphTargets[i].normals[j].clone());
                }
            }
            this.morphTargets.push(morphTarget);
        }
        // morph normals
        var morphNormals = source.morphNormals;
        for (var i = 0, il = morphNormals.length; i < il; i++) {
            var morphNormal = {};
            // vertex normals
            if (morphNormals[i].vertexNormals !== undefined) {
                morphNormal.vertexNormals = [];
                for (var j = 0, jl = morphNormals[i].vertexNormals.length; j < jl; j++) {
                    var srcVertexNormal = morphNormals[i].vertexNormals[j];
                    var destVertexNormal = {};
                    destVertexNormal.a = srcVertexNormal.a.clone();
                    destVertexNormal.b = srcVertexNormal.b.clone();
                    destVertexNormal.c = srcVertexNormal.c.clone();
                    morphNormal.vertexNormals.push(destVertexNormal);
                }
            }
            // face normals
            if (morphNormals[i].faceNormals !== undefined) {
                morphNormal.faceNormals = [];
                for (var j = 0, jl = morphNormals[i].faceNormals.length; j < jl; j++) {
                    morphNormal.faceNormals.push(morphNormals[i].faceNormals[j].clone());
                }
            }
            this.morphNormals.push(morphNormal);
        }
        // skin weights
        var skinWeights = source.skinWeights;
        for (var i = 0, il = skinWeights.length; i < il; i++) {
            this.skinWeights.push(skinWeights[i].clone());
        }
        // skin indices
        var skinIndices = source.skinIndices;
        for (var i = 0, il = skinIndices.length; i < il; i++) {
            this.skinIndices.push(skinIndices[i].clone());
        }
        // line distances
        var lineDistances = source.lineDistances;
        for (var i = 0, il = lineDistances.length; i < il; i++) {
            this.lineDistances.push(lineDistances[i]);
        }
        // bounding box
        var boundingBox = source.boundingBox;
        if (boundingBox !== null) {
            this.boundingBox = boundingBox.clone();
        }
        // bounding sphere
        var boundingSphere = source.boundingSphere;
        if (boundingSphere !== null) {
            this.boundingSphere = boundingSphere.clone();
        }
        // update flags
        this.elementsNeedUpdate = source.elementsNeedUpdate;
        this.verticesNeedUpdate = source.verticesNeedUpdate;
        this.uvsNeedUpdate = source.uvsNeedUpdate;
        this.normalsNeedUpdate = source.normalsNeedUpdate;
        this.colorsNeedUpdate = source.colorsNeedUpdate;
        this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
        this.groupsNeedUpdate = source.groupsNeedUpdate;
        return this;
    };
    Gmetry.prototype.toBufferGeometry = function () {
        var geometry = new DirectGeometry_1.DirectGeometry().fromGeometry(this);
        var buffergeometry = new three_1.BufferGeometry();
        var positions = new Float32Array(geometry.vertices.length * 3);
        buffergeometry.setAttribute('position', new three_1.BufferAttribute(positions, 3).copyVector3sArray(geometry.vertices));
        if (geometry.normals.length > 0) {
            var normals = new Float32Array(geometry.normals.length * 3);
            buffergeometry.setAttribute('normal', new three_1.BufferAttribute(normals, 3).copyVector3sArray(geometry.normals));
        }
        if (geometry.colors.length > 0) {
            var colors = new Float32Array(geometry.colors.length * 3);
            buffergeometry.setAttribute('color', new three_1.BufferAttribute(colors, 3).copyColorsArray(geometry.colors));
        }
        if (geometry.uvs.length > 0) {
            var uvs = new Float32Array(geometry.uvs.length * 2);
            buffergeometry.setAttribute('uv', new three_1.BufferAttribute(uvs, 2).copyVector2sArray(geometry.uvs));
        }
        if (geometry.uvs2.length > 0) {
            var uvs2 = new Float32Array(geometry.uvs2.length * 2);
            buffergeometry.setAttribute('uv2', new three_1.BufferAttribute(uvs2, 2).copyVector2sArray(geometry.uvs2));
        }
        // groups
        buffergeometry.groups = geometry.groups;
        // morphs
        for (var name_1 in geometry.morphTargets) {
            var array = [];
            var morphTargets = geometry.morphTargets[name_1];
            for (var i = 0, l = morphTargets.length; i < l; i++) {
                var morphTarget = morphTargets[i];
                var attribute = new three_1.Float32BufferAttribute(morphTarget.data.length * 3, 3);
                attribute.name = morphTarget.name;
                array.push(attribute.copyVector3sArray(morphTarget.data));
            }
            buffergeometry.morphAttributes[name_1] = array;
        }
        // skinning
        if (geometry.skinIndices.length > 0) {
            var skinIndices = new three_1.Float32BufferAttribute(geometry.skinIndices.length * 4, 4);
            buffergeometry.setAttribute('skinIndex', skinIndices.copyVector4sArray(geometry.skinIndices));
        }
        if (geometry.skinWeights.length > 0) {
            var skinWeights = new three_1.Float32BufferAttribute(geometry.skinWeights.length * 4, 4);
            buffergeometry.setAttribute('skinWeight', skinWeights.copyVector4sArray(geometry.skinWeights));
        }
        //
        if (geometry.boundingSphere !== null) {
            buffergeometry.boundingSphere = geometry.boundingSphere.clone();
        }
        if (geometry.boundingBox !== null) {
            buffergeometry.boundingBox = geometry.boundingBox.clone();
        }
        return buffergeometry;
    };
    Gmetry.prototype.computeTangents = function () {
        console.error('THREE.Geometry: .computeTangents() has been removed.');
    };
    Gmetry.prototype.computeLineDistances = function () {
        console.error('THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead.');
    };
    Gmetry.prototype.applyMatrix = function (matrix) {
        console.warn('THREE.Geometry: .applyMatrix() has been renamed to .applyMatrix4().');
        return this.applyMatrix4(matrix);
    };
    Gmetry.prototype.dispose = function () {
        // This is not required when used outside of THREE.
        // this.dispatchEvent( { type: 'dispose' } );
    };
    Gmetry.createBufferGeometryFromObject = function (object) {
        var buffergeometry = new three_1.BufferGeometry();
        var geometry = object.geometry;
        if (object.isPoints || object.isLine) {
            var positions = new three_1.Float32BufferAttribute(geometry.vertices.length * 3, 3);
            var colors = new three_1.Float32BufferAttribute(geometry.colors.length * 3, 3);
            buffergeometry.setAttribute('position', positions.copyVector3sArray(geometry.vertices));
            buffergeometry.setAttribute('color', colors.copyColorsArray(geometry.colors));
            if (geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length) {
                var lineDistances = new three_1.Float32BufferAttribute(geometry.lineDistances.length, 1);
                buffergeometry.setAttribute('lineDistance', lineDistances.copyArray(geometry.lineDistances));
            }
            if (geometry.boundingSphere !== null) {
                buffergeometry.boundingSphere = geometry.boundingSphere.clone();
            }
            if (geometry.boundingBox !== null) {
                buffergeometry.boundingBox = geometry.boundingBox.clone();
            }
        }
        else if (object.isMesh) {
            buffergeometry = geometry.toBufferGeometry();
        }
        return buffergeometry;
    };
    return Gmetry;
}());
exports.Gmetry = Gmetry;
// Gmetry.prototype.isGeometry = true;
//# sourceMappingURL=Gmetry.js.map

/***/ }),

/***/ "./src/cjs/entry.js":
/*!**************************!*\
  !*** ./src/cjs/entry.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// Expose all your components to the global scope here.

globalThis.ThreeGeometryHellfix = globalThis.TGH = __webpack_require__(/*! ./ */ "./src/cjs/index.js").ThreeGeometryHellfix;


/***/ }),

/***/ "./src/cjs/index.js":
/*!**************************!*\
  !*** ./src/cjs/index.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./DirectGeometry */ "./src/cjs/DirectGeometry.js"), exports);
__exportStar(__webpack_require__(/*! ./Face3 */ "./src/cjs/Face3.js"), exports);
__exportStar(__webpack_require__(/*! ./Gmetry */ "./src/cjs/Gmetry.js"), exports);
__exportStar(__webpack_require__(/*! ./interfaces */ "./src/cjs/interfaces.js"), exports);
__exportStar(__webpack_require__(/*! ./mylibrary */ "./src/cjs/mylibrary.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/cjs/interfaces.js":
/*!*******************************!*\
  !*** ./src/cjs/interfaces.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=interfaces.js.map

/***/ }),

/***/ "./src/cjs/mylibrary.js":
/*!******************************!*\
  !*** ./src/cjs/mylibrary.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreeGeometryHellfix = void 0;
var DirectGeometry_1 = __webpack_require__(/*! ./DirectGeometry */ "./src/cjs/DirectGeometry.js");
var Face3_1 = __webpack_require__(/*! ./Face3 */ "./src/cjs/Face3.js");
var Gmetry_1 = __webpack_require__(/*! ./Gmetry */ "./src/cjs/Gmetry.js");
exports.ThreeGeometryHellfix = {
    DirectGeometry: DirectGeometry_1.DirectGeometry,
    Face3: Face3_1.Face3,
    Gmetry: Gmetry_1.Gmetry
};
//# sourceMappingURL=mylibrary.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkthree_geometry_hellfix"] = self["webpackChunkthree_geometry_hellfix"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/cjs/entry.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=three-geometry-hellfix-main.js.map