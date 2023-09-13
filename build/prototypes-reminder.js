"use strict";
class Boat {
    constructor() {
        this.color = 'red';
    }
    pilot() {
        console.log('swish');
    }
    float() {
        console.log('boat is floating');
    }
}
//prototypes can be modified even after an instance has been created, so if another function is added to the prototype we can modify all active instances of that prototype
