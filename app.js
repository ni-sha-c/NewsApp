/**
 * Module dependencies.
 */

var express = require('express')
  , wona = require('./wona'),
  crypto = require('crypto'),
  controller = require('./wona/controller.js');
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set("view options", {layout: false});

    // make a custom html template
  app.register('.html', {
          compile: function(str, options){
                           return function(locals){
                                     return str;
                                           };
                               }
                     });
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

/*hash: function hash(text){
    return crypto.createHash('sha1').update(crypto.createHash('md5').update(text).digest('hex')).digest('hex');
      }
*/
// Routes

app.get('/', function (req, res)
    {
            res.render("index.html",{layout: false});
    }

      );
/*
app.get('/:userid/post', function (req, res) {
  wona.controller.newPost(req.params.userid);
});

app.get('/:userid/:postid/edit', function(req, res) {
  wona.controller.editPost(req.params.userid, req.params.postid);
});*/

app.post('/login', function(req, res){
  console.log(req.body.username + "is trying to login!");
  var session = {
    username : String,
    password : String
    };
  session.username =req.body.username;
  session.password= controller.hash(req.body.pass);
  exports.session = session;
  var callback = function ( data) {
    var result= JSON.stringify(data);
    var json = JSON.parse(result);
    if(json==null||json[0]==null||json[0]==undefined)
{
  console.log("Incorrect user!");
  res.redirect('/login');
}
    else 
    {
      console.log("successfully logged in user: " + session.username);
      res.redirect('/');
    }
  }
  controller.login(session,callback);


});
app.get('/login', function (req, res){
  res.render('login',{layout: false});
});

app.get('/signup', function (req, res){
  res.render('signup',{layout: false});
});
app.post('/signup', function (req, res){
  
  console.log(req.body.username + "  is tyring to sign up!");
  /*hash: function hash(text){
  return crypto.createHash('sha1').update(crypto.createHash('md5').       update(text).digest('hex')).digest('hex');
                                            }*/
        var name= req.body.username;
        var password = controller.hash(req.body.pass);
        console.log(password);
        var id = crypto.createHash('md5').update(req.body.username).digest('hex');
        var callback = function (data)
          {
            if(data==null)
            {
              console.log("user already exists!");
              res.redirect('/signup');
            }
            else {

              console.log("successfully signed in!");
              res.redirect('/');
            }
          };
        controller.insertNewUser(id,name, password, callback);
        
        

});

app.get('/post', function(req, res)
    {
      //var Converter = require("./pagedown/Markdown.Converter.js").Converter;
        //  var converter = new Converter();
              //console.log(converter.makeHtml("**I am bold!**"));
      res.render('post.html',{layout: false});
    });
  



  



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
