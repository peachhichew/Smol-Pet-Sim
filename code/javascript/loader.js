import {setup} from './index.js';

WebFont.load({
    google: {
      families: ['VT323']
    },
    active:e=>{
    	console.log("font loaded!");
    	// pre-load the images
        PIXI.loader
        .add("dog", "../images/pupper/shiba2.png") // used to be shiba1.png
        .add("dogFlipped", "../images/pupper/shiba2-flipped copy.png")
        .add("bunny", "../images/bun/bun.png")
        .add("cat", "../images/catses/catses3.png")
        .on("progress",e=>{console.log(`progress=${e.progress}`)})
        .load(setup);
    }
  });