"use strict";

(function(angular) {

    var productService = function ($http) {
        this.get = function(category) {
            return $http.get("/api/ProductCatalogueSearch?category=" + (category || ""));
        };
    };

    angular.module("eStore")
        .service("productService", ["$http", productService]);

})(angular);