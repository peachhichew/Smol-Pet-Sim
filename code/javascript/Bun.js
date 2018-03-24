import {Animal} from './classes.js';
export {Bun};

class Bun extends Animal {
    constructor(textures, speed = 1/10, x, y, scale = 0.25) {
        super(textures, speed, x, y);
        this.interactive = true;
        this.buttonMode = true;
        this.loop = true;
        // booleans to check for clicking
        this.scale.x = scale;
        this.scale.y = scale;
        this.anchor.set(0.5);
        this.x = x;
        this.y = y;
    }

    updatePos(x, y) {
        this.x = x;
        this.y = y;
    }
}