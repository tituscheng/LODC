var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var SermonSeries = require('../db/SermonSeries.js');
var Sermon = require('../db/SermonModel.js');
var PageDB = require('../db/PageDB.js');
var AddressDB = require('../db/AddressDB.js');
var dir = require('node-dir');
var mongoose = require('mongoose');

var dbpath = 'mongodb://localhost:27017/looc';


mongoose.connect(dbpath);

/* GET home page. */


//Page API
router.post("/page/addnewpage", function (req, res) {
    console.log("Called API /page/addnewpage");
    console.log(req.body);
    PageDB.addNewPage(req.body.name, req.body.enversion, req.body.krversion, req.body.link, function (data) {
        res.send(data);
    });
});

router.get("/page/getallpage", function (req, res) {
    console.log("Called API /page/getallpage");
    console.log("parameters: " + JSON.stringify(req.body));
    PageDB.getAllPage(function (data) {
        res.send(data);
    });
})

router.post("/page/removepage", function (req, res) {
    console.log("Called API /page/removepage");
    console.log("Parameters " + JSON.stringify(req.body));
    PageDB.removePage(req.body.pageid, function (data) {
        res.send(data)
    })
})

router.post("/page/updatepage", function (req, res) {
    console.log("Called API /page/updatepage");
    console.log("Parameters " + JSON.stringify(req.body));
    PageDB.updatePage(req.body.pageid, req.body.pagekey, req.body.pagevalue, function (data) {
        res.send(data);
    })
})

router.post("/address/addnew", function (req, res) {
    console.log("Called API /address/addnew");
    console.log("Parameters " + JSON.stringify(req.body));
    AddressDB.addNewAddress(req.body, function (data) {
        res.send(data);
    })
})

router.get("/address/getall", function (req, res) {
    console.log("Called API /address/getall");
    console.log("Parameters " + JSON.stringify(req.body));
    AddressDB.getAllAddress(function (data) {
        res.send(data);
    })
})


function isValid(field) {
    if (typeof field == 'undefined' || field == "") {
        return false;
    } else {
        return true;
    }
}

function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
        return url.match(p)[1];
    }
    return false;
}

function visited(endpoint) {
    console.log("End point visited: " + endpoint);
}

function print(data) {
    console.log(JSON.stringify(data));
}

//-----------------------Start Sermon API-----------------------------


router.get('/sermon/get', function (req, res) {
    visited("/sermon/get");
    Sermon.find({}, function (err, sermons) {
        if (err) {
            console.log(err);
            res.send({
                status: false,
                message: err
            });
        } else {
            console.log("Sermon retreived: " + sermons);
            console.log("length: " + sermons.length);
            res.send({
                status: true,
                message: "Successfully returned all sermons",
                result: sermons
            });
        }
    });
});

router.post('/sermon/update/:id', function (req, res) {
    var id = req.params.id;
    visited("/sermon/update/" + id);
    var data = req.body;
    var conditions = {
        "_id": mongoose.Types.ObjectId(id)
    };
    var update = {
        $set: data
    }
    console.log("Variables ready");
    Sermon.update(conditions, update, {}, function (err, data) {
        if (err) {
            console.log(err);
            res.send({
                status: true,
                message: err
            })
        } else {
            console.log(data);
            res.send({
                status: true,
                message: "Succesfully updated"
            });
        }
    })

});

router.delete('/sermon/delete/:id', function (req, res) {
    var id = req.params.id;
    visited("/sermon/delete/" + id);
    var condition = {
        "_id": id
    }
    Sermon.findOneAndRemove(condition, function (err, doc, result) {
        if (err) {
            res.send({
                status: false,
                message: err
            });
        } else {
            res.send({
                status: true,
                message: "Successfully deleted sermon"
            });
        }
    })
})

router.post('/sermon/add', function (req, res) {
    visited("/sermon/add");
    var jsonData = req.body;
    print(jsonData);
    var newSermon = new Sermon(jsonData);
    newSermon.save(function (err) {
        if (err) {
            return console.dir(err);
        } else {
            res.send({
                status: true,
                message: "Sermon is saved"
            })
        }
    });
})



//-----------------------End Sermon API--------------------------------
router.post('/', function (req, res, next) {
    res.send({
        status: true,
        message: "Getting response"
    });
});

module.exports = router;
