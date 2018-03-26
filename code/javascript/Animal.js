export {Animal};

class Animal extends PIXI.extras.AnimatedSprite {
    constructor(textures, speed, direction, x, y) {
        super(textures);
        this.animationSpeed = speed;
        this.interactive = true;
        this.buttonMode = true;
        this.loop = true;
        this.x = x;
        this.y = y;
        // this.direction = 1;
        // this.vy = speed * direction;
    }
}

// function addAnimalSpriteToStage(page, textures, speed, x, y) {
//     let obj = new Animal(textures, speed, x, y);
//     // obj.testing();
//     // obj.textures = textures;
//     obj.play();
//     page.addChild(obj);
    
//     // console.log(obj.x);
//     // console.log(obj.y);
//     // debugger;

//     return obj;

// }

class Bun extends PIXI.extras.AnimatedSprite {
    constructor(textures, speed, direction, x, y) {
        super(textures);
        this.animationSpeed = speed;
        this.interactive = true;
        this.buttonMode = true;
        this.loop = true;
        this.x = x;
        this.y = y;
        // this.vy = speed * direction;
    }
}