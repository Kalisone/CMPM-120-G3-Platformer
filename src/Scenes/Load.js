class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.scenePlugin("AnimatedTiles", "./lib/AnimatedTiles.js", "animatedTiles", "animatedTiles");

        this.load.setPath("./assets/");

        /* **** **** **** **** **** ****
         * LOAD FROM TILED
        **** **** **** **** **** **** */
        // Load characters spritesheet
        this.load.atlas("characters", "pixPlatform_tilemap-characters_packed.png", "pixPlatform_tilemap-characters_packed.json");

        // Load tilemap information
        this.load.image("base_tilemap_tiles", "pixPlatform_tilemap_packed.png");
        this.load.image("ind_tilemap_tiles", "pixPlatform-industrial_tilemap_packed.png");
        this.load.tilemapTiledJSON("level-2", "gearbit-level-2.tmj");

        // Load the tilemap as a spritesheet
        this.load.spritesheet("base_tilemap_sheet", "pixPlatform_tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        this.load.spritesheet("ind_tilemap_sheet", "pixPlatform-industrial_tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        // Load background tilemap
        this.load.image("tilemap_background", "pixPlatform_tilemap-backgrounds.png");
        this.load.tilemapTiledJSON("level-2-background", "gearbit-level-2-background.tmj");

        // Load the tilemap as a spritesheet
        this.load.spritesheet("background_tilemap_sheet", "pixPlatform_tilemap-backgrounds_packed.png", {
            frameWidth: 24,
            frameHeight: 24
        });

        /* END LOAD FROM TILED */

        this.load.multiatlas("kenny-particles", "kenny-particles.json");

        /* **** **** **** **** **** ****
         * LOAD SFX
        **** **** **** **** **** **** */
    }

    create() {
        /* **** **** **** **** **** ****
         * CREATE VFX
         **** **** **** **** **** **** */
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames("characters", {
                prefix: "tile_",
                start: 0,
                end: 1,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: "characters",
            frames: [
                { frame: "tile_0000.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "characters",
            frames: [
                { frame: "tile_0001.png" }
            ],
        });

        /* **** **** **** **** **** ****
         * CREATE SFX
         **** **** **** **** **** **** */

        this.scene.start("bitryside");
    }

    update() {
    }
}