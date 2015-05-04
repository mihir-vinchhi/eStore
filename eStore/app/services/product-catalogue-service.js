"use strict";

(function (angular) {

    var productCatalogueService = function ($http) {
        this.get = function () {
            return $http.get("/api/ProductCatalogue");
        };
    };

    angular.module("eStore")
        .service("productCatalogueService", ["$http", productCatalogueService]);

})(angular);