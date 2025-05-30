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
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
        /* END LOAD VFX */

        /* **** **** **** **** **** ****
         * LOAD SFX
         **** **** **** **** **** **** */
        // Jump sound
        this.load.audio("jump", "phaseJump3.ogg");
        this.load.audio("up", "phaserUp4.ogg");

        // Key sound
        this.load.audio("keyUp", "powerUp8.ogg");
        this.load.audio("keyTone", "zapThreeToneUp.ogg");

        // Footstep sound
        this.load.audio("stepHard", "footstep_concrete_001.ogg");
        this.load.audio("stepMedium", "impactSoft_medium_000.ogg");
        this.load.audio("stepBrush", "footstep_carpet_003.ogg");

        // Hard footstep sound
        this.load.audio("stepHeavy", "impactSoft_heavy_000.ogg");
        this.load.audio("stepCrunch", "footstep_snow_002.ogg")

        // Door unlock sound
        this.load.audio("clong", "impactMining_004.ogg");
        this.load.audio("bell", "impactBell_heavy_001.ogg");

        // Death sound
        this.load.audio("reverbLaser", "laser3.ogg");
        this.load.audio("blare", "zap2.ogg");

        /* END LOAD SFX */
    }

    create() {
        /* **** **** **** **** **** ****
         * CREATE VFX
         **** **** **** **** **** **** */
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
            duration: 300
        });
        /* END CREATE VFX */

        /* **** **** **** **** **** ****
         * CREATE VFX
         **** **** **** **** **** **** */
        my.sfx.jump = [
            this.sound.add("jump", {volume: 0.6}),
            this.sound.add("up", {volume: 0.4})
        ];

        my.sfx.key = [
            this.sound.add("keyUp", {volume: 0.4}),
            this.sound.add("keyTone", {volume: 0.2})
        ];

        my.sfx.steps = [
            this.sound.add("stepHard", {volume: 0.8}),
            this.sound.add("stepMedium", {volume: 0.8}),
            this.sound.add("stepBrush", {volume: 0.4})
        ];

        my.sfx.landing = [
            this.sound.add("stepHeavy", {volume: 0.6}),
            this.sound.add("stepCrunch", {volume: 0.2})
        ];

        my.sfx.unlock = [
            this.sound.add("clong", {volume: 1.4}),
            this.sound.add("bell", {volume: 1.0})
        ]

        my.sfx.death = [
            this.sound.add("reverbLaser", {volume: 1.0}),
            this.sound.add("blare", {volume: 0.6})
        ]
        /* CREATE SFX */

        this.scene.start("bitryside");
    }

    update() {
    }
}