var express = require('express');
var router = express.Router();
var assert = require('assert');
var DB = require("./DB.js");


var exports = module.exports = {};

exports.findTitle = function (theTitle, response) {

    MongoClient.connect(dbpath, function (err, db) {
        assert.equal(null, err);
        console.log("Searching for title " + theTitle);
        var collection = db.collection("sermonseries");
        var searchParam = {
            "title": theTitle
        };
        collection.find(searchParam).toArray(function (err, item) {
            assert.equal(null, err);
            if (item.length == 0) {
                response.send({
                    status: true,
                    message: "Series title is available"
                });
            } else {
                response.send({
                    status: false,
                    message: "Series title is not available"
                })
            }
            db.close();
        });

    });
};

//API call all sermon series titles
exports.getAll = function (response) {
    console.log("Retrieving all series titles");
    DB.retrieveAllDoc("sermonseries", {}, function (docs) {
        console.log("Result: " + docs);
        response.send(docs);
    });
};

exports.insertTitle = function (data, response) {
    MongoClient.connect(dbpath, function (err, db) {
        assert.equal(null, err);
        db.collection("sermonseries").insertOne({
            "title": data.title,
            "keywords": data.keywords,
            "imagePath": data.imagePath
        }, function (err, result) {
            assert.equal(err, null);
            console.log("Added a new series title to the series collection");
            response.send({
                status: true,
                message: "Added a new series"
            });
            db.close();
        });
    })
}

exports.updateTitle = function (data, response) {
    response({
        "status": false,
        "message": "Api is still in development"
    });
}
