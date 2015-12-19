angular.module('dreamDash.info', [
	// add dependencies here

	])

// if there are factory dependencies, add function it depends on as a function argument
// TODO: make sure this is minification safe
.controller('InfoController', ['$scope', function($scope) {
	console.log("inside InfoController");
}])