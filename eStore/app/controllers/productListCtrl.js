"use strict";

(function (angular) {

    var productListCtrl = function ($scope, productService) {
        $scope.load = function(category) {
            $scope.products = productService.get(category);
        }
    };

    var productService = function() {
        this.get = function(category) {
            var products = [
                {
                    id: 1,
                    name: "Chang",
                    category: "Beverages",
                    supplier: "Exotic Liquids",
                    quantityPerUnit: "24 - 12 oz bottles",
                    price: 19
                }, {
                    id: 2,
                    name: "Aniseed Syrup",
                    category: "Condiments",
                    supplier: "Exotic Liquids",
                    quantityPerUnit: "12 - 550 ml bottles",
                    price: 10
                }, {
                    id: 3,
                    name: "Chef Anton's Cajun Seasoning",
                    category: "Condiments",
                    supplier: "New Orleans Cajun Delights",
                    quantityPerUnit: "48 - 6 oz jars",
                    price: 22
                }, {
                    id: 4,
                    name: "Chef Anton's Gumbo Mix",
                    category: "Condiments",
                    supplier: "New Orleans Cajun Delights",
                    quantityPerUnit: "36 boxes",
                    price: 21.35
                }, {
                    id: 5,
                    name: "Grandma's Boysenberry Spread",
                    category: "Condiments",
                    supplier: "Grandma Kelly's Homestead",
                    quantityPerUnit: "12 - 8 oz jars",
                    price: 25
                }, {
                    id: 6,
                    name: "Uncle Bob's Organic Dried Pears",
                    category: "Produce",
                    supplier: "Grandma Kelly's Homestead",
                    quantityPerUnit: "12 - 1 lb pkgs.",
                    price: 30
                }
            ];
            
            if (category == null || category === "") {
                return products;
            }
            
            var filteredProducts = [];

            angular.forEach(products, function(product) {
                if (product.category === category) {
                    filteredProducts.push(product);
                }
            });

            return filteredProducts;
        }
    };

    angular.module("eStore")
        .service("productService", productService)
        .controller("productListCtrl", ["$scope", "productService", productListCtrl]);

})(angular);