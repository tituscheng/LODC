var express = require('express');
var router = express.Router();
var DB = require('./DB.js');
var uuid = require('node-uuid');

var exports = module.exports = {};

//Supports youtube video link;

var collectionName = "address";

exports.addNewAddress = function (data, callback) {
    var aid = uuid.v1();
    var param = {
        addressID: aid,
        name: data.name,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        phone1: data.phone1,
        phone2: data.phone2
    }
    DB.insert(collectionName, param, function (theStatus) {
        if (theStatus) {
            callback({
                status: theStatus,
                addressid: aid,
                message: "Successfully added this address"
            });
        } else {
            callback({
                status: theStatus,
                addressid: 0,
                message: "Failed to add this page"
            });
        }
    })
}

exports.updateAddress = function (theAddressID, key, value, callback) {
    var param = {};
    if (key == 'en') {
        param["lang.en"] = value;
    } else if (key == "kr") {
        param["lang.kr"] = value;
    } else if (key == "order") {
        param["order"] = parseInt(value);
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

exports.getAllAddress = function (callback) {
    DB.retrieveAllDoc(collectionName, {}, {
        _id: false,
    }, function (data) {
        callback(data);
    });
}

exports.removeAddress = function (theAddressID, callback) {
    var param = {
        addressID: theAddressID
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
