class GameFail extends Phaser.Scene{
    constructor(){
        super("gameFail");
    }

    create(){
        this.cameras.main.setBackgroundColor("#241111");

        my.text.endText = this.add.text(0, 0, "YOU LOSE    : )", {
            fontFamily: "'Jersey 10'",
            style: "'regular'",
            fontSize: '72px',
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2
        });

        my.text.endText.setPosition(game.config.width/2 - my.text.endText.displayWidth/2, game.config.height/2 - my.text.endText.displayHeight/2);

        this.cameras.main.shake(360, 0.1);

        this.input.keyboard.on('keydown', () => {
            this.scene.start("bitryside");
        });
    }

    update(){
    }
}