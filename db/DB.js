var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dbpath = 'mongodb://localhost:27017/looc';

var exports = module.exports = {};


exports.retrieveAllDoc = function (collection, searchParam, projection, callback) {

    console.log("Searching for data in collection " + collection);
    MongoClient.connect(dbpath, function (err, db) {
        assert.equal(null, err);
        db.collection(collection).find(searchParam, projection).toArray(function (err, docs) {
            assert.equal(null, err);
            callback(docs);
            db.close();
        });
    });
}

exports.remove = function (collection, param, callback) {
    console.log("Removing document " + collection);
    MongoClient.connect(dbpath, function (err, db) {
        assert.equal(null, err);
        var result = db.collection(collection).remove(param);
        if (result.nRemoved == 1) {
            callback(true);
            db.close();
        } else {
            callback(false);
            db.close();
        }

    })
}

exports.update = function (collection, query, param, callback) {
    console.log("Updating document " + collection);
    MongoClient.connect(dbpath, function (err, db) {
        assert.equal(null, err);
        db.collection(collection).update(query, {
            $set: param
        }, function (err, result) {
            assert.equal(null, err);
            console.log(JSON.stringify(result));
            if (result.ok) {
                callback(true);
            } else {
                callback(false);
            }
        })
    })

}

exports.insert = function (collection, param, callback) {
    console.log("Inserting a new document into collection " + collection);
    MongoClient.connect(dbpath, function (err, db) {
        assert.equal(null, err);
        db.collection(collection).insertOne(param, function (err, result) {
            assert.equal(null, err);
            console.log("Inserted a new document into collection " + collection);
            callback(true);
            db.close();
        })
    })
}

exports.checkDuplicate = function (collection, searchParam, callback) {
    assert.equal(null, err);
    console.log("Checking for duplication in collection " + collection);
    MongoClient.connect(dbpath, function (err, db) {
        assert(null, err);
        db.collection(collection).find(searchParam).toArray(function (err, item) {
            assert(null, err);
            if (docs.length == 0) {
                callback(true);
            } else {
                callback(false);
            }
            db.close();
        });
    })
}
