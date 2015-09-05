'use strict';

var express = require('express'),
        posts = require('./mocks/posts.json'),
        app = express();


// make the mocked data an array to iterate over
var postList = Object.keys(posts).map(function (value) {
  return posts[value];
});

/**
* Set static path for publicly accessible files.
* Prepend with static to access via url
*/
app.use('/static', express.static(__dirname + '/public'));

/**
* Set our template engine and correct path
*/
app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function (req, res) {
  var path = req.path;
  res.render('index', {path: path});
});

app.get('/blog/:title?', function (req, res) {
  var title = req.params.title;
  if (title === undefined) {
    res.render('blog', {posts: postList});
  } else {
    var post = posts[title] || {};
    res.render('post', {post: post});
  }
});

/**
* A basic api endpoint. We also accept 
* a query parameter here
*
* e.g. localhost:3000/blog?raw=true will 
* return the unmodified json object
*/
app.get('/posts', function (req, res) {
  if(req.query.raw) {
    res.json(posts);
  } else {
    res.json(postList);
  }
});

app.listen(3000, function() {
  console.log('Party on port 3000');
});

