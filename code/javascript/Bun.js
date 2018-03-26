import {Animal} from './Animal.js';
export {Bun};

// Bun class
// extends the Animal class to create a rabbit object at an x, y location and is interactive.

class Bun extends Animal {
    constructor(textures, speed = 1/10, x, y, scale = 0.25) {
        super(textures, speed, x, y);
        this.interactive = true;
        this.buttonMode = true;
        this.loop = true;
        this.scale.x = scale;
        this.scale.y = scale;
        this.x = x;
        this.y = y;
    }

    // updatePos method
    // params: x and y coordinates
    // returns: none
    // purpose: updates the location for the rabbit
    updatePos(x, y) {
        this.x = x;
        this.y = y;
    }
}