var LeaderBoard = function(game){
	var playerName
	var scoreLeaders;
};

LeaderBoard.prototype = {

	preload: function(game){
		
		game.load.image('Main Menu', 'assets/buttons/mainMenuButton40pt.png');

	},

	create: function(game){
		this.stage.backgroundColor = 0x4B0082
		var leaderBoardBanner = game.add.text(game.width/ 2, game.height / 6, 'LeaderBoard', {
                fill: 'white',
                align: 'center'
            });
		leaderBoardBanner.cssFont = 'bold 60pt Arial';
		leaderBoardBanner.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);
        leaderBoardBanner.anchor.set(0.5);

        playerName = prompt('Please Enter Your Name');
        LeaderBoard.prototype.postNameAndScoreToDatabase(game);


  //       //creates the text input field for submitting name
		// var input = new CanvasInput({
		//   canvas: document.getElementById('canvas'),
		//   placeHolder: 'Enter Name Here',
		//   onsubmit: function(){
		//     playerName = input._value
		//     //hides the text field
		//     $('#canvas').hide();
		//     //calls function to post the players score and name to the database
		//     LeaderBoard.prototype.postNameAndScoreToDatabase(game);
		    
		//     }

		// });
		    // console.log(namePrompt)

		var mainMenuButton = game.add.button(game.world.centerX, (3 * game.height / 7.5) + game.height / 2, 'Main Menu');

		mainMenuButton.anchor.setTo(0.5)
        mainMenuButton.inputEnabled = true;
        mainMenuButton.events.onInputDown.add(LeaderBoard.prototype.goToMainMenu, this);
		

	},

	postNameAndScoreToDatabase: function(game){

		$.ajax({
			//this is the url during testing, will need to be changed for deployment
			url: 'http://dreamdash.herokuapp.com/highscores',
			data: JSON.stringify({'playerName':playerName, 'score' :endGameScore }),
			type: 'POST',
			contentType: "application/json; charset=UTF-8",
			success: function(){
				console.log('Post request was a success');
				//once the players score and name is posted, next we want to go fetch the leaders names and scores from the db
				LeaderBoard.prototype.fetchNamesAndScoresFromDatabase(game);
			},

			error: function(){
				console.log('Post request failed');
			}

		});
	},

	fetchNamesAndScoresFromDatabase: function(game){
		
		$.ajax({
			url: 'http://localhost:5000/highscores',
			dataType: 'json',
			type: 'GET',
			contentType: "application/json; charset=UTF-8",
			success: function(data){
				console.log('Get request was a success');
				//data ends up as an array of object that contain the name of score of the players in the db
				scoreLeaders = data;
				//this then renders those names on the screen
				LeaderBoard.prototype.postLeaderBoardOnScreen(game);

			},

			error: function(){
				console.log('Get request failed');
			}

		});
	},

	postLeaderBoardOnScreen: function(game){
	

        var leaderNameOptionCount = 1;
        var leaderCounter = 1;

        //grab the top 5 players
        for (var i = 0; i <= 4; i++){
        	var leaderNames = game.add.text(game.width/4, (leaderNameOptionCount * game.height / 10) + game.height / 4, leaderCounter + ". " + scoreLeaders[i].name, {
                fill: '#c37c01',
                align: 'left'
            });

            var leaderScores = game.add.text(game.width/1.2, (leaderNameOptionCount * game.height / 10) + game.height / 4, scoreLeaders[i].score, {
                fill: '#c37c01'
            });

            leaderNames.cssFont = 'bold 36pt Arial';
            leaderNames.anchor.set(0.5);
            leaderScores.cssFont = 'bold 36pt Arial';
            leaderScores.anchor.set(0.5);
        	leaderNameOptionCount++;
        	leaderCounter++;  
        }
		
	},

	goToMainMenu: function(){
		this.game.state.start('MainMenu');
	}


};