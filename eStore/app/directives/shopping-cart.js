(function (angular) {

    "use strict";

    var directive = function () {
        return {
            restrict: "E",
            templateUrl: "app/views/shopping-cart.html",
            controller: "shoppingCartCtrl"
        };
    };

    angular.module("eStore").directive("shoppingCart", directive);

})(angular);
