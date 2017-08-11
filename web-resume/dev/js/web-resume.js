(function (angular) {
	var app = angular.module("web-resume", ["ngMaterial", "ui.router"]);
	var debug = false;
	
	/**
	 * If available, send pageview notifications to Google Analytics
	 */
	app.run(["$rootScope", "$location", "$state", function ($rootScope, $location, $state) {
		$rootScope.$on("$stateChangeSuccess", function () {
			if (window.ga) {
				window.ga("send", "pageview", { page: $location.path() });
			}
		});
	}]);
	
	/**
	 * Set the routes up and configurations about them
	 */
	app.config(["$locationProvider", "$compileProvider", "$urlRouterProvider", "$urlMatcherFactoryProvider", "$stateProvider", function ($locationProvider, $compileProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $stateProvider) {
		// Send any SESSION parameter (JSESSIONID and such)
		// $httpProvider.defaults.withCredentials = true;
		
		// Force not to use the HTML5 mode (use the fragment as the URL)
		$locationProvider.html5Mode(false);
		
		// Show debug stuff?
		$compileProvider.debugInfoEnabled(debug);
		
		// A "404" will go to /
		$urlRouterProvider.otherwise("/");
		
		// Trailling "/" are optional 
		$urlMatcherFactoryProvider.strictMode(false);
		
		// And now... routes.
		$stateProvider.state("main", {
			url: "",
			"abstract": true,
			templateUrl: "/fragments/main.html",
		})
		.state("main.index", {
			url: "",
			templateUrl: "/fragments/main.index.html",
//			controller: "IndexController"
		})
		.state("main.sobre", {
			url: "/sobre",
			templateUrl: "/fragments/main.sobre.html"
		});
	}]);
})(angular);