(function (angular) {

    "use strict";

    var productsService = function ($http) {
        this.executeQuery = function () {
            return $http.get("/api/Products");
        };
    };

    angular.module("eStore")
        .service("productsService", ["$http", productsService]);

})(angular);