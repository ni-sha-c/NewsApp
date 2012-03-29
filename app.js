
/**
 * Module dependencies.
 */

var express = require('express')
  , wona = require('./wona'),
  crypto = require('crypto');
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/:userid/post', function (req, res) {
  wona.controller.newPost(req.params.userid);
});

app.get('/:userid/:postid/edit', function(req, res) {
  wona.controller.editPost(req.params.userid, req.params.postid);
});

app.post('/login', function(req, res){
  console.log(req.body.user.name + "is trying to login!");
  var session = {
    username : String,
    password : String
    };
  session.username =req.body.user.name;
  session.password= controller.hash(req.body.user.password);
  exports.session = session;
  wona.controller.login(session);

});
app.post('/signup', function (req, res){
  console.log(req.body.user.name + "is signing up!");



  



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
