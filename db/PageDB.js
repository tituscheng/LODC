var express = require('express');
var router = express.Router();
var DB = require('./DB.js');
var uuid = require('node-uuid');

var exports = module.exports = {};

//Supports youtube video link;

var collectionName = "page";

exports.addNewPage = function (thePageName, enVersion, krVersion, urlLink, callback) {
    var pid = uuid.v1();
    var param = {
        pageID: pid,
        pageName: thePageName,
        lang: {
            en: enVersion,
            kr: krVersion
        },
        link: urlLink
    }
    DB.insert(collectionName, param, function (theStatus) {
        if (theStatus) {
            callback({
                status: theStatus,
                pageid: pid,
                message: "Successfully added this page"
            });
        } else {
            callback({
                status: theStatus,
                pageid: 0,
                message: "Failed to add this page"
            });
        }
    })
}

exports.updatePage = function (thePageID, key, value, callback) {
    var param = {};
    if (key == 'en') {
        param["lang.en"] = value;
    } else if (key == "kr") {
        param["lang.kr"] = value;
    } else if (key == "order") {
        param["order"] = parseInt(value);
    } else if (key == "link") {
        param["link"] = value;
    }
    console.log(JSON.stringify(param));
    DB.update(collectionName, {
        pageID: thePageID
    }, param, function result(status) {
        if (status) {
            callback({
                "status": status,
                "message": "Successfully updated"
            })
        } else {
            callback({
                "status": status,
                "message": "Failed to update"
            })
        }
    })
}

exports.getAllPage = function (callback) {
    DB.retrieveAllDoc(collectionName, {}, {
        _id: false,
    }, function (data) {
        callback(data);
    });
}

exports.removePage = function (thePageID, callback) {
    var param = {
        pageID: thePageID
    };
    DB.remove(collectionName, param, function (theStatus) {
        if (theStatus) {
            callback({
                status: theStatus,
                message: "Successfully removed document"
            })
        } else {
            callback({
                status: theStatus,
                message: "Failed to remove document"
            })
        }
    });
}
