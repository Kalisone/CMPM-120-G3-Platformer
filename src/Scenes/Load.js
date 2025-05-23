class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.scenePlugin("AnimatedTiles", "./lib/AnimatedTiles.js", "animatedTiles", "animatedTiles");

        this.load.setPath("./assets/");

        /* **** **** **** **** **** ****
         * LOAD TILES
         **** **** **** **** **** **** */
        // Load characters spritesheet
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // Load tilemap information
        this.load.image("base_tilemap_tiles", "pixPlatform_tilemap_packed.png");
        this.load.image("ind_tilemap_tiles", "pixPlatform-industrial_tilemap_packed.png");

        this.load.tilemapTiledJSON("level-bitryside", "gearbit-level-2.tmj");

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
        this.load.image("green_background", "gearbit-level-2-background.png");
        /* END LOAD TILES */

        /* **** **** **** **** **** ****
         * LOAD VFX
         **** **** **** **** **** **** */
        this.load.setPath("../assets/particles/");
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
        /* END LOAD VFX */

        /* **** **** **** **** **** ****
         * LOAD SFX
         **** **** **** **** **** **** */
        this.load.setPath("../assets/audio/");
        // Jump sound
        this.load.audio("jump", "phaseJump3.ogg");
        this.load.audio("up", "phaserUp4.ogg");

        // Key sound
        this.load.audio("keyUp", "powerUp8.ogg");
        this.load.audio("keyTone", "zapThreeToneUp.ogg");

        // Footstep sound
        this.load.audio("stepHeavy_0", "impactSoft_heavy_000.ogg");
        this.load.audio("stepMedium_0", "impactSoft_medium_000.ogg");

        // Hard footstep sound
        this.load.audio("stepHard_0", "footstep_concrete_001.ogg");
        this.load.audio("stepSoft_0", "footstep_carpet_003.ogg");

        /* END LOAD SFX */
    }

    create() {
        /* **** **** **** **** **** ****
         * CREATE VFX
         **** **** **** **** **** **** */
        this.load.setPath("../assets/particles/");
        /* Anims, unassigned */
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames("platformer_characters", {
                prefix: "tile_",
                start: 2,
                end: 3,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0002.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0003.png" }
            ],
        });
        /* END CREATE VFX */

        this.scene.start("bitryside");
    }

    update() {
    }
}