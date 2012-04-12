//var view = require('./view.js'),
var mysql = require('mysql');
var crypto = require('crypto');
var mysql = require('mysql');
var DATABASE = 'wona';
var TABLE = 'editor';
var client = mysql.createClient({
    user: 'root',
      password: 'hello',
});

// If no callback is provided, any errors will be emitted as `'error'`
// events by the client
client.query('USE '+DATABASE);
//exports.insertNewUser= 

var controller = function() {};
 
controller.prototype = {


  insertNewUser : function (id, name, password,callback) {  
client.query(
      'INSERT INTO '+TABLE+' '+
        'SET id= ?, name = ?, password = ?, articles = ?',
          [id, name,password,null], function( err, info)
          {
             if(err==null)
                {
                  console.log("inserted new user: " + name); 
                  callback(info);
                }
            else 
                 {
                   console.log(err);
                  callback(null);
                 }
          }
            
    );



},

 
   
   /* supply_view : function(user, callback) {
                 var callback = (typeof callback === 'function') ? callback : function() {};
                  
                     var data = {
                             user ? user : 'nobody'
                                  };
                      
                      view.renderView('view', data, function(data) {
                                 callback(data);
                                     });
                           },*/
    hash: function hash(text){
                    return crypto.createHash('sha1').update(crypto.createHash('md5').update(text).digest('hex')).digest('hex');
                      },
    login : function(session, callback) {
              var username = session.username;
              var password = session.password;
              client.query('SELECT password FROM '+TABLE+' WHERE name=?',[username], function (err, results, fields) {
                if(err==null)
              {
                
                console.log(results);
                var blue = JSON.stringify(results);
                var json = JSON.parse(blue);
                if(json==null||json==undefined)
              {
                console.log("user not found!");
                callback(null);
              }
                else
              { if(json[0].password==password)
                callback(results);
                else 
              {
                console.log("Passwords don't match!");
                callback(null);
              }
              }
              }
                else
                console.log(err);
              });
            }

};
 
module.exports = new controller();
