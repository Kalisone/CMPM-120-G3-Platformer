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

    create(){
        this.map = this.add.tilemap("level-2", 18, 18, 150, 30);
        this.tileset = this.map.addTilesetImage("pixPlatform_tiles", "base_tilemap_tiles");
    }

    update(){
        
    }
}