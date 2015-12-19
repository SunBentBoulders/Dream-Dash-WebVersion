// module for overall app
angular.module('dreamDash', [
	// add dependencies here
	'ui.router',
	'dreamDash.game',
	'dreamDash.info',
	'dreamDash.aboutDreamDash',
	'dreamDash.factories'
	])

// config adds states that correspond with templates and controllers for each view
// TODO: make sure this is minification-safe
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {

		// default route that goes to index
		$urlRouterProvider.otherwise('/');

		// controller logic lives in js files next to each html file
		// these define the different states/views/controllers
		$stateProvider
		// home page - game view
		.state('game', {
			// TODO: make this view automatically show
			url: '/',
			templateUrl: 'game/gameView.html',
			controller: 'GameController',
		})
		.state('info', {
			url: '/info',
			templateUrl: 'info/infoView.html',
			controller: 'InfoController'
		})
		.state('aboutDreamDash', {
			url: '/aboutDreamDash',
			templateUrl: 'aboutGame/aboutDreamDashView.html',
			controller: 'AboutDreamDashController'
		})
	}
])