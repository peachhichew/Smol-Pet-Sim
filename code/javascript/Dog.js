import {Animal} from './Animal.js';
export {Dog};

// Dog class
// Extends the Animal class but has its own special properties such as speed, direction, vx, and booleans

class Dog extends Animal {
    constructor(textures, animSpeed, speed, direction, x, y, scale) {
        super(textures, animSpeed, direction, x, y);
        this.interactive = true;
        this.buttonMode = true;
        this.loop = true;
        this.direction = 1;
        this.speed = speed;
        this.vx = this.speed * this.direction;
        // booleans to check for clicking
        this.clicked = false;
        this.clickedSit = false;
        this.scale.x = scale;
        this.scale.y = scale;
    }

    // dogSit method
    // params: sitTexture, walkTexture
    // returns: none
    // purpose: checks to see whether or not the sprite has been pressed once or twice. if pressed once, 
    // the dog will sit. if pressed again, the dog will continue walking.
    dogSit(sitTexture, walkTexture) {
        if (!this.clicked) {
            this.textures = sitTexture; 
            this.animationSpeed = 1/5;
            this.vx = 0;  // make the velocity = 0 so the sprite stops moving
            this.play();
            this.clicked = true;
            this.clickedSit = true;
        }

        else {
            this.textures = walkTexture;
            this.animationSpeed = 1/3;
            this.vx = this.speed * -this.direction; // make the velocity negative so the dog walks in the opposite direction
            this.play();
            this.clicked = false;
            debugger;
            // if clickedSit is false, change the velocity back to positive
            // this allows the sprite to keep walking in the same direction it originally
            // was before it started sitting
            if (this.clickedSit && this.scale.x == 1) {
                this.vx = this.speed * this.direction;  
                this.clickedSit = false;
            }

            // if clickedSit is true, change the velocity back to negative 
            else {
                this.vx = this.speed * -this.direction;
                this.clickedSit = true;
            }
        }
    }
}