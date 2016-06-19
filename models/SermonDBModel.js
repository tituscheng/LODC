var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = require('mongoose').Types.ObjectID;

var modelName = "Sermon";

var SermonSchema = new Schema({
    title: {
        en: String,
        kr: String
    },
    speaker: [String],
    sermondate: Date,
    passage: [{
        book: String,
        chapter: Number,
        start: Number,
        end: Number
    }],
    media: {
        videos: [String],
        files: [String],
        ppt: [String]
    },
    description: {
        en: String,
        kr: String
    },
    images:{
    	thumbnail:""
    }
});


SermonSchema.statics.findByID = function(id, cb) {
	return this.model(modelName).findOne({"_id": new mongoose.mongo.ObjectID(id)}, cb);
}

SermonSchema.statics.findLatest = function(num, cb) {
	return this.model(modelName).find({}).sort({'sermondate': -1}).limit(num).exec(cb);
	
}

SermonSchema.statics.deleteByID = function(id, cb) {
	return this.model(modelName).remove({"_id": new mongoose.mongo.ObjectID(id)}, cb);
}

SermonSchema.statics.updateEnglishTitle = function(id, newTitle, cb) {
	return this.model(modelName).update({"_id": new mongoose.mongo.ObjectID(id)}, {"title.en": newTitle}, cb);
}

SermonSchema.statics.updateKoreanTitle = function(id, newTitle, cb) {
	return this.model(modelName).update({"_id": new mongoose.mongo.ObjectID(id)}, {"title.kr": newTitle}, cb);
}

module.exports = mongoose.model('Sermon', SermonSchema);
