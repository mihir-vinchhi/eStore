describe("product listing", function () {

    var $controller, $rootScope;

    beforeEach(module("eStore"));

    beforeEach(inject(function(_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    it("should fetch categories to search products", function () {
        var $scope = $rootScope.$new();

        $controller("productsCtrl", { "$scope": $scope });

        expect($scope.categories).toBeDefined();
        expect($scope.categories.length).toBe(3);
    });
});