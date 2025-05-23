class Bitryside extends Phaser.Scene {
    constructor() {
        super("bitryside");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 800;
        this.DRAG = 2400;
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -480;
        this.MAX_SPEED = 240;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = SCALE;

        this.wasInAir = this.inAir = false;
        this.numKeys = 0;
        this.stepCounter = 0;
    }

    preload(){
        this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }

    create(){
        // BACKGROUND
        this.add.image(0, 0, "green_background");
        this.background = this.add.tileSprite(0, 600, 1440, 396, "green_background").setScale(6).setScrollFactor(0.4);

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
        this.layerTree_3 = this.map.createLayer("Trees-Clouds-3", [this.tilesetBase, this.tilesetInd], 0, 0);
        this.layerEnvrBack_4 = this.map.createLayer("Environs-Background-4", [this.tilesetBase, this.tilesetInd], 0, 0);

        this.tileLayers = [];
        this.tileLayers.push(this.layerGround_1, this.layerEnvrFore_2, this.layerTree_3, this.layerEnvrBack_4);

        for(let layer of this.tileLayers){
            layer.setCollisionByProperty({
                collides: true
            });
        }

        // Object Layer
        this.keys = this.map.createFromObjects("Objects-5", {
            name: "key",
            key: "base_tilemap_sheet",
            frame: 27
        });

        this.physics.world.enable(this.keys, Phaser.Physics.Arcade.STATIC_BODY);
        this.keyGroup = this.add.group(this.keys);

        for(let key of this.keys){
            this.numKeys++;
        }
        /* END CREATE TILES */
        
        /* **** **** **** **** **** ****
         * CREATE TEXT
         **** **** **** **** **** **** */
        my.text.score = this.add.text(20, 20, "Keys Collected: 0", {
            fontFamily: "'Jersey 10'",
            style: "'regular'",
            fontSize: '24px',
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2
        }).setScrollFactor(0);
        /* END CREATE TEXT */

        /* **** **** **** **** **** ****
         * PLAYER SETUP
         **** **** **** **** **** **** */
        this.spawnPt = this.map.findObject("Objects-5", obj => obj.name === "spawn");
        my.sprite.player = this.physics.add.sprite(this.spawnPt.x, this.spawnPt.y, "platformer_characters", "tile_0002.png");
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.body.maxVelocity.x = this.MAX_SPEED;

        // Collision handling
        this.physics.add.collider(my.sprite.player, this.layerGround_1);

        this.physics.add.overlap(my.sprite.player, this.coinGroup, (obj1, obj2) => {
            this.collectObj(obj1, obj2);
        })

        // Controls
        cursors = this.input.keyboard.createCursorKeys();
        /* END PLAYER SETUP */

        /* **** **** **** **** **** ****
         * CAMERAS SETUP
         **** **** **** **** **** **** */
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.1, 0.1);
        this.cameras.main.setDeadzone(20, 20);
        //this.cameras.main.setZoom(SCALE);
        this.cameras.main.setBackgroundColor("#7ff0a5");

        for(let k in my.text){
            this.cameras.main.ignore(my.text[k]);
        }
/*
        this.cameraUI = this.cameras.add();
        for(let k in my.sprite){
            this.cameraUI.ignore(my.sprite[k]);
        }

        for(let k in my.vfx){
            this.cameraUI.ignore(my.vfx[k]);
        }

        for(let layer of this.tileLayers){
            this.cameraUI.ignore(layer);
        }
        /* END CAMERAS SETUP */

        
        /* **** **** **** **** **** ****
         * CREATE VFX
         **** **** **** **** **** **** */
        this.load.setPath("../assets/particles/");
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

        // ANIMATED TILES PLUGIN
        this.animatedTiles.init(this.map);
        
        // DEBUG
        this.physics.world.drawDebug = false;
    }

    update(){
        this.stepCounter++;
        /* **** **** **** **** **** ****
         * PLAYER MOVEMENT
         **** **** **** **** **** **** */

        // [<-] LEFT
         if(cursors.left.isDown && !cursors.right.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            // TODO: add particle following code here
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/4, my.sprite.player.displayHeight/2 - 5, false);
            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground
            if (my.sprite.player.body.blocked.down) {
                this.fxPlayerWalk();
            }

        }

        // [->] RIGHT
        if(cursors.right.isDown && !cursors.left.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            // TODO: add particle following code here
            my.vfx.walking.startFollow(my.sprite.player, -my.sprite.player.displayWidth/4, my.sprite.player.displayHeight/2 - 5, false);
            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground
            if (my.sprite.player.body.blocked.down) {
                this.fxPlayerWalk();
            }

        }

        // UNMOVING ON HORIZONTAL AXIS
        if((cursors.left.isDown && cursors.right.isDown) || !(cursors.left.isDown || cursors.right.isDown)){
            // Set acceleration to 0 and have DRAG take over
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            // TODO: have the vfx stop playing
            my.vfx.walking.stop();
        }

        // [^] IN AIR
        if(!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
            my.vfx.walking.stop();

            this.wasInAir = this.inAir;
            this.inAir = true;
        }else{
            this.wasInAir = this.inAir;
            this.inAir = false;
        }

        // [^] JUMPING
        if(my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
            for(let sound of my.sfx.jump){
                sound.play();
            }
        }

        // [^] LANDING
        if(this.inAir === false && this.wasInAir === true){
            my.vfx.landing.emitParticleAt(my.sprite.player.x, my.sprite.player.y + (my.sprite.player.displayHeight / 2));

            for(let sound of my.sfx.landing){
                sound.play();
            }
        }
    }

    fxPlayerWalk(){
        my.vfx.walking.start();

        if(this.stepCounter >= 15){
            my.sfx.steps[Math.round(Math.random() * (my.sfx.steps.length-1))].play();
            this.stepCounter = 0;
        }
    }
}