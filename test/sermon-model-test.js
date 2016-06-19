/**
 * 
 */

var mongoose = require('mongoose');
var should = require('should');
var ObjectId = require('mongoose').Types.ObjectId; 
//var prepare = require('./prepare');

mongoose.connect('mongodb://localhost/lodc-test');

var Sermon = require('../models/SermonDBModel.js');
var SermonTestData = require('../test/sermon-test-data.js');

describe('Sermon: models', function() {
	describe('#create()', function() {
		before("Creating a sermon", function(done){
			Sermon.remove({}, function(err){
				should.not.exist(err);
				done();
			});
		})
		
		after("Wrap up for testing creation", function(done){
			Sermon.remove({}, function(err){
				should.not.exist(err);
				done();
			})
		})
		
		it('Should create a new Sermon', function(done) {	
			Sermon.create(SermonTestData.singlemodel, function(err, createdModel){
				//Check that no error occurred
				should.not.exist(err);
				
				//Assert that the returned contact is as expect
				createdModel.title.en.should.equal('Maturity');
				createdModel.title.kr.should.equal('성숙');
				createdModel.speaker[0].should.equal('Pastor Lee');
				createdModel.sermondate.should.equal(SermonTestData.singlemodel.sermondate);
				createdModel.passage[0].book.should.equal("Joshua");
				createdModel.passage[0].chapter.should.equal(6);
				createdModel.passage[0].start.should.equal(22);
				createdModel.passage[0].end.should.equal(25);
				createdModel.media.videos.should.be.instanceof(Array).and.have.lengthOf(0);
				createdModel.media.files.should.be.instanceof(Array).and.have.lengthOf(0);
				createdModel.media.ppt.should.be.instanceof(Array).and.have.lengthOf(0);
				createdModel.description.en.should.equal("How to become more mature in the face of God");
				createdModel.description.kr.should.equal("하나님이 앞에 어떻게 성숙으로 되습니까?");
				done();
			})
			
		})
		
		it("Should have one sermon", function(done){
			Sermon.find({}, function(err, sermons){
				sermons.length.should.equal(1);
				done();
			});
		});
	})
	
	describe("#find()", function(){
		before("Create a sermon", function(done){
			Sermon.remove({}, function(err){
				should.not.exist(err);
				Sermon.create(SermonTestData.singlemodel, function(err, sermonmodel){
					should.not.exist(err);
					done();
				})
			});
		});
		
		after("Wrap up the find function", function(done){
			Sermon.remove({}, function(err){
				should.not.exist(err);
				done();
			});
		});
		
		it("Should first create a new sermon", function(done){
			Sermon.create(SermonTestData.singlemodel, function(err, createdModel){
				should.not.exist(err);
				createdModel.title.en.should.equal("Maturity");
				done();
			});
		});
		
		it("Should then find a sermon", function(done){
			Sermon.findOne({'title.en':"Maturity"}, function(err, sermon){
				should.not.exist(err);
				should(sermon).not.eql(null);
				sermon.title.en.should.equal("Maturity");
				done();
			});
		});
	})
	
	describe("#findByID()", function(){
		before("Create a test record", function(done){
			Sermon.remove({}, function(err){
				should.not.exist(err);
				Sermon.create(SermonTestData.singlemodel, function(err, sermon){
					should.not.exist(err);
					should(sermon).not.eql(null);
					done();
				});
			});
		});
		
		after("Wrap up findByID()", function(done){
			Sermon.remove({}, function(err){
				should.not.exist(err);
				done();
			});
		});
		

		it("Should retrieve record by title", function(done){
			Sermon.findOne({"title.en":"Maturity"}, function(err, sermon){
				should.not.exists(err);
				should(sermon._id).not.eql(null);
				Sermon.findByID(sermon._id, function(err, mysermon){
					should.not.exists(err);
					should.exists(mysermon);
					mysermon.title.en.should.equal("Maturity");
					done();
				})
			})
		});
	});
	
	describe("#findLatest()", function(){
		before("Clear database", function(done){
			Sermon.remove([], function(err){
				should.not.exist(err);
				done();
			});
		});
		
		after("Wrap up findLatest()", function(done){
			Sermon.remove([], function(err){
				should.not.exist(err);
				done();
			});
		});
		
		it("Should create multiple records", function(done){
			Sermon.create(SermonTestData.multiplemodel, function(err, sermons){
				should.not.exist(err);
				sermons.length.should.equal(SermonTestData.multiplemodel.length);
				done();
			});
		});
		
		it("Should return the latest 2 sermons", function(done){
			Sermon.findLatest(2, function(err, sermons){
				should.not.exist(err);
				sermons.length.should.equal(2);
				should(sermons[0].title.en).equal("Do not murder");
				should(sermons[1].title.en).equal("The Sermon on the Mount");
				done();
			});
		});
	});
	
	describe("#deleteByID()", function(){
		before("Insert one record", function(done){
			Sermon.remove([], function(err){
				should.not.exist(err);
				Sermon.create(SermonTestData.singlemodel, function(err, sermon){
					should.not.exist(err);
					sermon.should.not.eql(null);
					done();
				});
			})
		})
		
		after("Remove all record", function(done){
			Sermon.remove([], function(err){
				done();
			})
		})
		
		it("Should delete an element by id", function(done){
			Sermon.find({}, function(err, sermon){
				should.not.exist(err);
				var id = sermon[0]["_id"];
				Sermon.deleteByID(id, function(err){
					should.not.exist(err);
					Sermon.findByID(id, function(err, result){
						should.not.exist(err);
						should.not.exist(result);
						done();
					})
				})
			});
		});
	});
	
	describe("#updateTitle", function(){
		before("Insert one record", function(done){
			Sermon.remove([], function(err){
				should.not.exist(err);
				Sermon.create(SermonTestData.singlemodel, function(err, sermon){
					should.not.exist(err);
					sermon.should.not.eql(null);
					done();
				});
			})
		})
		
		after("Remove all record", function(done){
			Sermon.remove([], function(err){
				done();
			})
		})
		it("Should update a title", function(done){
			Sermon.find({}, function(err, sermon){
				should.not.exist(err);
				should(sermon).not.eql(null);
				var id = sermon[0]['_id'];
				var oldTitle = sermon[0]['title'].en;
				var newTitle = "A change in title";
				Sermon.updateTitle(id, newTitle, function(err, result){
					should.not.exist(err);
					should(result.ok).equal(1);
					should(result.nModified).equal(1);
					should(result.n).equal(1);
					Sermon.findOne({"title.en":newTitle}, function(err, result){
						should.not.exist(err);
						should(result.title['en']).equal(newTitle);
						done();
					})
				})
			})
		})
	})

})