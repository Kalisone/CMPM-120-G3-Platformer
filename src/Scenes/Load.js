class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.scenePlugin("AnimatedTiles", "./lib/AnimatedTiles.js", "animatedTiles", "animatedTiles");

        this.load.setPath("./assets/");

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

        // Oooh, fancy. A multi atlas is a texture atlas which has the textures spread
        // across multiple png files, so as to keep their size small for use with
        // lower resource devices (like mobile phones).
        // kenny-particles.json internally has a list of the png files
        // The multiatlas was created using TexturePacker and the Kenny
        // Particle Pack asset pack.
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }
}