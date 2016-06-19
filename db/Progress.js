var express = require('express');
var router = express.Router();
var DB = require('./DB.js');

var exports = module.exports = {};

exports.addToQueue = function (theMediaID, callback) {

    DB.insert("progress", {
        pid: theMediaID,
        status: "Uploading",
        percentage: "",
    }, function (status) {
        callback(status);
    })
}
