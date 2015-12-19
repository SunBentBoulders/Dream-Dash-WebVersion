angular.module('dreamDash.info', [
    // add dependencies here
    'dreamDash.factories'

])

// if there are factory dependencies, add function it depends on as a function argument
// TODO: make sure this is minification safe
.controller('InfoController', ['$scope', 'DeveloperInfoFactory', function($scope, DeveloperInfoFactory) {
    console.log("inside InfoController");

    $scope.data = {};
    // store developer info into scope variable
    $scope.data.developerInfo = DeveloperInfoFactory.getDeveloperInfo;
    console.log("$scope.data.developerInfo", $scope.data.developerInfo);

}])