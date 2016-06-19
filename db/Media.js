var express = require('express');
var router = express.Router();
var DB = require('./DB.js');
var uuid = require('node-uuid');

var exports = module.exports = {};

//Supports youtube video link;
exports.extractSource = function (url) {
    var videoID = url.replace("https://www.youtube.com/watch?v=", "");
    var sourceURL = url.replace("watch?v=" + videoID, "");
    var video_meta = {
        vid: videoID,
        source: sourceURL
    }
    return video_meta;
}

exports.addURLVideo = function (data, callback) {
    var uid = uuid.v1();
    console.log("video meta:" + data);
    var param = {
        mediaID: uid,
        source: data.source,
        videoID: data.vid,
        type: "url"
    }
    DB.insert("media", param, function (theStatus) {
        callback(uid);
    });
}
