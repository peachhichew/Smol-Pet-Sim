import {Animal} from './Animal.js';
export {Dog};

class Dog extends Animal {
    constructor(textures, speed, direction, x, y, scale) {
        super(textures, speed, direction, x, y);
        this.interactive = true;
        this.buttonMode = true;
        this.loop = true;
        this.direction = 1;
        this.vy = speed * direction;
        // booleans to check for clicking
        this.clicked = false;
        this.clickedSit = false;
        this.scale.x = scale;
        this.scale.y = scale;
        // this.anchor.set(0.5);
    }

    dogSit(sitTexture, walkTexture) {
        if (!this.clicked) {
            this.textures = sitTexture; 
            this.animationSpeed = 1/5;
            this.vy = 0;  // make the velocity = 0 so the sprite stops moving
            this.play();
            this.clicked = true;
            this.clickedSit = true;
        }

        else {
            this.textures = walkTexture;
            this.tint = 0xFF0000;
            this.animationSpeed = 1/3;
            this.vy = this.speed * -this.direction; // make the velocity negative so the dog walks in the opposite direction
            this.play();
            this.clicked = false;
            console.log("alksjasj");
            debugger;
            // if clickedSit is false, change the velocity back to positive
            // this allows the sprite to keep walking in the same direction it originally
            // was before it started sitting
            if (this.clickedSit && this.scale.x == 1) {
                this.vy = this.speed * this.direction;  
                this.clickedSit = false;
            }

            // if clickedSit is true, change the velocity back to negative 
            else {
                this.vy = this.speed * -this.direction;
                this.clickedSit = true;
            }
        }
    }

    dogBark() {
        const dogBarking = new Howl({
            src: ['../audio/animals_dog_bark_springer_spaniel_003.mp3'],
            autoplay: true, 
            loop: true
        });

        dogBarking.play();
    }
}