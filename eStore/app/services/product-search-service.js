"use strict";

(function(angular) {

    var productSearchService = function ($http) {
        this.get = function(category) {
            return $http.get("/api/ProductSearch?category=" + (category || ""));
        };
    };

    angular.module("eStore")
        .service("productSearchService", ["$http", productSearchService]);

})(angular);