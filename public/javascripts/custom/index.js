var mainApp = angular.module("mainApp", []);




mainApp.controller("LastestSermonController", function ($scope) {
    $scope.latestSermonHeader = "죄신 일요일 말씀";
    $scope.sermons = [
        {
            title: "하나님의 은혜",
            author: "Pastor Lee",
            date: "February 09, 2016",
            img: "img/sermons/pic%20(1).jpg"
        },
        {
            title: "하나님의 사랑",
            author: "Pastor Lee",
            date: "February 16, 2016",
            img: "img/sermons/pic%20(1).jpg"
},
        {
            title: "하나님의 자비",
            author: "Pastor Lee",
            date: "February 23, 2016",
            img: "img/sermons/pic%20(1).jpg"
        }
    ]

});

mainApp.controller("SermonListController", function ($scope) {
    var imgPath = "img/sermons/placeholder1.jpg";
    $scope.sermons = [
        {
            title: "하나님의 은혜",
            author: "Pastor Lee",
            date: "February 09, 2016",
            img: imgPath
        },
        {
            title: "하나님의 사랑",
            author: "Pastor Lee",
            date: "February 16, 2016",
            img: imgPath
},
        {
            title: "하나님의 자비",
            author: "Pastor Lee",
            date: "February 23, 2016",
            img: imgPath
        }
    ]
})

mainApp.controller("EventsController", function ($scope) {
    $scope.regularEvents = [
        {
            time: "11:00 am",
            location: "Bellevue",
            day: "Tues",
            description: "Bible study in Bellevue",
            img: "img/events/pic (6).jpg"
        }, {
            time: "7:30 pm",
            location: "Northwest University",
            day: "Wed",
            description: "Bible study in Northwest University",
            img: "img/events/pic (6).jpg"
        }, {
            time: "6:00 pm",
            location: "University of Washington",
            day: "Thurs",
            description: "Bible study in University of Washington",
            img: "img/events/pic (6).jpg"
        }
    ]
})

mainApp.directive("regularEvent", function () {
    return {
        templateUrl: './templates/home/regularevent-module.html',
        restrict: 'E',
        scope: {
            eventDay: "=day",
            eventTime: "=time",
            eventLocation: "=location",
            eventDescription: "=description",
            eventImage: "=img"
        }
    }
})

mainApp.controller("AboutChurchController", function ($scope) {
    $scope.churchInfo = [
        {
            title: "Mission Statement",
            descripton: "",
            img: "img/events/pic1.jpg",
            delay: '0.5s'
        },
        {
            title: "Service And Worship Times",
            description: "",
            img: "img/events/pic2.jpg",
            delay: '0.75s'
        },
        {
            title: "Upcoming Events",
            description: '',
            img: "img/events/event.jpg",
            delay: '0.1s'
        }
    ]
})

mainApp.directive("lodcLogo", function () {
    return {
        restrict: 'E',
        templateUrl: './templates/home/logo-module.html'
    }
});

mainApp.directive("socialLinks", function () {
    return {
        restrict: 'E',
        templateUrl: './templates/home/social-module.html'
    }
})

mainApp.directive("mainMenu", function () {
    return {
        restrict: "E",
        templateUrl: './templates/home/mainmenu-module.html'
    }
});

mainApp.directive("sermon", function () {
    return {
        restrict: 'E',
        templateUrl: './templates/home/sermon-module.html',
        scope: {
            sermonTitle: '=title',
            sermonAuthor: '=author',
            sermonDate: '=date',
            sermonImg: '=img',
        }
    }
})


mainApp.directive("churchInfo", function () {
    return {
        restrict: 'E',
        templateUrl: './templates/home/churchinfo-module.html',
        scope: {
            delay: "=delay",
            churchInfoImage: "=img",
            churchInfoTitle: "=title",
            churchInfoDescription: "=description",
        }
    }
})
