"use strict";

(function(angular) {

    var productsCtrl = function ($scope, $location, $routeParams, productService) {

        var categories = [
            {
                id: 1,
                name: "Beverages"
            }, {
                id: 2,
                name: "Condiments"
            }, {
                id: 3,
                name: "Produce"
            }
        ];

        var loadProducts = function (categoryName) {
            productService.get(categoryName)
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

        $scope.categories = categories;
        $scope.loadProducts = loadProducts;
        $scope.filterProducts = filterProducts;
        $scope.categoryFilter = categoryFilter;
        $scope.clearFilter = clearFilter;
    };
    
    angular.module("eStore").controller("productsCtrl", ["$scope", "$location", "$routeParams", "productService", productsCtrl]);

})(angular);
