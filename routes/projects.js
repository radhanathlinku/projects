var express = require('express');
var router = express.Router();
var Project =require("../models/projects");

//var data = require('../mydata.json');
// var MongoClient = require('mongodb').MongoClient;
// // Connection URL
// var url = 'mongodb://localhost:27017';
// var db;
// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   console.log("Connected successfully to MongoDB Server...");
//   db = client.db('portfolio1');
// });

// this function will go to the database and fetch the documents
// once it has got the data, it will make a call to the callback function
function getProjects(callback){
    var collection = db.collection('projects');
    collection.find({}).toArray(function(err, docs) {
        callback(null, docs);
    });
}

function getProjectByAlias(alias, callback){
    var collection = db.collection('projects');
    collection.find({'alias': alias}).toArray(function(err, docs) {
        callback(null, docs[0]);
    });
}
  router.get('/', function (req, res, next) {
    // define a callback function
    function listProjects(error, data){
        console.log(JSON.stringify(data))
        res.render('projects', { 
            title: 'Projects', 
            navProjects: true, 
            showFooter: true, 
            projects: data
        });
    };
   // getProjects(listProjects);
   Project.find({},listProjects)

});
  
router.get('/:projectAlias', function (req, res, next) {
    function getProject(error, project){  
        console.log(project);
        res.render('project-detail', { 
            title: project[0].name ,
            navProjects: true, 
            showFooter: true, 
            project:  project[0]
        });
    };
    //getProjectByAlias(req.params.projectAlias, getProject);
    Project.find({alias:req.params.projectAlias},getProject)

});
  
router.get('/:projectAlias/demo', function (req, res, next) {
   // var project = getProject(req.params.projectAlias);
   
   function getProject(error, project){  
    console.log(project);
    res.render('demos/'+ req.params.projectAlias, { 
        layout: 'layout-demo', 
        title: project[0].name ,
        project: project[0]
      });
    
};
Project.find({alias:req.params.projectAlias},getProject)
   
   
   
});

module.exports = router;