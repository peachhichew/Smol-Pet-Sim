import {Animal} from './Animal.js';
export {Cat};

// Cat class
// creates a Cat object onto the screen that is also interactive. Also has its own properties
// such as scaling, direction, vx, and vy for movement.

class Cat extends Animal {
    constructor(textures, speed = 1/10, x, y, scale = 0.25) {
        super(textures, speed, x, y);
        this.interactive = true;
        this.buttonMode = true;
        this.loop = true;
        this.scale.x = scale;
        this.scale.y = scale;
        this.x = x;
        this.y = y;
        this.direction = 1;
        this.vx = this.speed * this.direction;
        this.vy = 0;
    }
}