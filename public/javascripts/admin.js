var adminApp = angular.module('adminApp', ['ngRoute', 'APIService']);

adminApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/admin/page.html',
        })
        .when('/address', {
            templateUrl: 'templates/admin/address.html',
        })
        .when('/sermon', {
            templateUrl: 'templates/admin/sermon.html',
        })
        .when('/sermonupload', {
            templateUrl: 'templates/admin/sermonuploadform.html',
        })
        .when('/sermonupdate', {
            templateUrl: 'templates/admin/updatesermonform.html',
        });

});

adminApp.controller("AdminController", function ($scope, $rootScope) {
    var languageOptions = ["en", "kr"];
    $scope.lang = languageOptions[0];
    $scope.menuLangText = "한국어";
    $scope.toggleLanguage = function () {
        if ($scope.menuLangText == "English") {
            $scope.menuLangText = "한국어";
            $scope.lang = languageOptions[0];

        } else {
            $scope.menuLangText = "English";
            $scope.lang = languageOptions[1];
        }
        $rootScope.$broadcast('langChangedEvent', {
            lang: $scope.lang
        })
    }
});


adminApp.controller('PageController', ["$scope", "Pages", function ($scope, Pages) {
    var mypages = Pages.query({
        method: "getallpage"
    }, function () {
        $scope.pages = mypages;
        alert(JSON.stringify(mypages));
    });

    $scope.selectPage = function (index) {
        alert(JSON.stringify($scope.pages));
        var selectedPage = $scope.pages[index];
        alert(selectedPage.pageName);
    }
}]);

adminApp.factory("Sermon", function () {
    var data = {};
    var sermon = {
        setSermon: function (theData) {
            data = theData;
        },
        getSermon: function () {
            return data;
        }
    }
    return sermon;
});

adminApp.controller("SermonController", function ($scope, $rootScope, $http, Sermon) {
    $scope.fields = {
        title: {
            en: "Title",
            kr: "제목"
        },
        speaker: {
            en: "Speaker",
            kr: "목사님"
        },
        passage: {
            en: "Passage",
            kr: "성경 구절"
        },
        date: {
            en: "Date",
            kr: "날짜"
        },
        link: {
            en: "Link",
            kr: "닝크"
        }
    }

    $scope.lang = "en";
    $scope.sermons = [];

    $scope.update = function (index) {
        Sermon.setSermon($scope.sermons[index]);
    }

    $http({
        url: "api/sermon/get",
        method: "GET",
    }).then(function successCB(response) {
        if (response.data.status) {
            $scope.sermons = response.data.result;
        } else {
            alert(response.data.message);
        }
    }, function failCB(response) {
        alert(JSON.stringify(response));
    });

    $rootScope.$on('langChangedEvent', function (event, data) {
        $scope.lang = data["lang"];
    });


});

adminApp.controller("SermonUpdateController", ['$scope', '$http', 'Sermon', '$rootScope', function ($scope, $http, Sermon, $rootScope) {

    var languageOptions = ["en", "kr"];
    $scope.lang = languageOptions[0];

    $scope.fields = {
        title: {
            en: "Title",
            kr: "제목"
        },
        speaker: {
            en: "Speaker",
            kr: "목사님"
        },
        passage: {
            en: "Passage",
            kr: "성경 구절"
        },
        description: {
            en: "Description",
            kr: "내용"
        },
        date: {
            en: "Date",
            kr: "날짜"
        },
        link: {
            en: "Link",
            kr: "닝크"
        },
        dateButtonText: {
            en: "Today",
            kr: "오늘"
        }
    }

    var mySermon = Sermon.getSermon();
    alert(JSON.stringify(mySermon));
    $scope.sermonformdata = {
        viewCount: mySermon.viewCount,
        speaker: {
            en: mySermon.speaker.en,
            kr: mySermon.speaker.kr
        },
        url: {
            local: mySermon.url.local,
            remote: mySermon.url.remote
        },
        languages: {
            en: mySermon.languages.en,
            kr: mySermon.languages.kr
        },
        description: {
            en: mySermon.description.en,
            kr: mySermon.description.kr
        },
        //        documents: {
        //            ppt: mySermon.documents.ppt
        //        },
        date: {
            sermonDate: mySermon.date.sermonDate,
            lastUpdateDate: mySermon.date.lastUpdateDate
        },
        title: {
            en: mySermon.title.en,
            kr: mySermon.title.kr
        },
        passages: {
            en: mySermon.passages.en,
            kr: mySermon.passages.kr
        }
    };

    $scope.getDate = function () {
        $scope.sermonformdata.date.sermonDate = new Date().toISOString()
    }

    $scope.delete = function () {
        var id = mySermon["_id"];
        $http({
            method: "DELETE",
            url: "api/sermon/delete/" + id,
        }).then(function successCB(response) {
            alert(response.data.message);
        }, function errorCB(response) {
            alert(response.data.message);
        });
    }

    $scope.updateSermon = function () {
        $http({
            method: "POST",
            url: 'api/sermon/update/' + mySermon["_id"],
            data: $scope.sermonformdata
        }).then(function successCB(response) {
            alert(response.data.message);
        }, function failCB(response) {
            alert(response.data.message);
        });
    }

    $rootScope.$on('langChangedEvent', function (event, data) {
        $scope.lang = data["lang"];
    });


}]);

adminApp.controller('SermonUploadFormController', ['$scope', '$http', function ($scope, $http) {
    var languageOptions = ["en", "kr"];
    $scope.lang = languageOptions[0];

    $scope.fields = {
        title: {
            en: "Title",
            kr: "제목"
        },
        speaker: {
            en: "Speaker",
            kr: "목사님"
        },
        passage: {
            en: "Passage",
            kr: "성경 구절"
        },
        description: {
            en: "Description",
            kr: "내용"
        },
        date: {
            en: "Date",
            kr: "날짜"
        },
        link: {
            en: "Link",
            kr: "닝크"
        },
        dateButtonText: {
            en: "Today",
            kr: "오늘"
        }
    }

    function parsePassage(passages) {
        var verses = passages.split(",");
        var parsedPassages = [];

        for (var i = 0; i < verses.length; i++) {
            var passage = {
                book: "",
                chapter: 0,
                start: 0,
                end: 0
            };
            var verse = verses[i].trim(); // 1 Peter 3:13-23
            var sVerse = verse.split(":");
            var end = sVerse[1];
            if (end.search("-") == -1) {
                passage.start = parseInt(end);
                passage.end = parseInt(end);
            } else {
                var sEnd = end.split("-");
                passage.start = parseInt(sEnd[0]);
                passage.end = parseInt(sEnd[1]);
            }
            var firstPart = sVerse[0].split(" ");
            passage.chapter = parseInt(firstPart[firstPart.length - 1]);
            if (firstPart.length == 3) {
                passage.book = firstPart[0] + " " + firstPart[1];
            } else {
                passage.book = firstPart[0];
            }
            parsedPassages.push(passage);
        }
        alert(JSON.stringify(parsedPassages));
        return parsedPassages;
    }


    $scope.sermondata = {
        viewCount: 0,
        speaker: {
            en: "Pastor Lee",
            kr: "이동철"
        },
        url: {
            local: "",
            remote: "",
        },
        languages: {
            en: false,
            kr: true
        },
        description: {
            en: "Digging deep into God's Great love",
            kr: "하나님의 말씀을 깊게 읽기"
        },
        documents: {
            ppt: ""
        },
        date: {
            sermonDate: "",
            lastUpdateDate: Date.now()
        },
        title: {
            en: "God's Great Love",
            kr: "하나님의 사랑"
        },
        passages: {
            en: "1 John 3:16",
            kr: "요한 전서 3:16"
        }
    };

    $scope.getDate = function () {
        $scope.sermondata.date.sermonDate = new Date().toISOString()
    }

    $scope.uploadSermon = function () {
        var data = null;
        $http({
            method: 'POST',
            url: 'api/sermon/add',
            data: $scope.sermondata
        }).then(function successCB(response) {
            data = response.data;
            alert(data.message);
        }, function errorCB(response) {
            data = response.data;
            alert(data.message);
        });
    }
}]);


adminApp.controller('NavController', function ($scope) {
    $scope.navitems = [
        {
            name: "Pages",
            link: "#/",
        },
        {
            name: "Sermons",
            link: "#/sermon",
        },
        {
            name: "Address",
            link: "#/address"
        },
        {
            name: "Settings",
            link: "",
        }
    ]
});


adminApp.directive("topnavbar", function () {
    return {
        templateUrl: "./templates/admin/topnav.html"
    }
});
