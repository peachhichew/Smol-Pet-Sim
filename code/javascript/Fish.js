import {Animal} from './Animal.js';
export {Fish};

class Fish extends Animal {
    constructor(textures, x, y, scale = 0.15) {
        super(textures, x, y);
        // booleans to check for clicking
        this.scale.x = scale;
        this.scale.y = scale;
        this.x = x;
        this.y = y;
    }
}