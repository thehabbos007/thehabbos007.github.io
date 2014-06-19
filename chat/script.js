	var scotchApp = angular.module('scotchApp', ['ngRoute', 'firebase', 'ngSanitize']);


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

	});

	scotchApp.service('LoginService', function($firebase) {

		var ref = new Firebase('https://popping-fire-7683.firebaseio.com/');

    	var auth = new FirebaseSimpleLogin(ref, function(error, user) {
			if (error) {
		    	console.log(error);
			} else if (user) {
		    	Auth.globalUser = user;
		    	console.log('User ID: ' + user.id + ', Name: ' + user.displayName);
		  	} else {}
		  	return;
		});

		var Auth = {
	    	login: function() {
	    		auth.login('facebook');
	    	},
	    	logout: function () {
	    		auth.$logout();
	    	},
	    	getUser: function () {
	    		return this.globalUser;
	    	},
	    	globalUser: ''
	    }

	    return Auth;
    });

	scotchApp.controller('mainController', function($scope, $location, $firebase, LoginService) {
		$scope.user = '';

		$scope.face = function() {
			LoginService.Auth.login;
			console.log(LoginService.Auth);
		}
		

		$scope.changeView = function(view){
            $location.path(view); 
        }
        if ($scope.userid == ''){
			$scope.changeView('chat');
		}; 
	});

	scotchApp.controller('chatController', function($scope, $firebase, $location, LoginService) {

		$scope.user = LoginService.globalUser;

		var ref = new Firebase("https://popping-fire-7683.firebaseio.com/chat");

		$scope.messages = $firebase(ref);

		$scope.addMessage = function(e) {
			if (e.keyCode != 13 && $scope.user !== '' && $scope.msg != ' ') return;
				var e = new Date();
				var d = ("0" + e.getHours()).slice(-2) + ":" + ("0" + e.getMinutes()).slice(-2);
				$scope.messages.$add({from: $scope.user.displayName, body: $scope.msg, userid: $scope.user.id, time: d});
				$scope.msg = "";
		}

		$scope.changeView = function(view){
            $location.path(view);
        }

		$scope.b = function() {
			$scope.user = '';
		}
		$scope.a = function(name, a) {
			if (a.userid == $scope.user.id){
				$scope.messages.$remove(name);
			};
		}

		$scope.emoticonize = function(message) {
                    $scope.vars.default_emoticons.forEach(function(emote) {
                        if(message.match(emote.regex)) {
                            message = message.replace(emote.regex, emote.image.html);
                        }
                    });
                    return message;
                }

        $scope.loadEmotes = function() {
                    $.getJSON("https://dl.dropboxusercontent.com/u/7427555/twitch/emotes.php?").done(function (a) {
                        var d = 0;
                        var cssString = "";
                        a.emoticons.forEach(function (a) {
                            a.regex.match(/^\w+$/) ? a.regex = new RegExp("\\b" + a.regex + "\\b", "g") : a.regex = new RegExp(a.regex, "g");
                            a.images.forEach(function (b) {
                                d += 1;
                                b.html = '<span class="emo-'+d+' emoticon"></span>';
                                cssString += $scope.genEmote(b, d);
                                var imageObject = {
                                    image: b,
                                    regex: a.regex
                                }
								$scope.vars.default_emoticons.push(imageObject);
                            });
                            $scope.vars.emoticons.push(a);
                        });
                        cssString += ".emoticon { display: inline-block; }";
                        var $css = $('<style></style>');
                        $css.attr('type', 'text/css');
                        $css.html(cssString);
                        $("head").append($css);

                    });
                }

    	$scope.genEmote = function(e, t) {
                    var n = "";
                    return e.height > 18 && (n = "margin: -" + (e.height - 18) / 2 + "px 0px"), ".emo-" + t + " {" + 'background-image: url("' + e.url + '");' + "height: " + e.height + "px;" + "width: " + e.width + "px;" + n + "}";
                }
    

		$scope.vars = {
                    emoticons: [],
                    default_emoticons: [],
                    emoticon_sets: []
				  }


	});