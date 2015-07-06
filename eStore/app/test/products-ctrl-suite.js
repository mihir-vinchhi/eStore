///<reference path="~/bower_components/angular/angular.js"/>
///<reference path="~/bower_components/angular-mocks/angular-mocks.js"/>
///<reference path="~/bower_components/angular-resource/angular-resource.js"/>
///<reference path="~/bower_components/angular-route/angular-route.js"/>
///<reference path="~/bower_components/underscore/underscore-min.js" />
///<reference path="~/app/app.js"/>
///<reference path="~/app/services/products-service.js"/>
///<reference path="~/app/services/product-list-service.js"/>
///<reference path="~/app/services/shopping-cart-service.js"/>
///<reference path="~/app/controllers/products-ctrl.js"/>

describe("product listing", function () {

    "use strict";

    var $controller, $rootScope, $httpBackend,
        noop = function() {};

    beforeEach(module("eStore"));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));

    it("should fetch categories to filter products", function () {
        var $scope = $rootScope.$new();

        var categories = [
            { id: 1, name: "category 1" },
            { id: 2, name: "category 2" },
            { id: 3, name: "category 3" }
        ];

        $httpBackend
            .whenGET("/api/Products")
            .respond({ categories: categories });

        $httpBackend
            .whenGET("/api/ProductList?category=")
            .respond({ products: [] });

        $controller("productsCtrl", { "$scope": $scope });

        $httpBackend.flush();

        expect($scope.categories).toBeDefined();
        expect($scope.categories.length).toBe(3);
        expect($scope.categories[0].id).toBe(1);
        expect($scope.categories[0].name).toBe("category 1");
        expect($scope.categories[1].id).toBe(2);
        expect($scope.categories[1].name).toBe("category 2");
        expect($scope.categories[2].id).toBe(3);
        expect($scope.categories[2].name).toBe("category 3");
    });

    it("should fetch all products on start up", function() {
        var $scope = $rootScope.$new();

        var products = [
            { id: 1, name: "Product 1", categoryID: 1, category: "Category 1", supplierID: 1, supplier: "Supplier 1", quantityPerUnit: 5, price: 10 },
            { id: 2, name: "Product 2", categoryID: 2, category: "Category 2", supplierID: 1, supplier: "Supplier 1", quantityPerUnit: 12, price: 60 }
        ];

        $httpBackend
            .whenGET("/api/Products")
            .respond({ categories: [] });

        $httpBackend
            .whenGET("/api/ProductList?category=")
            .respond({ products: products });

        $controller("productsCtrl", { "$scope": $scope });

        $httpBackend.flush();

        expect($scope.products).toBeDefined();
        expect($scope.products.length).toBe(2);

        expect($scope.products[0].id).toBe(1);
        expect($scope.products[0].name).toBe("Product 1");
        expect($scope.products[0].categoryID).toBe(1);
        expect($scope.products[0].category).toBe("Category 1");
        expect($scope.products[0].supplierID).toBe(1);
        expect($scope.products[0].supplier).toBe("Supplier 1");
        expect($scope.products[0].quantityPerUnit).toBe(5);
        expect($scope.products[0].price).toBe(10);

        expect($scope.products[1].id).toBe(2);
        expect($scope.products[1].name).toBe("Product 2");
        expect($scope.products[1].categoryID).toBe(2);
        expect($scope.products[1].category).toBe("Category 2");
        expect($scope.products[1].supplierID).toBe(1);
        expect($scope.products[1].supplier).toBe("Supplier 1");
        expect($scope.products[1].quantityPerUnit).toBe(12);
        expect($scope.products[1].price).toBe(60);
    });

    it("should filter products by category", function() {
        var $scope = $rootScope.$new();

        var productListService = {
            executeQuery: function(category) {
                return {
                    success: noop
                };
            }
        };

        spyOn(productListService, "executeQuery").and.callThrough();

        $controller("productsCtrl", { "$scope": $scope, "productListService": productListService });
        
        $scope.loadProducts("Category 1");

        expect(productListService.executeQuery).toHaveBeenCalledWith("Category 1");
    });

    it("should filter products by changing query in location", function() {
        var $scope = $rootScope.$new(),
            $event = {
                preventDefault: noop
            },
            $location = {
                search: function(parameters) { }
            };

        spyOn($location, "search");

        $controller("productsCtrl", { "$scope": $scope, "$location": $location });

        $scope.filterProducts({ name: "Category 1" }, $event);

        expect($location.search).toHaveBeenCalledWith({ category: "Category 1" });
        expect($scope.categoryFilter).toBe("Category 1");
    });

    it("should clear category filter", function () {
        var $scope = $rootScope.$new(),
            $event = {
                preventDefault: noop
            },
            $location = {
                search: function (parameters) { }
            };

        spyOn($location, "search");

        $controller("productsCtrl", { "$scope": $scope, "$location": $location });

        $scope.clearFilter($event);

        expect($location.search).toHaveBeenCalledWith({});
        expect($scope.categoryFilter).toBeNull();
    });

});