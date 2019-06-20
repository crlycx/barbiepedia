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

app.get("/pets", function(req, res){
  Article.find({topic: "Pets"}, function(err, foundPet){
    if (!err) {
      res.render("pets", {pets:foundPet});
    } else {
      console.log(err);
    }
  });
});

app.get("/careers", function(req, res){
  Article.find({topic: "Careers"}, function(err, foundCareer){
    if (!err) {
      res.render("careers", {careers:foundCareer});
    } else {
      console.log(err);
    }
  });
});

app.get("/moviesandtv", function(req, res){
  Article.find({topic: "Movies/TV"}, function(err, foundMoviesTV){
    if (!err) {
      res.render("moviesandtv", {moviesTV:foundMoviesTV});
    } else {
      console.log(err);
    }
  });
});

app.get("/morefacts", function(req, res){
  Article.find({topic: "Miscellaneous"}, function(err, foundMisc){
    if (!err) {
      res.render("miscellaneous", {miscFacts:foundMisc});
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
