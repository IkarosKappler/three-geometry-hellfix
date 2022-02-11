// Expose all your components to the global scope here.

// First variant:
globalThis.MyClass = require("./myclasses").MyClass;


// Alternative variant: 
// you might wrap your components into a library.
// This is usually used to keep the gloal scope clean and avoid naming collisions
// with other libraries.
globalThis.MyLibrary = require("./mylibrary").MyLibrary;
