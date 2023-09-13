"use strict";
var Boat = /** @class */ (function () {
    function Boat() {
        this.color = 'red';
    }
    Boat.prototype.pilot = function () {
        console.log('swish');
    };
    Boat.prototype.float = function () {
        console.log('boat is floating');
    };
    return Boat;
}());
//prototypes can be modified even after an instance has been created, so if another function is added to the prototype we can modify all active instances of that prototype
