var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SermonSchema = Schema({
    title: {
        en: String,
        kr: String
    },
    speaker: {
        kr: String,
        en: String,
    },
    url: {
        local: String,
        remote: String
    },
    languages: {
        en: Boolean,
        kr: Boolean
    },
    date: {
        sermonDate: Date,
        lastUpdateDate: Date,
    },
    description: {
        en: String,
        kr: String,
    },
    viewCount: Number,
    documents: {
        ppt: String
    },
    passages: {
        en: String,
        kr: String
    }
});

module.exports = mongoose.model("Sermon", SermonSchema);
