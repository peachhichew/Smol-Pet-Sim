// Testing if pixi is loaded properly
var type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type);

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics
    Rectangle = PIXI.Rectangle;

var stage = new Container(),
    renderer = autoDetectRenderer(500, 500);

document.body.appendChild(renderer.view);

loader
    .add("../images/pupper/shiba.png")
    .add("../images/pupper/walk/shiba_1.png")
    .add("../images/pupper/walk/shiba_2.png")
    .add("../images/pupper/walk/shiba_3.png")
    .add("../images/pupper/walk/shiba_4.png")
    .add("../images/pupper/walk/shiba_5.png")
    .add("../images/pupper/walk/shiba_6.png")
    .add("../images/pupper/walk/shiba_7.png")
    .add("../images/pupper/walk/shiba_8.png")
    .add("../images/pupper/walk/shiba_9.png")
    .add("../images/pupper/walk/shiba_10.png")
    .add("../images/pupper/walk/shiba_11.png")
    .add("../images/pupper/walk/shiba_12.png")
    .load(setup);

function setup() {
    // // load the image as a texture and then use the rectangle function
    // // to "crop it" and then generate a sprite from it 
    // var pupperTexture = TextureCache["../images/pupper/shiba.png"];
    // // var rectangle = new Rectangle(0, 0, 38, 25);
    // var rectangle = new Rectangle(0, 238, 38, 25); // walk
    
    // pupperTexture.frame = rectangle;

    // var pupper = new Sprite(pupperTexture);


    // stage.addChild(pupper);
    // renderer.render(stage);
    pupper(0, 0);
    // renderer.render(stage);

    // start the game loop
    gameLoop();
}

function pupper(xPos, yPos) {
    var xLoc = xPos;
    var yLoc = yPos;
    var walkFrames = 12;
    // frame number in the animation, starts at 0 every time 
    var curFrame = 0;
    var frameWidth = 38;
    var frameHeight = 25;

    var fsm = [
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9],
        [10],
        [11],
        [12]
    ];

    // load the image as a texture and then use the rectangle function
    // to "crop it" and then generate a sprite from it 
    // var pupperTexture = TextureCache["../images/pupper/shiba.png"];
    // var pupperTexture1 = TextureCache["../images/pupper/shiba.png"];
    // var rectangle = new Rectangle(0, 0, 38, 25);
    // var rectangle = new Rectangle(0, 238, frameWidth, frameHeight); // walk
    // pupperTexture.frame = rectangle;
    // var pupper = new Sprite(pupperTexture);

    // array that takes in the images of each frame where size of the array is the number 
    // of frames
    var walkAnim = new Array(walkFrames);

    // create new sprites and fill them into each slot of the array
    walkAnim[0] = new Sprite(resources["../images/pupper/walk/shiba_1.png"].texture);
    walkAnim[1] = new Sprite(resources["../images/pupper/walk/shiba_2.png"].texture);
    walkAnim[2] = new Sprite(resources["../images/pupper/walk/shiba_3.png"].texture);
    walkAnim[3] = new Sprite(resources["../images/pupper/walk/shiba_4.png"].texture);
    walkAnim[4] = new Sprite(resources["../images/pupper/walk/shiba_5.png"].texture);
    walkAnim[5] = new Sprite(resources["../images/pupper/walk/shiba_6.png"].texture);
    walkAnim[6] = new Sprite(resources["../images/pupper/walk/shiba_7.png"].texture);
    walkAnim[7] = new Sprite(resources["../images/pupper/walk/shiba_8.png"].texture);
    walkAnim[8] = new Sprite(resources["../images/pupper/walk/shiba_9.png"].texture);
    walkAnim[9] = new Sprite(resources["../images/pupper/walk/shiba_10.png"].texture);
    walkAnim[10] = new Sprite(resources["../images/pupper/walk/shiba_11.png"].texture);
    walkAnim[11] = new Sprite(resources[".+./images/pupper/walk/shiba_12.png"].texture);

    // add the sprites to the stage
    for (let i = 0; i < walkFrames; i++) {
        walkAnim[i].x = (i * 4) + 100;
        stage.addChild(walkAnim[i]);
    }

    var currFrame = fsm[currFrame];


}

function gameLoop(){
    
    //Loop this function 60 times per second
    requestAnimationFrame(gameLoop);

    //Move the cat 1 pixel per frame
    cat.x += 1;

    //Render the stage
    renderer.render(stage);
}