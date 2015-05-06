"use strict";

describe("product listing", function () {

    var $controller, $rootScope, $httpBackend, productCatalogueService;

    beforeEach(module("eStore"));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _productCatalogueService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        productCatalogueService = _productCatalogueService_;
    }));

    it("should fetch categories to search products", function () {
        var $scope = $rootScope.$new();

        var categories = [
            { id: 1, name: "category 1" },
            { id: 2, name: "category 2" },
            { id: 3, name: "category 3" }
        ];

        $httpBackend
            .whenGET("/api/ProductCatalogue")
            .respond({ categories: categories });

        $httpBackend
            .whenGET("/api/ProductSearch?category=")
            .respond({ products: [] });

        $controller("productsCtrl", { "$scope": $scope, "productCatalogueService": productCatalogueService });

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
});