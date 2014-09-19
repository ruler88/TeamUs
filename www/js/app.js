// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('MainController', ['$scope', function($scope) {
		$scope.submit = function() {

			if($scope.peopleCount <= 0) {
				$scope.message = "YOU DUMB";
				return;
			}
			$scope.message = "";
			$scope.peopleCount--;

			while(true) {
				var select = $scope.allTeams[ Math.floor(Math.random() * $scope.teamCount) ];
				if ($scope.allTeamCounts[select] > 0) {
					$scope.teamNames.unshift(select + "  -  Player" + ($scope.peopleCount+1) );
					$scope.allTeamCounts[select] = $scope.allTeamCounts[select] - 1;
					break;
				}
			}


			console.log(select);
			console.log(JSON.stringify($scope.allTeamCounts));
		};

		$scope.reset = function(people, team) {
			if(isNaN(people) || isNaN(team) || team > people) {
				$scope.message = "you dumb";
				return;
			}
			$scope.message = "";
			$scope.peopleCount = people;
			$scope.teamCount = team;
			$scope.teamNames = [];
			$scope.allTeams = [];
			$scope.allTeamCounts = {};

			for( var i = 0; i < $scope.teamCount; i++ ){
				$scope.allTeams.push("Team: " + String.fromCharCode(65+i));

				var count = Math.floor(people / team);
				var addition = ((people/team) - Math.floor(people/team)) * team - i;
				addition = addition >= 0 ? addition : 0;		//js number system is not precise
				addition = addition >=1 ? 1 : addition;
				count += addition >= 0 ? addition : 0;
				$scope.allTeamCounts["Team: " + String.fromCharCode(65+i)] = Math.round(count);
			}
		};


}]);
