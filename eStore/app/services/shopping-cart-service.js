(function(angular, _, undefined) {

    "use strict";

    var shoppingCartService = function ($rootScope) {

        var items = [];

        this.getItems = function() {
            return items;
        };

        this.addItem = function (cartItem) {

            var foundItem = _.findWhere(items, { productID: cartItem.productID });

            if (foundItem == undefined) {
                items.push({
                    productID: cartItem.productID,
                    quantity: cartItem.quantity || 1
                });
            } else {
                var quantity = cartItem.quantity || 1;
                foundItem.quantity += quantity;
            }

            $rootScope.$broadcast("itemAdded");
        };
    };

    angular.module("eStore")
        .service("shoppingCartService", ["$rootScope", shoppingCartService]);

}(angular, _));
