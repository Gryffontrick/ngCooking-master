(function () {
    // Appel au module "NgCooking"
    var NgCooking = angular.module("NgCooking");

    // Définition des comportements du contrôleur "RecipesController Controller"
    var RecipesController = function ($scope, $routeParams, $cookies, FileSaver, Blob, SaveAs, communityServices, homeServices, ingredientsServices, ingredientsCategoriesServices, recipesServices) {

        // ===== FONCTIONS =====
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ----- Set Active : Set dans le contrôleur parent "Home Controller" la page active à "recipes" (Navigation) -----
        homeServices.setActivePage("recipes");

        // ***** Init Home Page *****
        // Initialisation du controller "Recipes Controller"
        // -----------------------------------------------
        $scope.initHomePage = function () {
            if ($routeParams.id) {
                $scope.isUserConnected = true;

                recipesServices.getRecipeById($routeParams.id).then(function (recipe) {
                    $scope.currentRecipe = recipe;

                    $scope.currentRecipe.comments.forEach(comment => {
                        communityServices.getUserById(comment.userId).then(function (user) {
                            comment.user = user;
                        });
                    });

                    //ingredientsServices.getIngredientsByRecipe($scope.currentRecipe)
                    //    .then(function (recipeIngredients) {
                    //        $scope.currentRecipe.listIngredients = recipeIngredients;
                    //    });

                    $scope.showShowMoreButton = ($scope.currentRecipe.comments.length > $scope.displayLimit);
                });
            }
            else{
                recipesServices.getRecipes()
                    .then(function (data) {
                        $scope.recipes = data;

                        //$scope.currentRecipe = {
                        //    "id": "",
                        //    "name": "",
                        //    "creatorId": 0,
                        //    "creationDate": 0,
                        //    "isAvailable": true,
                        //    "category": "",
                        //    "picture": null,
                        //    "calories": 0,
                        //    "listIngredients": null,
                        //    "preparation": ""
                        //};
                    });

                ingredientsServices.getIngredients()
                    .then(function (recipeIngredients) {
                        $scope.ingredients = recipeIngredients.sort(function (ingredientA, ingredientB) {
                            return (ingredientA.name > ingredientB.name);
                        });
                        $scope.currentIngredientId = recipeIngredients[0];
                    });

                ingredientsCategoriesServices.getIngredientsCategories()
                    .then(function (ingredientsCategories) {
                        $scope.ingredientsCategories = ingredientsCategories;
                    });

                $scope.clearSearchResults();
            }
        };

        $scope.hasComments = function () {
            return function (recipe) {
                return (recipe['comments'] && true);
            }
        };

        // ***** Format Date *****
        // Met au format local de date, en chaîne de caractères, le timestamp
        // ----------------------------------------------------------------------
        $scope.formatDate = function (timestamp) {
            return new Date(timestamp).toLocaleDateString();
        };

        // ***** Format Time *****
        // Met au format local de temps, en chaîne de caractères, le timestamp
        // ----------------------------------------------------------------------
        $scope.formatTime = function (timestamp) {
            return new Date(timestamp).toLocaleTimeString();
        };

        // Watcher pour l'import de fichier image
        // ------------------------------------------------
        $scope.$watch('file', function (file) {
            if (file) {
                $scope.currentRecipe.picture = $scope.file.name;
            }
        });

        $scope.hasAlreadyCommented = function (loggedUserId) {
            return !$scope.currentRecipe.comments.includes(comment => {
                comment.userId == loggedUserId;
            });
        };

        $scope.addIngredient = function () {
            var ingredient = $scope.ingredients.find(ingredient => ingredient.id == $scope.currentIngredientId);

            if (ingredient) {
                $scope.recipeSearch.ingredients.push(ingredient);
                $scope.totalCaloricValue += ingredient.calories;
            }
        };

        $scope.removeIngredient = function (ingredientId) {
            var ingredient = $scope.ingredients.find(ingredient => ingredient.id == ingredientId);
            $scope.recipeSearch.ingredients.splice($scope.listeIngredients.indexOf(ingredient), 1);
            $scope.totalCaloricValue -= ingredient.calories;
        };

        $scope.addRecipe = function () {
            var login = $cookies.get("currentUser");
            if (login) {
                communityServices.getUserByLogin(login)
                    .then(function (user) {
                        $scope.currentRecipe.creatorId = user.id;
                        $scope.currentRecipe.creationDate = Date.now();
                        $scope.currentRecipe.calories = $scope.totalCaloricValue;
                        $scope.currentRecipe.id = $scope.currentRecipe.name.toLowerCase();
                        //$scope.recipe.picture = $scope.file.name;
                        $scope.currentRecipe.ingredients = [];
                        $scope.listeIngredients.forEach(ingredient => {
                            $scope.currentRecipe.ingredients.push(ingredient.name);
                        });
                        
                        $scope.recipes.push($scope.currentRecipe);

                        // TODO : Trouver un moyen de sérialiser dans le fichier JSON la liste des recettes
                        // -----------------------------------------------
                        //var stringRecipes = JSON.stringify(recipe);
                        //var blob = new Blob(($scope.recipes), { type: "text/plain;charset=utf-8" });
                        //FileSaver.saveAs(blob, "recipes.json");
                        //recipesServices.addRecipe($scope.recipe);
                    });
            }
        };

        $scope.showMore = function () {
            if ($scope.displayLimit < $scope.currentRecipe.comments.length)
                $scope.displayLimit += $scope.displayPitch;

            $scope.showShowMoreButton = ($scope.currentRecipe.comments.length > $scope.displayLimit);
        };

        $scope.filterRecipeCalories = function(nbOfCalories){
            var filterOk = true;
            // Calories Filter
            if (($scope.recipeSearch.minCalories != null) || ($scope.recipeSearch.maxCalories != null)) {
                if ($scope.recipeSearch.minCalories == null) {
                    filterOk = filterOk && ($scope.recipeSearch.maxCalories >= nbOfCalories);
                }
                else if ($scope.recipeSearch.maxCalories == null) {
                    filterOk = filterOk && ($scope.recipeSearch.minCalories <= nbOfCalories);
                }
                else {
                    filterOk = filterOk && (($scope.recipeSearch.minCalories <= nbOfCalories) && ($scope.recipeSearch.maxCalories >= nbOfCalories));
                }
            }

            return filterOk;
        };

        // ***** SEARCH RECIPE *****
        // Fonction de recherche de recette en fonction du nom, des ingrédients la composant et de sa valeur calorique totale (fourchette min/max)
        // ---------------------------------
        $scope.searchRecipe = function () {
            $scope.recipeSearch.results = [];
            var recipeResults = null;

            recipeResults = $scope.recipes.filter(
                recipe => {
                    var searchOk = true;

                    // Name Filter
                    if ($scope.recipeSearch.name != "") {
                        searchOk = searchOk && recipe.name.includes($scope.recipeSearch.name);
                    }

                    // Ingredients Filter
                    $scope.recipeSearch.ingredients.forEach(
                        ingredient => {
                            searchOk = searchOk && recipe.ingredients.includes(ingredient.id);
                        });

                    // Calories Filter
                    searchOk = searchOk && $scope.filterRecipeCalories(recipe.calories);

                    return searchOk;
                });

            if (recipeResults) {
                recipeResults.forEach(result => {
                    $scope.recipeSearch.results.push(result);
                });
            };

            $scope.recipeSearch.searchClicked = true;
            $scope.recipeSearch.showSortArea = $scope.recipeSearch.results.length > 1;
        };

        $scope.clearSearchResults = function () {
            if (!$scope.recipeSearch)
                $scope.recipeSearch = {};

            $scope.recipeSearch.name = "";
            $scope.recipeSearch.ingredients = [];
            $scope.recipeSearch.results = [];
            $scope.recipeSearch.minCalories = null;
            $scope.recipeSearch.maxCalories = null;
            $scope.recipeSearch.showSortArea = false;
            $scope.recipeSearch.sortOrder = '+name';
            $scope.recipeSearch.searchClicked = false;
            $scope.recipeSearch.ingredientsCategoriesFilter = "";
            $scope.currentIngredientId = "";
        };

        $scope.currentRecipe;
        $scope.recipeSearch;

        $scope.isUserConnected = false;
        $scope.currentRecipe;
        $scope.recipes = [];
        $scope.topRecipes = [];
        $scope.latestRecipes = [];
        $scope.ingredients = [];
        $scope.maxHearts = [1, 2, 3, 4, 5];

        $scope.listeIngredients = [];
        $scope.ingredientsCategories = [];
        $scope.currentIngredientId = "";
        $scope.totalCaloricValue = 0;
        $scope.recipePlaceholder = "recette_placeholder.jpg";
        $scope.file = null;

        $scope.confirmAddNewRecipe= false;

        // Limits
        $scope.displayLimit = 5;
        $scope.newRecipesLimit = 4;
        $scope.topRecipesLimit = 4;

        $scope.initHomePage();
    };

    // Ajout du contrôleur au module "NgCooking"
    NgCooking.controller("RecipesController", ["$scope", "$routeParams", "$cookies", "FileSaver", "Blob", "SaveAs", "communityServices", "homeServices", "ingredientsServices", "ingredientsCategoriesServices", "recipesServices", RecipesController]);
}());