var Directions = function(game){};

var storyLine = "Tap left/right to go that direction";
var directionsFullText = "Here's a story for the game";
var text, text2;

Directions.prototype = {
    
    preload: function(game){
//        game.load.image('directions-bg', 'img/orientation.jpg');
    },
    
    create: function(game){
    
        console.log("In create Directions func");
        game.add.sprite(0, 0, 'directions-bg');
        
        text = game.add.text(0, 0, directionsFullText, {
            font: this.game.width / 26.6 + 'pt TheMinion',
            fill: 'white',
            align: 'right',
            stroke: 'rgba(0,0,0,0)',
            strokeThickness: 4
        });
        text.anchor.set(0.5);
        
        text2 = game.add.text(20, 20, storyLine, {
            font: this.game.width / 26.6 + 'pt TheMinion',
            fill: 'white',
            align: 'left',
            stroke: 'rgba(0,0,0,0)',
            strokeThickness: 4
        });
        text2.anchor.set(0.5);
        
        game.state.add('Preloader', Preloader);
        setTimeout(function() {
            game.state.start('Preloader');
        }, 5000);      
    }
    
};