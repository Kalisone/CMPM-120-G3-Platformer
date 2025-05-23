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
        /* **** **** **** **** **** ****
         * CREATE TILES
         **** **** **** **** **** **** */
        this.map = this.add.tilemap("level-bitryside", 18, 18, 150, 30);
        this.tileset = this.map.addTilesetImage("pixPlatform_tiles", "base_tilemap_tiles");
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