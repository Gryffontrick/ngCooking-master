(function () {

    var app = angular.module("NgCooking", ["ngRoute", "ngCookies", "file-model", "ngFileSaver"]);

    app.config(function ($routeProvider) {
        $routeProvider
          .when("/home", {
            templateUrl: "main.html",
            //controller: "HomeController"
          })
          .when("/recipes", {
            templateUrl: "recipes.html",
              controller: "RecipesController"
          })
          .when("/recipe/:id", {
            templateUrl: "recipe.html",
            controller: "RecipesController"
          })
          .when("/recipe_new", {
              templateUrl: "recipe_new.html",
              controller: "RecipesController"
          })
          .when("/ingredients", {
              templateUrl: "ingredients.html",
              controller: "IngredientsController"
          })
          .when("/community", {
              templateUrl: "community.html",
              controller: "CommunityController"
          })
          .when("/community/profile/:id", {
              templateUrl: "profile.html",
              controller: "CommunityController"
          })
          .otherwise({ redirectTo: "/home" });
    });
}());