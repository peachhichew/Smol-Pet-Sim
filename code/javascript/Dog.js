import {Animal} from './classes.js';
export {Dog};

class Dog extends Animal {
    constructor(textures, speed, direction, x, y) {
        super(textures, speed, direction, x, y);
        this.interactive = true;
        this.buttonMode = true;
        this.loop = true;
        this.direction = 1;
        this.vy = speed * direction;
        debugger;
    }
}