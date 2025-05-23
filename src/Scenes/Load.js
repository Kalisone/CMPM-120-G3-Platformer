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
        this.load.atlas("characters", "pixPlatform_tilemap-characters_packed.png", "pixPlatform_tilemap-characters_packed.json");

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
        this.load.image("green_background", "pixPlatform_tilemap-backgrounds_packed.png");
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

        /* Anims, by variable in my.vfx */
        my.vfx.keyAnim = this.anims.create({
            key: "keyAnim",
            frames: [
                {key: "kenny-particles", frame: "flare_01.png"},
                {key: "kenny-particles", frame: "light_01.png"},
                {key: "kenny-particles", frame: "light_02.png"},
                {key: "kenny-particles", frame: "light_03.png"}
            ],
            duration: 300,
            frameRate: 10
        });

        my.vfx.bubblingAnim = this.anims.create({
            key: "bubblingAnim",
            frames: [
                {key: "kenny-particles", frame: "smoke_04.png"},
                {key: "kenny-particles", frame: "circle_01.png"},
                {key: "kenny-particles", frame: "smoke_07.png"},
                {key: "kenny-particles", frame: "circle_04.png"},
                {key: "kenny-particles", frame: "smoke_08.png"}
            ],
            duration: 300,
            frameRate: 10
        });

        my.vfx.landingAnim = this.anims.create({
            key: "landingAnim",
            frames: [
                {key: "kenny-particles", frame: "smoke_01.png"},
                {key: "kenny-particles", frame: "smoke_02.png"},
                {key: "kenny-particles", frame: "smoke_03.png"},
                {key: "kenny-particles", frame: "smoke_04.png"},
                {key: "kenny-particles", frame: "smoke_05.png"},
                {key: "kenny-particles", frame: "smoke_06.png"},
                {key: "kenny-particles", frame: "smoke_07.png"},
                {key: "kenny-particles", frame: "smoke_08.png"},
                {key: "kenny-particles", frame: "smoke_09.png"}
            ],
            duration: 150
        });

        /* Particles */
        my.vfx.particleKey = this.add.particles(0, 0, "kenny-particles", {
            anim: "keyAnim",
            scale: {start: 0.03, end: 0.2},
            frequency: my.vfx.keyAnim.msPerFrame,
            lifespan: my.vfx.keyAnim.duration,
            alpha: {start: 0.2, end: 0.1},
            blendMode: "ADD"
        }).stop();

        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ["smoke_03.png", "smoke_09.png"],
            random: true,
            scale: {start: 0.02, end: 0.04},
            maxAliveParticles: 8,
            lifespan: 150,
            gravityY: -400,
            alpha: {start: 0, end: 0.1}
        }).stop();

        my.vfx.landing = this.add.particles(0, 0, "kenny-particles", {
            anim: "landingAnim",
            scale: {start: 0.04, end: 0.1},
            frequency: my.vfx.landingAnim.msPerFrame,
            lifespan: my.vfx.landingAnim.duration,
            gravityY: -400
        }).stop();
        /* END CREATE VFX */

        /* **** **** **** **** **** ****
         * CREATE SFX
         **** **** **** **** **** **** */
        this.load.setPath("../assets/audio/");
        my.sfx.jump = [
            this.sound.add("jump", {volume: 0.6}),
            this.sound.add("up", {volume: 0.6})
        ];

        my.sfx.key = [
            this.sound.add("keyUp", {volume: 0.4}),
            this.sound.add("keyTone", {volume: 0.4})
        ];

        my.sfx.steps = [
            this.sound.add("stepHeavy_0", {volume: 0.8}),
            this.sound.add("stepMedium_0", {volume: 0.8})
        ];

        my.sfx.landing = [
            this.sound.add("stepHard_0", {volume: 0.6}),
            this.sound.add("stepMedium_0", {volume: 0.8})
        ];
        /* END CREATE SFX */

        this.scene.start("bitryside");
    }

    update() {
    }
}