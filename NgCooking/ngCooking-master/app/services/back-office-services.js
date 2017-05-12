(function () {

    var backOfficeServices = function ($http) {

        var getValue = function () {
            return $http.get("http://localhost:8733/Design_Time_Addresses/NgCookingBO/Service1/")
              .then(function (response) {
                  alert("hello!!!!!!");
                  return response.data;
              });
        };

        return {
            getValue: getValue,
        };
    };

    var NgCooking = angular.module("NgCooking");
    NgCooking.factory("backOfficeServices", backOfficeServices);
}());