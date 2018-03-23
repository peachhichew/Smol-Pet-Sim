export {Animal}

class Animal extends PIXI.extras.AnimatedSprite {
    // constructor(img, w, h, frames, array, movingSprite, spriteTexture, page) {
    constructor(spriteTexture, page, x, y, animSpeed = 2) {
        super(spriteTexture);
        // this.spritesheet = PIXI.BaseTexture.fromImage(img);
        // this.spriteWidth = w;
        // this.spriteHeight = h;
        // this.frames = frames;
        // this.array = array;
        // this.movingSprite = movingSprite;
        // this.spriteTexture = spriteTexture;
        this.page = page;
        this.movingSprite.x = x;
        this.movingSprite.y = y;
        this.movingSprite.vy = speed * direction;
        this.movingSprite.animationSpeed = animSpeed;
        this.movingSprite.loop = true;
        this.movingSprite.interactive = true;
        this.movingSprite.buttonMode = true;
    }

    // // do this outside
    // // when making animal, pass in the array
    // loadSprites() {
    //     for (let i = 0; i < this.frames; i++) {
    //         let frame = new PIXI.Texture(this.spritesheet, new Rectangle(i * this.spriteWidth, 480, this.spriteWidth, this.spriteHeight));
    //         this.array.push(frame);
    //     }

    //     return this.array;
    // }

    animateSprites(s, dir) {
        let speed = s;
        let direction = dir;
        // let clicked = false;    // keeps track of the first click, which makes the dog sit
        // // clickedSit keeps track of the second click, which makes the dog walk again but in the 
        // // same direction it was walking before
        // let clickedSit = false; 
        // this.movingSprite = new extras.AnimatedSprite(this.spriteTexture);
        // this.movingSprite.x = x;
        // this.movingSprite.y = y;
        // this.movingSprite.vy = speed * direction;
        // this.movingSprite.animationSpeed = animSpeed;
        // this.movingSprite.loop = true;
        // this.movingSprite.interactive = true;
        // this.movingSprite.buttonMode = true;

        this.page.addChild(this.movingSprite);
        this.movingSprite.play();

        return this.movingSprite;
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
    constructor() {
        // empty
    }
}