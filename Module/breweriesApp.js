var app = angular.module("irvineBeer", [])

app.service("userInfo", function ($http) {
    var _userId = "";
    this.getUserId = function (callback) {
        
        $http.get("http://localhost:8080/data/Breweries.json")
            .then(function (response) {
                _userId = response.data.userId;
                console.log(_userId);
                callback(_userId);
            });
            }
});

app.filter("filterByZip", function () {
    return function (items, searchString) {
        var tempArray = [];

        if (searchString == "" || searchString == undefined) {
            return items;
        }

        for (var i = 0; i < items.length; i++) {
            if (items[i].zip.indexOf(searchString) != -1) {
                tempArray.push(items[i]);
            }
        }
        return tempArray;
    }


});