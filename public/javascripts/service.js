angular.module('APIService', ['ngResource'])
    .constant('rootpath', 'http://localhost:3000/api')
    .factory("Pages", ['$resource', "rootpath", function ($resource, rootpath) {
        var data = $resource(rootpath + '/page/:method', {
            method: '@method'
        }, {});
        return data;
    }])
    .factory("Sermon", ['$resource', 'rootpath', function ($resource, rootpath) {
        var data = $resource(rootpath + '/sermon/:method', {
            method: '@method'
        }, {});
        return data;

}]);
