(function(angular) {

    "use strict";

    var productsCtrl = function ($scope, $location, $routeParams, productsService, productListService, shoppingCartService) {

        $scope.loadProducts = function (categoryName) {
            productListService.executeQuery(categoryName)
                .success(function(data) {
                    $scope.products = data.products;
                });
        };

        $scope.filterProducts = function (category, $event) {
            $event.preventDefault();
            $location.search({ category: category.name });
            $scope.categoryFilter = category.name;
        };

        $scope.clearFilter = function ($event) {
            $event.preventDefault();
            $location.search({});
            $scope.categoryFilter = null;
        };

        $scope.addItemToCart = function (productID) {
            shoppingCartService.addItem({ productID: productID, quantity: 1 });
        };

        $scope.$on("$routeUpdate", function() {
            $scope.loadProducts($routeParams.category);
        });

        $scope.categoryFilter = $routeParams.category;

        productsService.executeQuery()
            .success(function (data) {
                $scope.categories = data.categories;
            });

        $scope.loadProducts($scope.categoryFilter);
    };

    productsCtrl.$inject = [
        "$scope",
        "$location",
        "$routeParams",
        "productsService",
        "productListService",
        "shoppingCartService"
    ];
    
    angular.module("eStore").controller("productsCtrl", productsCtrl);

})(angular);
