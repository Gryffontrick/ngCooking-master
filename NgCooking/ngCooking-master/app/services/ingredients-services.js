(function () {

    var ingredientsServices = function ($http) {

        var ingredients = [];

        var getIngredients = function () {
            //return $http.get("json/ingredients.json")
            return $http({
                method: 'GET',
                url: "http://localhost:54224/api/Ingredients/",
                headers: { 'Content-Type': 'application/json' }
            })
              .then(function (response) { 
                  ingredients = response.data;
                  return response.data;
              });
        };

        var getIngredientsByRecipe = function (recipe) {
            return getIngredients().then(function (data) {
                ingredients = data;
                return data.filter(function (dataIngredient) {
                    return recipe.ingredients.some(function (recipeIngredient) {
                        return (recipeIngredient === dataIngredient.id);
                    });
                });
            });
        };

        return {
            getIngredients: getIngredients,
            getIngredientsByRecipe: getIngredientsByRecipe
        };
    };

    var NgCooking = angular.module("NgCooking");
    NgCooking.factory("ingredientsServices", ingredientsServices);
}());