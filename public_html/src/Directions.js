var Directions = function(game){};

var storyLine = "Tap left/right to move";
var directionsFullText = "Fast asleep and lost in a dream\nCollect the clocks to wake up\nThe candles will guide your way";
var text, text2, titleText;

Directions.prototype = {
    
    preload: function(game){
        
        game.load.image('directions-bg', 'assets/images/arrow_directions_crop.png');
        game.load.image('clock_candle', 'img/clock_candle_combo.png');
    },
    
    create: function(game){
        
        if (this.game.device.desktop) {

            titleText = game.add.text(this.game.width.centerX, this.game.height.centerY/4, "How To Play", {
                font: 'bold ' + this.game.height / 20 + 'pt TheMinion',
                fill: '#7CCD7C',
                align: 'center'
            });
            titleText.anchor.set(0);

            console.log("In create Directions func");
            game.add.sprite(this.game.width.centerX, this.game.height/6, 'directions-bg');
            game.add.sprite(this.game.width.centerX, this.game.height/8, 'clock_candle');
    
            text2 = game.add.text(this.game.width/2, this.game.height/6, directionsFullText, {
                font: this.game.height / 40 + 'pt TheMinion',
                fill: 'white',
                align: 'right',
                stroke: 'rgba(0,0,0,0)',
                strokeThickness: 4
            });
            text2.anchor.set(0);

            text = game.add.text(20, this.game.height/2, storyLine, {
                font: this.game.height / 40 + 'pt TheMinion',
                fill: 'white',
                align: 'right',
                stroke: 'rgba(0,0,0,0)',
                strokeThickness: 4
            });
            text.anchor.set(0);

        }
    
        
        game.state.add('Preloader', Preloader);
        setTimeout(function() {
            game.state.start('Preloader');
        }, 6000);      
    }
    
};