(function () {
    var NgCooking = angular.module("NgCooking");

    var IngredientsController = function ($scope, homeServices, ingredientsServices, ingredientsCategoriesServices, recipesServices) {
        homeServices.setActivePage("ingredients");

        $scope.initHomePage = function () {

            ingredientsServices.getIngredients()
                .then(function (data) {
                    $scope.ingredients = data;
                    /*.sort(function (similarA, similarB) {
                        // Tri Alphabétique
                        return (similarA.name > similarB.name);
                    });
                    //*/

                    // Ingredients Similaires
                    $scope.ingredients.forEach(ingredient => {
                        ingredient.similars = [];
                        ingredient.similars = data.filter(similar => {
                            return ((ingredient.category == similar.category) && (ingredient.id != similar.id));
                        }).sort(function (similarA, similarB) {
                            // Valeur calorique proche : 100
                            return ((similarA.calories - similarB.calories) >= 100);
                        }).sort(function (similarA, similarB) {
                            // Tri Alphabétique
                            return (similarA.name > similarB.name);
                        }).splice(0, 3);
                        // ingredients categories Services
                        ingredientsCategoriesServices.getIngredientCategory(ingredient.category).then(function (category) {
                            ingredient.categoryDisplayName = category.nameToDisplay;
                        });
                    });
                    $scope.displayLimit = 10;
                    $scope.showShowMoreButton = ($scope.ingredients.length > $scope.displayLimit);
                });
        };

        $scope.showMore = function () {
            if ($scope.displayLimit < $scope.ingredients.length)
                $scope.displayLimit += $scope.displayPitch;
        };

        $scope.ingredients = [];
        $scope.displayLimit = 0;
        $scope.displayPitch = 10;
        $scope.showShowMoreButton = false;

        $scope.ingredientsSearch = {
            name: "",
            categoryFilter: "",
            minCalories: null,
            maxCalories: null,
            nbOfresults: 0,
        };

        $scope.filter = function (ingredient) {
            var sortOrder = true;

            // Name Filter
            if ($scope.ingredientsSearch.name != "") {
                sortOrder = sortOrder && ingredient.name.includes($scope.ingredientsSearch.name);
            }
            // Category Filter
            if ($scope.ingredientsSearch.categoryFilter != "") {
                sortOrder = sortOrder && ingredient.category === $scope.ingredientsSearch.name;
            }
            // Calories Filter
            if (($scope.ingredientsSearch.minCalories != null) || ($scope.ingredientsSearch.maxCalories != null)) {
                if ($scope.ingredientsSearch.minCalories == null) {
                    sortOrder = sortOrder && ($scope.ingredientsSearch.maxCalories >= ingredient.calories);
                }
                else if ($scope.ingredientsSearch.maxCalories == null) {
                    sortOrder = sortOrder && ($scope.ingredientsSearch.minCalories <= ingredient.calories);
                }
                else {
                    sortOrder = sortOrder && (($scope.ingredientsSearch.minCalories <= ingredient.calories) && ($scope.ingredientsSearch.maxCalories >= ingredient.calories));
                }
            }

            return sortOrder;
        };

        $scope.caloriesFilter = function (prop) {

            return function (ingredient) {
                var filteredArray = $scope.ingredients.filter(i => $scope.filter(i));
                $scope.showShowMoreButton = (filteredArray.length > $scope.displayLimit);

                if ($scope.ingredientsSearch.minCalories == null && $scope.ingredientsSearch.maxCalories == null) {
                    return true;
                }
                else if ($scope.ingredientsSearch.minCalories == null) {
                    return ($scope.ingredientsSearch.maxCalories >= ingredient[prop]);
                }
                else if ($scope.ingredientsSearch.maxCalories == null) {
                    return ($scope.ingredientsSearch.minCalories <= ingredient['calories']);
                }
                else {
                    return (($scope.ingredientsSearch.minCalories <= ingredient[prop]) && ($scope.ingredientsSearch.maxCalories >= ingredient[prop]));
                }
            }
        };

        $scope.initHomePage();
    };

    NgCooking.controller("IngredientsController", ["$scope", "homeServices", "ingredientsServices", "ingredientsCategoriesServices", "recipesServices", IngredientsController]);
}());