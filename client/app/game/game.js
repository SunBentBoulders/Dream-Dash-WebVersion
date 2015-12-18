angular.module('dreamDash.game', [
	// add dependencies here

	])

// if there are factory dependencies, add function it depends on as a function argument
// TODO: make sure this is minification safe
.controller('GameController', function($scope) {
	console.log("inside GameController");

	// TODO: clean up game/destroy game when user leaves game view
	$scope.$on('$destroy', function() {
		console.log("destroying game");
		// uncomment this when game is added
		// game.destroy();
	})
})

// this is the directive to run the game
// best practice to add custom prefix to directives to avoid future collisions
.directive('myGameCanvas', function($injector) {
	console.log("inside myGameCanvas directive")
	// when directive is attached to page, its link function will get called
	// add a link function that creates an isolated scope
	var linkFunction = function(scope, element, attributes) {
		createGame(scope, scope.mapId, $injector);
	};
	return {
		scope: {
			// not sure if mapId is actually needed yet
			mapId: '='
		},
		templateUrl: 'gameView.html',
		link: linkFunction
	}
})

