// Testing if pixi is loaded properly
var type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type);

// aliases for various pixi commands
var Container = PIXI.Container,
autoDetectRenderer = PIXI.autoDetectRenderer,
loader = PIXI.loader,
resources = PIXI.loader.resources,
TextureCache = PIXI.utils.TextureCache,
Texture = PIXI.Texture,
Sprite = PIXI.Sprite,
Graphics = PIXI.Graphics
Rectangle = PIXI.Rectangle;

"use strict";
const app = new PIXI.Application(600,600);
document.body.appendChild(app.view);

// constants - might not need
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

var stage = new PIXI.Container();

PIXI.loader
    .add("../images/pupper/shiba.png")
    .load(setup);

function setup() {

}