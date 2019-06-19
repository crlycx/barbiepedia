//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/barbieDB", {useNewUrlParser:true});

const articleSchema = {
  topic: String,
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

// ------------routes------------

app.get("/", function(req, res){
  res.render("home");
});

app.get("/family", function(req, res){
  Article.find({topic: "Family"}, function(err, foundFamily){
    if (!err) {
      res.render("family", {familyMember:foundFamily});
    } else {
      console.log(err);
    }
  });
});

app.get("/articles/:postID", function(req, res){

const requestedPostId = req.params.postID;

  Article.findOne({_id: requestedPostId}, function(err, article){
    res.render("article", {
      title: article.title,
      content: article.content
    });
  });

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
