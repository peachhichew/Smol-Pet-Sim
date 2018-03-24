import {Animal} from './classes.js';
export {Cat};

class Cat extends Animal {
    constructor(textures, speed = 1/10, x, y, scale = 0.25) {
        super(textures, speed, x, y);
        this.interactive = true;
        this.buttonMode = true;
        this.loop = true;
        // booleans to check for clicking
        this.scale.x = scale;
        this.scale.y = scale;
        this.x = x;
        this.y = y;
    }
}