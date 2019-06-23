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

app.get("/contact", function(req, res){
  res.render("contact")
});


//////////// route user select topics ////////////////
app.post("/topics", function(req, res){
  if (req.body.topics[0] === "family") {
    return res.redirect("family");
  } if (req.body.topics[0] === "pets") {
    return res.redirect("pets");
  } if (req.body.topics[0] === "careers") {
    return res.redirect("careers");
  } if (req.body.topics[0] === "movies/tv") {
    return res.redirect("moviesandtv");
  } if (req.body.topics[0] === "misc") {
    return res.redirect("morefacts");
  } else {
    return res.render("oops");
  }
});

///////// routes random topic //////////

app.post("/random", function(req, res){
  if (req.body.random === "Random") {
    ///////// fix random redirect //////
    res.render("oops");
    ///////////////////////////////////
  }
});


//////////// route for specific articles ////////////////
app.get("/articles/:postID", function(req, res){

const requestedPostId = req.params.postID;

  Article.findOne({_id: requestedPostId}, function(err, article){
    res.render("article", {
      title: article.title,
      content: article.content
    });
  });

});

///////////////submissions & corrections routes/////////////////////
////buttons from home page
app.post("/usersubmits", function(req, res) {
  if (req.body.usersubmits === "Submissions") {
    res.redirect("/submissions")
  } if (req.body.usersubmits === "Corrections") {
    res.redirect("/corrections")
  }
});
/////routes for page views
app.get("/submissions", function(req, res){
  res.render("submissions");
});

app.get("/corrections", function(req, res){
  res.render("corrections");
});

////routes for post method from page views
app.post("/corrections", function(req, res){

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
