	var scotchApp = angular.module('scotchApp', ['ngRoute', 'firebase']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/chat', {
				templateUrl : 'pages/chat.html',
				controller  : 'chatController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});

	scotchApp.controller('chatController', function($scope, $firebase) {

		var ref = new Firebase("https://popping-fire-7683.firebaseio.com/chat");

		$scope.messages = $firebase(ref);


		$scope.addMessage = function(e) {
			if (e.keyCode != 13 && $scope.user !== '' && $scope.msg != ' ') return;
				var e = new Date();
				var d = ("0" + e.getHours()).slice(-2) + ":" + ("0" + e.getMinutes()).slice(-2);
				$scope.messages.$add({from: $scope.user.displayName, body: $scope.msg, userid: $scope.user.id, time: d});
				$scope.msg = "";
		}

		$scope.user = '';

		var chatRef = new Firebase('https://popping-fire-7683.firebaseio.com/');

		$scope.auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
			if (error) {
		    	console.log(error);
		    	$scope.user = '';
			} else if (user) {
				$scope.user = user;
				if (user.displayName === "Nicklas Casthøj"){
					chNam($scope.user,"Sheldon Cooper");	
				};
		    	console.log('User ID: ' + user.id + ', Name: ' + user.displayName);
		  	} else {}
		  	return;
		});

		function chNam (us,to) {
			return us.displayName = to;
		}

		$scope.b = function() {
			$scope.user = '';
		}
		$scope.a = function(name, a) {
			if (a.userid == $scope.user.id){
				$scope.messages.$remove(name);
			};
		}

		var smileys = {"Kappa": ["style/kappa.png", "Kappa", "kappa"]};


	});
	scotchApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});