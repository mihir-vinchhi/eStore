(function(angular) {

    "use strict";

    var module = angular.module("eStore", ["ngRoute"]);

    var configureRoute = function($routeProvider, $locationProvider) {
        $routeProvider
            .otherwise({
                redirectTo: "/products"
            });

        $routeProvider
            .when("/products", {
                templateUrl: "app/views/products.html",
                controller: "productsCtrl",
                reloadOnSearch: false
            });

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
    };

    module.config(["$routeProvider", "$locationProvider", configureRoute]);

})(angular);

