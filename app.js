/*
 * Module dependencies.
 */

var express = require('express')
  , wona = require('./wona'),
  crypto = require('crypto'),
  controller = require('./wona/controller.js'),
  MemoryStore = require('express/node_modules/connect').session.MemoryStore,
  fs= require('fs'),
  ejs=require('ejs'),
  config= require('./config.js');
 // RedisStore = require('connect-redis')(express);
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
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

app.get('/islogged', function (req, res)
    {
        if(req.session.username==null)
        {
            var obj = [
                        {"username":null
                        ,"userid":null}
                      ];
            var json= JSON.stringify(obj);
            console.log(json[0]['username']);
            res.send(json);
        }
        else
        {
              var obj = [
                            {
                            "username":req.session.username
                            ,"userid" : req.session.uid
                            }
                        ];
              var json = JSON.stringify(obj);
              var blah = '';
              blah = blah +json;
              blah = JSON.parse(blah);
              console.log("username is : " +blah[0]['username']);
              res.send(json);
          }
    });

app.get('/', function(req, res)
              {
                req.session.page=0;
                req.session.nop=0;
                var number = 0, nop=0;
                var callback = function (data) { 
                  
                  if(data==null || data==undefined)
                      console.log("error setting the maximum no of pages cookie!");
                  else
                      {
                        nop = 0 + data[0]['COUNT(pid)'];  
                        console.log("number of posts = " + nop);
                      }
                  };
                  controller.findNumber(callback);
                    console.log("setting max no of pages cookie...");
                             
                                            setTimeout( function () {
                    req.session.nop = Math.floor(nop/5);
                    console.log("The maximum number of pages= " + req.session.nop);
                    },500);
    
                    res.render("index.ejs",{layout: false, locals : { cpage: req.session.page,ppage: req.session.page, npage: req.session.page+1 }}); 
                
              });
app.get('/view', function(req,res)
              {
                res.render("index.ejs",{layout: false, locals: { cpage: req.session.page, ppage: req.session.page-1, npage: req.session.page+1}});
              });
app.post('/view/newer', function (req, res)
                  {
                   
              
            var number=0;
            console.log("the session variable is " + req.session.page);
            number  = number+ req.session.page-1;
            console.log("the requested page is " + number);
            if(number==-1)
                number=0;
            else
              req.session.page= req.session.page-1;
                                          
                                                    
                                                
                                          setTimeout( function () {
                                                                
                                                                res.redirect('/view');
                                                                  },20);
                                              
                                          

                                          
                                    
                                      
                                        
                  });



app.post('/view/older', function (req, res)
                  {
                   
              
            var number=0;
            console.log("the session variable is " + req.session.page);
            number  = number+ req.session.page +1;
            var nop=0;
            console.log("the page that is requested is " + number);
                         var minorCallback = function (data) { 
                  
                  if(data==null || data==undefined)
                      console.log("error setting the maximum no of pages cookie!");
                  else
                      {
                        nop = 0 + data[0]['COUNT(pid)'];  
                        console.log("number of posts = " + nop);
                      }
                  };
                  controller.findNumber(minorCallback);
                    console.log("setting max no of pages cookie...");
                
              setTimeout( function () {      
                  req.session.nop = 0 + Math.floor(nop/5);
                console.log("maximum number of pages: " + req.session.nop);
            if(number==req.session.nop+1)
                  { console.log("Came around a circle to the first page!");
                    number=0;
                    req.session.page=0;
                  }
            else
            {
              req.session.page= req.session.page+1;
            }

              },20);
            setTimeout( function () {
                                                                
                                  res.redirect('/view');
                            },20);
           
                  });


app.get('/post/all', function (req, res)
    {
      var callback = function(data)
      {
        if(data==null)
          res.redirect('/error');
        else
          res.send(data);
      };
      controller.retreiveAllPosts(callback);
    }

      );

 app.get('/article/:pid', function (req, res)
    {
      var pid = req.params.pid;
      var callback = function(data)
      {
        if(data==null)
          res.redirect('/error');
        else
          res.send(data);
      };
      controller.getPost(pid,callback);
    }

      );

     
  
      

//Experimenting for individual articles page
app.get('/view/:pid',function(req,res){
	var pid = req.params.pid;
	res.render("article.ejs", {layout: false, locals:{ pid: pid, user: req.session.username}});
	});
app.get('/post/:number', function (req, res)
    {
      var number =0;
      number = req.params.number;
      var callback = function (data)
                      {
                        if(data==null)
                            res.redirect('/error');
                        else
                            res.send(data);
                      
                      };
      
      controller.retreivePosts(number,callback);
    });
app.get('/error', function (req, res)
    {
      res.render("404.ejs", {layout: false});
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
                res.render('login.ejs',{layout: false});

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
  //console.log(req.params.y);
  //controller.error(req.params.y);
  res.render('signup.ejs',{layout: false});
});

app.post('/signup', function (req, res){
  
  console.log(req.body.username + "  is tyring to sign up!");
  /*hash: function hash(text){
  return crypto.createHash('sha1').update(crypto.createHash('md5').       update(text).digest('hex')).digest('hex');
                                            }*/
        var name= req.body.username;
        var password = controller.hash(req.body.pass);
        //console.log(password);
        var id = crypto.createHash('md5').update(req.body.username).digest('hex');
        
        var callback = function (data)
          {
            if(data!="success")
            {
              console.log("user already exists!");
              res.redirect('/signup/nu');
            }
            else {

              console.log("successfully signed in!");
              if(req.session.uid==null)
              {
              req.session.username= name;
              req.session.uid =id;
              res.redirect('/');
              }
            }
          };
        controller.insertNewUser(id,name, password, callback);
        
        

});
app.get('/edit/:pid', function(req, res)
    {
      var pid = req.params.pid;
      console.log(pid);
      var callback = function (data)
       {
         console.log(data);
        console.log("author of this article is : " + data[0].author);
        if(data[0].author==req.session.username)
          {
            console.log(req.session.username + "is now editing the article" + data[0].title);
            res.render("edit.ejs", { layout : false, locals : { pid :pid , space : data[0].contents }});
          }
          else
            {
              console.log("this user cannot edit this article!");
              res.redirect('/error');
            }
      };
      controller.getPost(pid, callback);
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
                             {
                               console.log(data);
                               res.redirect('/');
                             }
                        };
      
      controller.post(article,req.session.username,callback);
    });

app.get('/write', function(req, res)
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
            res.render('post.ejs',{layout: false});
            console.log(req.session.username + "is writing a post now!");
          }
      

    });
app.post('/update/:pid', function(req, res)
    {
        var pid= req.params.pid;
        console.log("inside /update " + pid);
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
                             {
                               console.log(data);
                               res.redirect('/');
                             }
                        };
      
      controller.updatePost(pid,article,req.session.username,callback);
    });
 



  



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
