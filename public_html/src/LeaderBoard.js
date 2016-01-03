var LeaderBoard = function(game){
	var playerName
};

LeaderBoard.prototype = {
	preload: function(game){
		//this will be image for the submit button
		// game.load.image()

	},
	submitName: function(){
		console.log('this is the score', this.score);
		console.log('this is the score', game.score);
		console.log('this is the score', endGameScore);

		console.log('hi im submitted');
		$.ajax({
			url: 'http://localhost:5000/highscores',
			data: JSON.stringify({'playerName':playerName, 'score' :endGameScore }),
			type: 'POST',
			contentType: "application/json; charset=UTF-8",
			success: function(){
				console.log('Post request was a success');
			},

			error: function(){
				console.log('Post request failed');
			}

		})
	},
	create: function(game){

		var input = new CanvasInput({
		  canvas: document.getElementById('canvas'),
		  placeHolder: 'Enter Name Here',
		  onsubmit: function(){
		    playerName = input._value
		    $('#canvas').hide();
		    LeaderBoard.prototype.submitName();
		    
		    }
		});
		// console.log(this.submitName)
		// console.log(this.game.submitName)
		// console.log(game.submitName)

		var submitButton = game.add.button()
		

	},

	update: function(game){
		$('#canvas').on('submit', function(){
			console.log('hi im submitted');
		})
	}
};