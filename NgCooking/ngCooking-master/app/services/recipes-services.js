(function () {

    var recipesServices = function ($http) {

        var formatRecipe = function (recipe)
        {
            var ratingsBundle = getRecipeRatings(recipe);

            if (ratingsBundle != null) {
                recipe.ratings = ratingsBundle.ratings;
                recipe.votes = ratingsBundle.votes;
            }

            return recipe;
        };

        var getRecipes = function () {
            //return $http.get("json/recipes.json")
            return $http({
                method: 'GET',
                url: "http://localhost:54224/api/Recipes/",
                headers: { 'Content-Type': 'application/json' }
            })
              .then(function (response) {
                  var recipes = response.data;
                  if (recipes) {
                      recipes.forEach((recipe) => {
                          formatRecipe(recipe);
                      });
                  }

                  return recipes;
              });
        };

        var getRecipeById = function (recipeId) {
            //return getRecipes()
            return $http({
                method: 'GET',
                url: "http://localhost:54224/api/Recipes/" + recipeId,
                headers: { 'Content-Type': 'application/json' }
            })
            .then(function (response) {
                return formatRecipe(response.data);
            });
        };

        var getRecipesByCook = function (cookId) {
            return getRecipes()
              .then(function (recipes) {
                  return recipes.filter(function (recipe) {
                      return recipe.creatorId == cookId;
                  });
              });
        };

        var getRecipeRatings = function (recipe) {
            var ratingsBundle = null;

            if (recipe) {
                if (recipe.comments) {

                    ratingsBundle = {
                        ratings: 0,
                        votes: 0
                    };

                    recipe.comments.forEach((comment) => {
                        if (comment.mark != null) {
                            ratingsBundle.ratings += comment.mark;
                            ratingsBundle.votes++;
                        }
                    });

                    ratingsBundle.ratings /= ratingsBundle.votes;
                }
            }

            return ratingsBundle;
        };

        var addRecipe = function (recipe) {
            getRecipes().then(function (data) {
                recipes = data;
                recipes.push(recipe);

                var config = {
                    header: {
                        "Content-Type": "application/json"
                    }
                };

                var res = $http.post("./recipes.json", { test: "test" }, config).subscribe();

                res.success(function (data, status, headers, config) {
                    alert("POST ok");
                });
                res.error(function (data, status, headers, config) {
                    alert("failure message: " + JSON.stringify({ data: data }));
                });
                //var stringRecipes = JSON.stringify(recipe);

                //var blob = new Blob([stringRecipes], { type: "text/plain;charset=utf-8" });
                //FileSaver.saveAs(blob, "../../json/recipes.json");
            });
        };

        return {
            getRecipes: getRecipes,
            getRecipesByCook: getRecipesByCook,
            getRecipeById: getRecipeById,
            getRecipeRatings: getRecipeRatings,
            addRecipe: addRecipe,
            getTopRecipes: getTopRecipes,
            getLatestRecipes: getLatestRecipes
        };
    };

    var NgCooking = angular.module("NgCooking");
    NgCooking.factory("recipesServices", recipesServices);
}());