/**
 * 
 */

var sermonModel = {
	"title" : {
		"en" : "Maturity",
		"kr" : "성숙"
	},
	"speaker" : [ "Pastor Lee" ],
	"sermondate" : new Date(2011, 10, 2),
	"passage" : [ {
		"book" : "Joshua",
		"chapter" : 6,
		"start" : 22,
		"end" : 25
	} ],
	"media" : {
		videos : [],
		files : [],
		ppt : [],
	},
	"description" : {
		"en" : "How to become more mature in the face of God",
		"kr" : "하나님이 앞에 어떻게 성숙으로 되습니까?"
	}

};

module.exports.multiplemodel = [ {
	"title" : {
		"en": "Leading by the Holy Spirit",
		"kr": "성령으로 인도함"
	},
	"speaker": ["Pastor Lee"],
	"sermondate": new Date(2011,10,7),
	"passage": [{
		"book":"Galatians",
		"chapter":3,
		"start":3,
		"end":9
	}],
	"media": {
		videos:[],
		files:[],
		ppt:[],
	},
	"description":{
		"en": "The secret to being led by the Holy Spirit in our lifes",
		"kr": "우리 성령 인도 하신 비밀"
	}
}, {
	"title" : {
		"en": "Being a loving open door church christian",
		"kr": "우리 열린문 교회 된 기독"
	},
	"speaker": ["Pastor Lee"],
	"sermondate": new Date(2011,10,1),
	"passage": [{
		"book":"Proverbs",
		"chapter":5,
		"start":6,
		"end":11
	}],
	"media": {
		videos:[],
		files:[],
		ppt:[],
	},
	"description":{
		"en": "How to use our life for our God and for our church",
		"kr": "우리 어떻게 하나님과 교회 위한 생환 사용 할까?"
	}
}, {
	"title" : {
		"en": "The Sermon on the Mount",
		"kr": "산의 말"
	},
	"speaker": ["Pastor Lee"],
	"sermondate": new Date(2011,10,14),
	"passage": [{
		"book":"Proverbs",
		"chapter":5,
		"start":6,
		"end":11
	}],
	"media": {
		videos:[],
		files:[],
		ppt:[],
	},
	"description":{
		"en": "Look at what Jesus desire us to become",
		"kr": "우리 하나님이 어떤 사람이 원하기 볼까?"
	}
}, {
	"title" : {
		"en": "Do not murder",
		"kr": "살인 하지마라"
	},
	"speaker": ["Pastor Lee"],
	"sermondate": new Date(2011,10,21),
	"passage": [{
		"book":"Exodus",
		"chapter":20,
		"start":13,
		"end":13
	}],
	"media": {
		videos:[],
		files:[],
		ppt:[],
	},
	"description":{
		"en": "Jesus say to us not to murder",
		"kr": "에수는 우리에게 사인 하지마라고 말했다"
	}
}];

module.exports.singlemodel = sermonModel;
