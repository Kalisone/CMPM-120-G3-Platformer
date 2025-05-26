class GameEnd extends Phaser.Scene{
    constructor(){
        super("gameEnd");
    }

    create(){
        this.cameras.main.setBackgroundColor("#4169E1");

        my.text.endText = this.add.text(0, 0, "YOU WIN !", {
            fontFamily: "'Jersey 10'",
            style: "'regular'",
            fontSize: '72px',
            color: "#ffffff",
            stroke: "#FFC000",
            strokeThickness: 2
        });

        my.text.endText.setPosition(game.config.width/2 - my.text.endText.displayWidth/2, game.config.height/2 - my.text.endText.displayHeight/2);
    }

    update(){
        
    }
}