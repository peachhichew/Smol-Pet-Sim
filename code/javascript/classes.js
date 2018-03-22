class Animal {
    constructor(img, w, h, frames, array, movingSprite, spriteTexture) {
        this.spritesheet = PIXI.BaseTexture.fromImage(img);
        this.spriteWidth = w;
        this.spriteHeight = h;
        this.frames = frames;
        this.array = array;
        this.movingSprite = movingSprite;
        this.spriteTexture = spriteTexture;
    }

    loadSprites() {
        for (let i = 0; i < this.frames; i++) {
            let frame = new PIXI.Texture(this.spritesheet, new Rectangle(i * this.spriteWidth, 480, this.spriteWidth, this.spriteHeight));
            this.array.push(frame);
        }

        return this.array;
    }

    animateSprites(s, dir, animSpeed, interact, buttonMode) {
        let speed = s;
        let direction = dir;
        // let clicked = false;    // keeps track of the first click, which makes the dog sit
        // // clickedSit keeps track of the second click, which makes the dog walk again but in the 
        // // same direction it was walking before
        // let clickedSit = false; 
        this.movingSprite = new extras.AnimatedSprite(this.spriteTexture);
        this.movingSprite.x = x;
        this.movingSprite.y = y;
        this.movingSprite.vy = speed * direction;
        this.movingSprite.animationSpeed = animSpeed;
        this.movingSprite.loop = true;
        this.movingSprite.interactive = true;
        this.movingSprite.buttonMode = true;
    }
}

// function pushSpritesToArrayLoop(array) {
//     array = [];

//     for (let i = 0; i < this.frames; i++) {
//         let frame = new PIXI.Texture(this.spritesheet, new Rectangle(i * this.spriteWidth, 480, this.spriteWidth, this.spriteHeight));
//         array.push(frame);
//     }

//     return array;
// }

class Dog extends Animal {
    constructor();
}