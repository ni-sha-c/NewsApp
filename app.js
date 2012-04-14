/*
 * Module dependencies.
 */

var express = require('express')
  , wona = require('./wona'),
  crypto = require('crypto'),
  controller = require('./wona/controller.js'),
  MemoryStore = require('express/node_modules/connect').session.MemoryStore;
 // RedisStore = require('connect-redis')(express);
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
  app.use(express.cookieParser());
  app.use(express.session({secret : "chromodynamics",store: new MemoryStore({reapInterval: 60000*10})}));
  app.use(express.static(__dirname + '/public'));
  app.use(express.methodOverride());
  app.use(app.router);


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
app.get('/error', function (req, res)
    {
      res.render("404.html", {layout: false});
    });


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
  
                if(data==null||data==undefined)
                {             
                    console.log("Incorrect user!");
                    res.redirect('/login/retry');
                }  
                else 
                {
                    console.log("successfully logged in user: " + session.username);
                    if(req.session.username==null)
                    {
                        req.session.username = session.username;
                        req.session.uid = data;
                        res.redirect('/');
                    }         
                }        
                } 
  controller.login(session,callback);


});
app.get('/login/:y', function (req, res){
          
            console.log(req.params.y);
         if(req.session.uid!=null)
              res.redirect('/');
        else {


                controller.error(req.params.y);
                res.render('login.html',{layout: false});

              }   
});
app.get('/logout', function(req, res) {
  req.session.destroy(function(err)
    {
      console.log("session destroyed!");
      console.log(err);
    });
    res.redirect('/');
    });
app.get('/signup/:y', function (req, res){
  console.log(req.params.y);
  controller.error(req.params.y);
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
        var session = {
          username : String,
          password : String
        };
          session.username = name;
          session.password = password;
        
        var callback = function (data)
          {
            if(data==null)
            {
              console.log("user already exists!");
              res.redirect('/signup/retry');
            }
            else {

              console.log("successfully signed in!");
              if(req.session.uid==null)
              {
              res.session.username= name;
              res.session.uid =id;
              res.redirect('/');
              }
            }
          };
        controller.insertNewUser(id,name, password, callback);
        
        

});
app.post('/post', function(req, res)
    {
        var article = req.body.contents;
        console.log(article);
        var callback = function(data)
                        {
                            if(data==null)
                            {            
                              console.log("sorry!error in posting the article!");
                              res.redirect('/error');
                            }
                            else
                              console.log(data);
                        };

      controller.post(article,callback);
    });

app.get('/post', function(req, res)
    {
      //var Converter = require("./pagedown/Markdown.Converter.js").Converter;
        //  var converter = new Converter();
              //console.log(converter.makeHtml("**I am bold!**"));
      //if(auth.getUserId()==null)
        //  {
          //  console.log("someone's pressed post without logging in!");
            //res.redirect('/login',{layout: false});
         // }
      //else
      if(req.session.username==null)
            { console.log("someone's accessing post page without logging in!");
              res.redirect('/login/lbp',{layout : false});
            }
      
      else
          {
            res.render('post.html',{layout: false});
            console.log(req.session.username + "is writing a post now!");
          }
      

    });
  



  



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
