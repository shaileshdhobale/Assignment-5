var fs = require('fs');
var express = require('express');
var app = express();
var async = require('async');
var id;
var rec;
var details = "";
var email = "";
// it will display all records of the student
app.get("/",function (req, res) {
	fs.readFile('student.json', 'utf8', function (err,data){
		if(err) {
			return err;
		} else {
			res.end(data);	
		}
	});
});

// if user specify the email id of student then it will display all subject's marks in which he took part
app.get("/:email", function (req,res){
	/*
	read student.json file
	PARAM : filename
			file format
			callback function
	*/
	fs.readFile('student.json', 'utf8', function (err,data){
		if (err) {
			return err;
		} else {
			rec = JSON.parse(data);
			console.log(rec);
			console.log(req.params.email);
			//
			for (var i=0; i<rec.students.length; i++) {
				if(req.params.email == rec.students[i].email){
					id=rec.students[i].id;
					console.log(id);
					email = req.params.email;
					// callback();
				}
			}
		}
	});

	// series call
	// async.series([
	// 	function(callback) {
	// 		fs.readFile('sub_1.json', 'utf8', function(err,data){
	// 			var sub1 = JSON.parse(data);
	// 			for (var i=0; i< sub1.enrolledStudents.length; i++) {
	// 				if(id == sub1.enrolledStudents[i].id) {
	// 					details += "Series : "+sub1.subjectName+"\r\n";
	// 					callback();
	// 				}
	// 			}
	// 		});
	// 	},
	// 	function(callback) {
	// 		fs.readFile('sub_2.json', 'utf8', function(err,data){
	// 			var sub1 = JSON.parse(data);
	// 			for (var i=0; i< sub1.enrolledStudents.length; i++) {
	// 				if(id == sub1.enrolledStudents[i].id) {
	// 					details += "Series : "+sub1.subjectName+"\r\n";
	// 					callback();
	// 				}
	// 			}
	// 		});
	// 	},
	// 	function(callback) {
	// 		fs.readFile('sub_3.json', 'utf8', function(err,data){
	// 			var sub1 = JSON.parse(data);
	// 			for (var i=0; i< sub1.enrolledStudents.length; i++) {
	// 				if(id == sub1.enrolledStudents[i].id) {
	// 					details += "Series : "+sub1.subjectName+"\r\n";
	// 					callback();
	// 				}
	// 			}
	// 		});
	// 	}
	// ], function (err) {
	// 	if (err) {
	// 		return callback(err);
	// 	}else {
	// 		if(details != "") {
	// 			console.log("Series\r\nDetails : \r\n"+details);	
	// 			res.end("Series\r\nId : "+ id+"\r\nEmail : "+email+"\r\nDetails : \r\n " + details);
	// 			details = "";
	// 		}
	// 	}
	// });


	// Parallel call
	async.parallel([
		function(callback) {
			fs.readFile('sub_1.json', 'utf8', function(err,data){
				var sub1 = JSON.parse(data);
				for (var i=0; i< sub1.enrolledStudents.length; i++) {
					if(id == sub1.enrolledStudents[i].id) {
						details += "parallel : "+sub1.subjectName+"\r\n";
						callback();
					}
				}
			});
		},
		function(callback) {
			fs.readFile('sub_2.json', 'utf8', function(err,data){
				var sub1 = JSON.parse(data);
				for (var i=0; i< sub1.enrolledStudents.length; i++) {
					if(id == sub1.enrolledStudents[i].id) {
						details += "parallel : "+sub1.subjectName+"\r\n";
						callback();
					}
				}
			});
		},
		function(callback) {
			fs.readFile('sub_3.json', 'utf8', function(err,data){
				var sub1 = JSON.parse(data);
				for (var i=0; i< sub1.enrolledStudents.length; i++) {
					if(id == sub1.enrolledStudents[i].id) {
						details += "parallel : "+sub1.subjectName+"\r\n";
						callback();
					}
				}
			});
		}
	], function (err) {
		if (err) {
			return callback(err);
		}else {
			if(details != "") {
				console.log("Parallel \r\nDetails : \r\n"+details);	
				res.end("Parallel\r\nId : "+ id+"\r\nEmail : "+email+"\r\nDetails : \r\n " + details);
				details = "";
			}
		}
	});
});

// specify the port and localhost
var server = app.listen(8080, function () {
	var host = "127.0.0.1";
	var port = "8080";
	console.log("Example app listening at http://%s:%s", host, port)
});