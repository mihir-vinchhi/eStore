"use strict";

(function (angular) {

    var directive = function() {
        return {
            restrict: "E",
            templateUrl: "app/views/productList.html",
            controller: "productListCtrl",
            scope: { filterByCategory: "@" },
            link: function ($scope, element, attrs) {
                $scope.$watch("filterByCategory", function(newVal, oldVal) {
                    $scope.load(newVal);
                });
            }
        };
    };

    angular.module("eStore").directive("productList", directive);

})(angular);