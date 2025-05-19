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
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 2700,
    height: 540,
    scene: [Load, Level_2]
}

var cursors;
const SCALE = 2.0;
var my = {sprite: {}, text: {}, vfx: {}, sfx: {}, tileLayers: {}};

const game = new Phaser.Game(config);