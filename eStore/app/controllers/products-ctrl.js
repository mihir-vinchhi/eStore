"use strict";

(function(angular) {

    var productsCtrl = function ($scope, $location, $routeParams, productCatalogueService, productSearchService) {

        productCatalogueService.get()
            .success(function(data) {
                $scope.categories = data.categories;
            });

        var loadProducts = function (categoryName) {
            productSearchService.get(categoryName)
                .success(function(data) {
                    $scope.products = data.products;
                });
        };

        var categoryFilter = $routeParams.category;

        loadProducts(categoryFilter);

        var filterProducts = function (category, $event) {
            $event.preventDefault();
            $location.search({ category: category.name });
            $scope.categoryFilter = category.name;
        };

        var clearFilter = function($event) {
            $event.preventDefault();
            $location.search({});
            $scope.categoryFilter = null;
        };

        $scope.$on("$routeUpdate", function() {
            loadProducts($routeParams.category);
        });

        $scope.loadProducts = loadProducts;
        $scope.filterProducts = filterProducts;
        $scope.categoryFilter = categoryFilter;
        $scope.clearFilter = clearFilter;
    };

    productsCtrl.$inject = ["$scope", "$location", "$routeParams", "productCatalogueService", "productSearchService"];
    
    angular.module("eStore").controller("productsCtrl", productsCtrl);

})(angular);
