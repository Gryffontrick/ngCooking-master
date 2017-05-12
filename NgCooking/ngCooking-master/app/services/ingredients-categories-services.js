(function () {

    var ingredientsCategoriesServices = function ($http) {

        var ingredientsCategories = [];

        var getIngredientsCategories = function () {
            return $http.get("json/ingredients-categories.json")
              .then(function (response) {
                  ingredientsCategories = response.data;
                  return response.data;
              });
        };

        var getIngredientCategory = function (categoryId) {
            return $http.get("json/ingredients-categories.json")
              .then(function (response) {
                  ingredientsCategories = response.data;
                  return ingredientsCategories.find(category => category.id == categoryId);
              });
        };

        return {
            getIngredientsCategories: getIngredientsCategories,
            getIngredientCategory: getIngredientCategory,
        };
    };

    var NgCooking = angular.module("NgCooking");
    NgCooking.factory("ingredientsCategoriesServices", ingredientsCategoriesServices);
}());