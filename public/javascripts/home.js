var churchApp = angular.module('churchApp', ['ngAnimate', 'ngRoute', 'APIService']);

churchApp.config(function ($routeProvider, $sceDelegateProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home/mainpage.html',
        })
        .when('/missions', {
            templateUrl: 'templates/home/mission.html',
        })
        .when('/introduction', {
            templateUrl: 'templates/home/introduction.html',
        })
        .when('/events', {
            templateUrl: 'templates/home/events.html',
        })
        .when('/sermons', {
            templateUrl: 'templates/home/sermons.html',
        })

    $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://www.youtube.com/**'
    ]);

    // The blacklist overrides the whitelist so the open redirect here is blocked.
    $sceDelegateProvider.resourceUrlBlacklist([
    ''
    ]);

});

churchApp.value("apiPath", "http://localhost:3000/api");

churchApp.service("API", function ($http) {
    this.call = function (apipath, param, success, fail) {
        //        alert("Calling api");
        $http({
            method: 'GET',
            url: apipath,
            data: param,
        }).then(function successCallBack(response) {
            success(response.data);
        }).then(function failCallBack(response) {
            fail(response);
            //       alert(JSON.stringify(response));
        });
    }
});

churchApp.service("Page", ['apiPath', 'API', function (apiPath, API) {
    this.getPages = function (callback) {
        var path = apiPath + '/page/getallpage';
        API.call(path, {}, function success(data) {
            callback(data);
        }, function fail() {

        });
    }
}])

churchApp.controller("SermonController", ["$scope", "Sermon", function ($scope, Sermon) {
    var mysermons = Sermon.query({
        method: "getall"
    }, function () {
        $scope.sermons = mysermons;
        alert(JSON.stringify(mysermons));
    })
}]);

churchApp.controller("NavController", function ($scope, Page) {
    Page.getPages(function (data) {
        $scope.navItems = data;
        //       alert(JSON.stringify(data));
    });

});

churchApp.controller("ScheduleController", function ($scope) {
    $scope.schedules = [{
        day: "Sunday",
        activities: [
            {
                name: "주일 예배",
                location: "",
                time: "1:30"
                },
            {
                name: "주일 성경 공부",
                location: "",
                time: ""
                },
            {
                name: "주일 장년부 ~ 새로운 삶",
                location: "",
                time: "3:00"
                },
            {
                name: "청년/Youth ~화평케 하는 자",
                location: "",
                time: "3:00"
                }
           ]
    }, {
        day: "Tuesday",
        activities: []
    }, {
        day: "Wednesday",
        activities: [
            {
                name: "Northwest University Bible Study",
                location: "",
                time: "7:30"
                }

           ]
    }, {
        day: "Thursday",
        activities: [
            {
                name: "UW Seattle Bible Study",
                location: "UW Seattle",
                time: "7:00"
                }
            ]
    }, {
        day: "Saturday",
        activites: [
            {
                name: "토요 새벽 기도회",
                location: "",
                time: "6:30"
                }
            ]
    }]
});


churchApp.controller("IntroController", function ($scope, $templateCache) {
    $scope.content = $templateCache.get('./temp/churchintro.html');
})

churchApp.directive('youtube', function ($sce) {
    return {
        restrict: 'EA',
        scope: {
            code: '='
        },
        replace: true,
        template: '<iframe id="ytplayer" type="text/html" width="200" height="200" src="{{url}}" frameborder="0" />',
        link: function (scope) {
            scope.$watch('code', function (newVal) {
                if (newVal) {
                    var youtubelink = newVal.replace("watch?v=", "embed/");
                    scope.url = $sce.trustAsResourceUrl(youtubelink);
                }
            });
        }
    };
});


churchApp.directive('footer', function () {
    return {
        templateUrl: './templates/home/footer.html',
    }
});
