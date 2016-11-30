angular
    .module("irvineBeer")
    .controller("breweriesController", function ($scope, $http, userInfo) {

        // Global variables
        userInfo.getUserId(function (userId) {
            $scope.userId = userId;
        });
        $scope.breweries = [];
        $scope.newComment = {};
        $scope.updateComment = {};
        $scope.currentObject = {};
        $scope.currentBrewery = null;
        $scope.currentBeer = null;
        $scope.wishlistBreweries = [];
        $scope.wishlistBeers = [];
        $scope.commentId = 168;
        $scope.wishlistNumber = ($scope.wishlistBreweries.length + $scope.wishlistBeers.length);

        // http request for jason file
        $http.get("http://localhost:8080/data/Breweries.json")
            .then(function (response) {
                $scope.breweries = response.data.breweries;
            });

        $scope.selectCurrentBrewery = function (brewery) {
            $scope.currentBrewery = brewery;
        }

        $scope.selectCurrentBeer = function (beer) {
            $scope.currentBeer = beer;
        }

        $scope.addComment = function (currentObject) {

            var newComment = {};
            newComment.id = $scope.commentId++;
            newComment.userId = $scope.userId;
            newComment.title = $scope.newComment.title;
            newComment.content = $scope.newComment.content;
            newComment.rating = $scope.newComment.rating;

            $scope.currentObject.comments.push(newComment);

            $scope.newComment.title = "";
            $scope.newComment.content = "";
            $scope.newComment.rating = null;

        }

        $scope.triggerUpdateBreweryModal = function (breweryComment) {
            $scope.currentObject = $scope.currentBrewery;
            angular.copy(breweryComment, $scope.updateComment);
            $("#updateCommentModal").modal();

        }

        $scope.updateCurrentComment = function () {
            console.log($scope.updateComment);
            for (var i = 0; i < $scope.currentObject.comments.length; i++) {
                if ($scope.currentObject.comments[i].id == $scope.updateComment.id) {
                    var tempComment = {};
                    angular.copy($scope.updateComment, tempComment);
                    $scope.currentObject.comments.splice(i, 1, tempComment);
                    console.log(tempComment);
                };
            };

        }

        $scope.triggerWishModal = function () {
            $("#wishlistModal").modal()

        }

        $scope.triggerAddBreweryModal = function () {
            $scope.currentObject = $scope.currentBrewery;
            $("#addCommentModal").modal();

        }

        $scope.triggerAddBeerModal = function () {
            $scope.currentObject = $scope.currentBeer;
            $("#addCommentModal").modal();

        }

        $scope.deleteBreweryComment = function (breweryComment) {
            for (var i = 0; i < $scope.currentBrewery.comments.length; i++) {
                if (breweryComment.id == $scope.currentBrewery.comments[i].id) {
                    $scope.currentBrewery.comments.splice(i, 1);
                };
            };

        }

        $scope.deleteBeerComment = function (beerComment) {
            for (var i = 0; i < $scope.currentBeer.comments.length; i++) {
                if (beerComment.id == $scope.currentBeer.comments[i].id) {
                    $scope.currentBeer.comments.splice(i, 1);
                };
            };

        }

        $scope.triggerUpdateBeerModal = function (beerComment) {
            $scope.currentObject = $scope.currentBeer;
            angular.copy(beerComment, $scope.updateComment);
            $("#updateCommentModal").modal();

        }

        $scope.addBreweryToWishlist = function () {
            $scope.wishlistBreweries.push($scope.currentBrewery);
            $scope.wishlistNumber = ($scope.wishlistBreweries.length) + ($scope.wishlistBeers.length);

        }

        $scope.addBeerToWishlist = function () {
            $scope.wishlistBeers.push($scope.currentBeer);
            $scope.wishlistNumber = ($scope.wishlistBreweries.length) + ($scope.wishlistBeers.length);

        }

        $scope.deleteBeer = function (beer) {
            for (var i = 0; i < $scope.wishlistBeers.length; i++) {
                if (beer.id == $scope.wishlistBeers[i].id) {
                    $scope.wishlistBeers.splice(i, 1);
                    $scope.wishlistNumber = ($scope.wishlistBreweries.length) + ($scope.wishlistBeers.length);
                };
            };

        }

        $scope.deleteBrewery = function (brewery) {
            for (var i = 0; i < $scope.wishlistBreweries.length; i++) {
                if (brewery.id == $scope.wishlistBreweries[i].id) {
                    $scope.wishlistBreweries.splice(i, 1);
                    $scope.wishlistNumber = ($scope.wishlistBreweries.length) + ($scope.wishlistBeers.length);
                };
            };

        }
    });