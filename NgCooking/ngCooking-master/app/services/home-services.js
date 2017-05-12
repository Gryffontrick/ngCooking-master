(function () {

    var homeServices = function ($http, $rootScope) {

        var activePage = "home";

        var setActivePage = function (page) {
            activePage = page;
            $rootScope.$broadcast("activePageUpdated", page);
        };

        var getActivePage = function () {
            return activePage;
        };

        return {
            activePage: activePage,
            setActivePage: setActivePage,
            getActivePage: getActivePage
        };
    };

    var NgCooking = angular.module("NgCooking");
    NgCooking.factory("homeServices", homeServices);
}());