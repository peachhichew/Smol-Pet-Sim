export {Animal, addAnimalSpriteToStage}

class Animal extends PIXI.extras.AnimatedSprite {
    constructor(textures, speed, x, y) {
        super(textures);
        this.animationSpeed = speed;
        this.interactive = true;
        this.buttonMode = true;
        this.loop = true;
        this.x = x;
        this.y = y;
        this.tint = 0xFF0000;
        this.visible = true;
        // this.page = page;
    }

    testing() {
        console.log("11111");
    }
}

function addAnimalSpriteToStage(page, textures, speed, x, y) {
    let obj = new Animal(textures, 0, x, y);
    obj.testing();
    obj.textures = textures;
    page.addChild(obj);
    obj.play();
    console.log(obj.x);
    console.log(obj.y);
    debugger;

    return obj;

}