///<reference path="~/bower_components/angular/angular.js"/>
///<reference path="~/bower_components/angular-mocks/angular-mocks.js"/>
///<reference path="~/bower_components/angular-resource/angular-resource.js"/>
///<reference path="~/bower_components/angular-route/angular-route.js"/>
///<reference path="~/bower_components/angular-route/angular-route.js"/>
///<reference path="~/app/app.js"/>
///<reference path="~/app/services/products-service.js"/>
///<reference path="~/app/services/product-list-service.js"/>
///<reference path="~/app/controllers/products-ctrl.js"/>

describe("product listing", function () {

    "use strict";

    var $controller, $rootScope, $httpBackend, productsService;

    beforeEach(module("eStore"));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _productsService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        productsService = _productsService_;
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

        $controller("productsCtrl", { "$scope": $scope, "productsService": productsService });

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

    it("should ", function() {

    });

});