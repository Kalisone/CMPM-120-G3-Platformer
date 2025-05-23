class Bitryside extends Phaser.Scene {
    constructor() {
        super("bitryside");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 1200;
        this.DRAG = 2400;
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -600;
        this.MAX_SPEED = 200;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = SCALE;

        this.wasInAir = this.inAir = false;
        this.keys = 0;
    }

    preload(){
        
    }

    create(){
        // BACKGROUND
        this.add.image(0, 0, "green_background");
        this.background = this.add.tilesprite(0, 200, 1440, 396, "green_background").setScale(8).setScrollFactor(0.4);

        /* **** **** **** **** **** ****
         * CREATE TILES
         **** **** **** **** **** **** */
        this.map = this.add.tilemap("level-bitryside", 18, 18, 150, 30);

        // Tilesets
        this.tilesetBase = this.map.addTilesetImage("pixPlatform_tiles", "base_tilemap_tiles");
        this.tilesetInd = this.map.addTilesetImage("pixPlatform-industrial_tiles", "ind_tilemap_tiles");

        // Tile Layers
        this.layerGround_1 = this.map.createLayer("Ground-Platforms-1", [this.tilesetBase, this.tilesetInd], 0, 0);
        this.layerEnvrFore_2 = this.map.createLayer("Environs-Foreground-2", [this.tilesetBase, this.tilesetInd], 0, 0);
        this.layerTreeCloud_3 = this.map.createLayer("Trees-Clouds-3", [this.tilesetBase, this.tilesetInd], 0, 0);
        this.layerEnvrBack_4 = this.map.createLayer("Environs-Background-4", [this.tilesetBase, this.tilesetInd], 0, 0);

        // Object Layer

        /* END CREATE TILES */
        
        /* **** **** **** **** **** ****
         * CREATE TEXT
         **** **** **** **** **** **** */
        my.keysTxt = this.add.text(20, 20, "Keys Collected: 0", {
            fontFamily: "'Jersey 10'",
            style: "'regular'",
            fontSize: '24px',
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2
        }).setScrollFactor(0);
        /* END CREATE TEXT */
    }

    update(){
        
    }
}