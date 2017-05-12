(function () {
    // Appel au module "NgCooking"
    var NgCooking = angular.module("NgCooking");

    // Définition des comportements du contrôleur "Community Controller"
    var CommunityController = function ($scope, $routeParams, homeServices, communityServices, recipesServices) {
        
        // ===== FONCTIONS =====
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ----- Set Active : Set dans le contrôleur parent "Home Controller" la page active à "community" (Navigation) -----
        homeServices.setActivePage("community");

        // ***** Init Home Page *****
        // Initialisation du controller "Community Controller"
        // -----------------------------------------------
        $scope.initHomePage = function () {
            if ($routeParams.id) {
                communityServices.getUserById($routeParams.id)
                    .then(function (cook) {
                        // CommunityServices.GetCookById - "Then" Promise
                        $scope.cook = cook;
                        $scope.showCookRecipes = (cook.recipes.length > 0);
                    });
            }
            else {
                communityServices.getCommunity()
                    .then(function (community) {
                        // CommunityServices.GetCommunity - "Then" Promise
                        $scope.community = community;
                        $scope.showShowMoreButton = ($scope.community.length > $scope.displayLimit);
                    });
            }
        };

        // ***** Show More *****
        // Affichage paginé des cuisiniers de la liste
        // -----------------------------------------------
        $scope.showMore = function () {
            if ($scope.displayLimit < $scope.community.length)
                $scope.displayLimit += $scope.displayPitch;

            $scope.showShowMoreButton = ($scope.community.length > $scope.displayLimit);
        };

        // ***** Show Less *****
        // Affichage paginé des cuisiniers de la liste
        // -----------------------------------------------
        //$scope.showLess = function () {
        //    if($scope.displayLimit > $scope.displayPitch)
        //        $scope.displayLimit -= $scope.displayPitch;
        //};

        // ===== VARIABLES =====
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // ----- Modèle objet -----
        $scope.community = [];
        $scope.cook;

        // ----- Interface utils -----
        $scope.displayLimit = 12;
        $scope.displayPitch = 12;
        $scope.sortOrder = '-ratings';
        $scope.showShowMoreButton = false;
        $scope.showCookRecipes = false;
        $scope.cookLevels = ["Rookie", "Confirmed", "Expert"];
        $scope.maxHearts = [1, 2, 3, 4, 5];

        // *********************************/
        // Init "Community Controller"
        // *********************************/
        $scope.initHomePage();
    };

    // Ajout du contrôleur au module "NgCooking"
    NgCooking.controller("CommunityController", ["$scope", "$routeParams", "homeServices", "communityServices", "recipesServices", CommunityController]);
}());