var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    name: {type: String},
    alias: {type:String}, 
    image: {type: String},
    description: {type: String},
    githubUrl: {type: String},
    tags: [{name: String, class: String}],
    imageSliders: [{type: String}],
    relatedProjects: [{name: String, link: String}],
    createAt: {type: Date},
    updatedAt: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);