///<reference path="~/bower_components/angular/angular.js"/>
///<reference path="~/bower_components/angular-mocks/angular-mocks.js"/>
///<reference path="~/bower_components/angular-resource/angular-resource.js"/>
///<reference path="~/bower_components/angular-route/angular-route.js"/>
///<reference path="~/bower_components/underscore/underscore-min.js" />
///<reference path="~/app/app.js"/>
///<reference path="~/app/services/shopping-cart-service.js"/>

describe("shopping cart", function() {

    "use strict";

    var $rootScope;

    beforeEach(module("eStore"));

    beforeEach(function () {
        $rootScope = {
            $broadcast: function(event) {},
            dummy: 'Dummy'
        };

        module(function($provide) {
            $provide.value("$rootScope", $rootScope);
        });
    });

    it("should add item to cart", inject(function(shoppingCartService) {
        shoppingCartService.addItem({ productID: 1, quantity: 1 });

        var items = shoppingCartService.getItems();

        expect(items).toBeDefined();
        expect(items.length).toBe(1);

        var item = items[0];

        expect(item.productID).toBe(1);
        expect(item.quantity).toBe(1);
    }));

    it("should add 1 quantity when quantity is not given", inject(function (shoppingCartService) {
        shoppingCartService.addItem({ productID: 1 });

        var items = shoppingCartService.getItems();

        expect(items).toBeDefined();
        expect(items.length).toBe(1);

        var item = items[0];

        expect(item.productID).toBe(1);
        expect(item.quantity).toBe(1);
    }));

    it("should broadcast item added event", inject(function (shoppingCartService) {
        spyOn($rootScope, "$broadcast");
        
        shoppingCartService.addItem({ productID: 1 });

        expect($rootScope.$broadcast).toHaveBeenCalledWith("itemAdded");
    }));

    it("should add quantity when a product added multiple times", inject(function(shoppingCartService) {
        shoppingCartService.addItem({ productID: 1, quantity: 2 });
        shoppingCartService.addItem({ productID: 2 });
        shoppingCartService.addItem({ productID: 1, quantity: 1 });

        var items = shoppingCartService.getItems();

        expect(items).toBeDefined();
        expect(items.length).toBe(2);

        var item = items[0];

        expect(item.productID).toBe(1);
        expect(item.quantity).toBe(3);

        item = items[1];

        expect(item.productID).toBe(2);
        expect(item.quantity).toBe(1);
    }));

});