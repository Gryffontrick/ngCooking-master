(function () {
    // Appel au module "NgCooking"
    var NgCooking = angular.module("NgCooking");

    // Définition des comportements du contrôleur "Home Controller"
    var HomeController = function ($scope, $cookies, $location, homeServices, communityServices, recipesServices) {

        // ===== FONCTIONS =====
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ----- Set Active : Set la page active à "home" (Navigation) -----
        homeServices.setActivePage("home");

        // ***** Init Home Page *****
        // Initialisation du controller "Home Controller"
        // -----------------------------------------------
        $scope.initHomePage = function () {

            // Récupération des dernières recettes
            recipesServices.getLatestRecipes()
                .then(function(data){
                    $scope.latestRecipes = data;
                });

            // Récupération des meilleures recettes
            recipesServices.getTopRecipes()
                .then(function (data) {
                    $scope.topRecipes = data;
                });

            // Récupération de l'utilisateur courant connecté (en cookie)
            var login = $cookies.get("currentUser");
            if (login) {
                communityServices.getUserByLogin(login)
                    .then(function (user) {
                        $scope.ngCookingUser = user;
                    });
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

        // ***** Set Active Page *****
        // Modifie au niveau application la page active
        // --------------------------------------------
        $scope.setActivePage = function (page) {
            $scope.activePage = page;
        }

        // ***** Connect *****
        // Connecte un utilisateur à partir d'un email et d'un mot de passe
        // -----------------------------------------------------------------
        $scope.connect = function () {
            communityServices.getUserByLogin($scope.login)
                .then(function (user) {
                    $scope.ngCookingUser = user;
                    $cookies.put("currentUser", $scope.login);
                    $scope.$broadcast("userConnection", $scope.login);
                    $(".popin").removeClass("displayed");
                });
        }

        // ***** Disconnect *****
        // Déconnecte l'utilisateur courant connecté à l'application
        // ----------------------------------------------------------
        $scope.disconnect = function () {
            $scope.ngCookingUser = null;
            $cookies.remove("currentUser");

            $scope.activePage = "home";
            $location.path("/home");
        };

        // ===== EVENEMENTS =====
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // ----- OnActivePageUpdated -----
        // Mise à jour de la page courante au niveau de l'application
        $scope.$on('activePageUpdated', function ($event, page) {
            $scope.setActivePage(page);
        });

        // ===== VARIABLES =====
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // ----- Landing -----
        $scope.greetings = " sur NgCooking";

        // ----- Navigation -----
        $scope.activePage = "home";

        // ----- Gestion de la connexion - Utilisateur courant -----
        $scope.ngCookingUser = null;
        $scope.login;
        $scope.password;

        // ----- Modèle objet -----
        $scope.latestRecipes = [];
        $scope.topRecipes = [];
        
        // ----- Interface utils -----
        $scope.maxHearts = [1, 2, 3, 4, 5];
        $scope.topRecipesDisplayLimit = 4;
        $scope.latestRecipesDisplayLimit = 4;

        // *********************************/
        // Init "Home Controller"
        // *********************************/
        $scope.initHomePage();
    };

    // Ajout du contrôleur au module "NgCooking"
    NgCooking.controller("HomeController", ["$scope", "$cookies", "$location", "homeServices", "communityServices", "recipesServices", HomeController]);
}());