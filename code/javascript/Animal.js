export {Animal};

// Animal class
// creates an animated animal object at an x,y location and is interactive.

class Animal extends PIXI.extras.AnimatedSprite {
    constructor(textures, speed, direction, x, y) {
        super(textures);
        this.animationSpeed = speed;
        this.interactive = true;
        this.buttonMode = true;
        this.loop = true;
        this.direction = direction;
        this.x = x;
        this.y = y;
    }
}