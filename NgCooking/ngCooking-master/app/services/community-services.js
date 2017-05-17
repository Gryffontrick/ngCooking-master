(function () {

    var communityServices = function ($http, recipesServices) {
        var cookLevels = ["Rookie", "Confirmed", "Expert"];
        var recipes = [];

        // ------------------------------------------------------------
        // Helpers
        // ------------------------------------------------------------
        var getCookRatings = function (cook) {
            cook.ratings = 0.0;

            if (cook.recipes) {
                cook.recipes.forEach((recipe) => {
                    cook.ratings += recipe.ratings;
                });

                cook.ratings /= cook.recipes.length;
            }

            return cook.ratings;
        };

        var formatCook = function (cook) {
            // Age
            cook.age = (new Date(Date.now())).getFullYear() - cook.birth;    // TODO : Faire ça plus proprement, en prenant en compte le timestamp
            // Level
            cook.textLevel = getCookLevel(cook.level);

            //// Recipes
            cook.recipes = recipes.filter(recipe => {
                return recipe.creatorId == cook.id;
            });

            // Ratings
            cook.ratings = getCookRatings(cook);

            return cook;
        };

        // ------------------------------------------------------------
        // Services
        // ------------------------------------------------------------
        var getCommunity = function () {
            //return $http.get("json/community.json")
            return $http({
                method: 'GET',
                url: "http://localhost:54224/api/Cooks",
                headers: { 'Content-Type': 'application/json' }
            })
            .then(function (response) {
            // Recipes
            return recipesServices.getRecipes()
                .then(function (data) {
                    recipes = data;

                    // Retrieving cook specific information
                    response.data.forEach(cook => formatCook(cook));

                    return response.data;
                });
            });
        };

        var getUserByLogin = function (login) {
            return getCommunity()
                .then(function (data) {
                    return data.find((user) => user.email == login);
                });
        };

        var getUserById = function (id) {
            return $http({
                method: 'GET',
                url: "http://localhost:54224/api/Cooks/" + id,
                headers: { 'Content-Type': 'application/json' }
            })
            //return getCommunity()
                .then(function (response) {
                    var cook = formatCook(response.data);
                    return cook;
                });
        };

        var getCookLevel = function(level){
            var levelText = "Unknown";
            if (level > 0 && level <= cookLevels.length) {
                levelText = cookLevels[level - 1];
            }

            return levelText;
        };

        // ------------------------------------------------------------
        // Exposing
        // ------------------------------------------------------------
        return {
            getCommunity: getCommunity,
            getUserByLogin: getUserByLogin,
            getUserById: getUserById
        };
    };

    var NgCooking = angular.module("NgCooking");
    NgCooking.factory("communityServices", ["$http", "recipesServices", communityServices]);
}());