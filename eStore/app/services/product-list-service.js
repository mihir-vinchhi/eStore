(function (angular) {

    "use strict";

    var productListService = function ($http) {
        this.executeQuery = function(category) {
            return $http.get("/api/ProductList?category=" + (category || ""));
        };
    };

    angular.module("eStore")
        .service("productListService", ["$http", productListService]);

})(angular);