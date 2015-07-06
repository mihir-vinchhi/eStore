(function (angular) {

    "use strict";

    var shoppingCartCtrl = function ($scope, shoppingCartService) {

        $scope.itemsCount = shoppingCartService.getItems().length;

        $scope.$on("itemAdded", function () {
            $scope.itemsCount = shoppingCartService.getItems().length;
        });
    };

    shoppingCartCtrl.$inject = ["$scope", "shoppingCartService"];

    angular.module("eStore").controller("shoppingCartCtrl", shoppingCartCtrl);

})(angular);
