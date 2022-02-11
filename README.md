# three-geometry-hellfix
A backport for the THREE.Geometry that went missing since r125. Name: Gmetry


Instead of using
```javascript

    import * as THREE from "three";

    var myGeometry = new THREE.Geometry();
    for( var i = 0; i < 100; i++ ) {
        myGeometry.vertices.push( 
            new THREE.Vertex( 
                Math.random()*100, 
                Math.random()*100, 
                Math.random()*100 ) 
        );
    }

    for( var i = 0; i < 20; i++ ) {
        myGeometry.faces.push( new THREE.Face3( 
            Math.floor(Math.random()*100),
            Math.floor(Math.random()*100),
            Math.floor(Math.random()*100) )
        );
    }

```

you will receive this error:
```
 error TS2339: Property 'Face3' does not exist on type '../@types/three/index")'.

70   new THREE.Face3( 1, 2,3 );
               ~~~~~

```

Or this
```
 error TS2339: Property 'Geometry' does not exist on type '../@types/three/index")'.

8   new THREE.Geometry();
               ~~~~~
```

This is because THREE.Geometry (and Face3) were removed in r125:
https://discourse.threejs.org/t/three-geometry-will-be-removed-from-core-with-r125/22401

There is a migration guide
https://sbcode.net/threejs/geometry-to-buffergeometry/

but in my opinion the guide's solution is more a workaround of how to convert your short 
code from using THREE.Geometry to the extensive manner of expressing the code with THREE.BufferGeometry. 
The BufferGeometry is surely a way more efficient implementation according to WebGL (as it is
using float arrays/buffers instead of vertex and face arrays), but if you were used to create 
your geometries programmatically this is just a very fresh kind of hell.


I wonder why the maker(s) of THREE did not just restrict the use of THREE.Geometry to
generative purposes, and once the geometry was created convert it to BufferGeometry to
get it rendered.

To here is my solution for our kind of folks:
It's the original file ttps://github.com/mrdoob/three.js/blob/dev/examples/jsm/deprecated/Geometry.js
from the THREE project, ported to Typescript. And I splitted the file up and added types.

Use it like this now:

```javascript

    import { Gmetry, Face3 } from "three-geometry-hellfix";

    var myGeometry = new Gmetry();  // Different name!
    for( var i = 0; i < 100; i++ ) {
        myGeometry.vertices.push( 
            new THREE.Vertex( 
                Math.random()*100, 
                Math.random()*100, 
                Math.random()*100 ) 
        );
    }

    for( var i = 0; i < 20; i++ ) {
        myGeometry.faces.push( new Face3( // and here, too!
            Math.floor(Math.random()*100),
            Math.floor(Math.random()*100),
            Math.floor(Math.random()*100) )
        );
    }

```


### Note
I renamed the `Geometry` class to `Gmetry` because the maintainers of THREE announced that the
`THREE.BufferGeometry` might be renamed to `THREE.Geometry` (replacing the old Geometry class).
And I wanted to avoid naming collisions.


Have fun, folks.
Help your friend and do good!
