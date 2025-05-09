// Ethan Morelos
// CMPM 120 - Game Development Experience
// Game 3 - Platformer
// May X, 2024
//
// Gearbit
//
// Art assets from Kenny Assets
// "X" set:
//
// Audio assets
//
// Music
// "X" by X: 

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1200,
    height: 600,
    scene: [],
    fps: {
        forceSetTimeOut: true,
        target: 30
    }
}