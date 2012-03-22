var Mustache = require('Mustache'),
    fs = require('fs');
var view = function () {};
view.prototype = {
  renderView : function (name, data, callback) {
                 var self = this;
                 if (typeof callback !== 'function') throw ViewCallbackException;
                 self.getView(name, 'html', function(content) {
                   var template = Mustache.to_html(content, data);

                   self.getLayout({}, function(content){
                     content= self.setLayoutContent (content, template);
                     callback(content);
                   });
                 });
               },
  getView : function (name, format, callback) {
                                var self=this;

                                if(!name) {
                                  return '';
                                }
                                var format = format ? format : 'html';
                                var path = './../views/' + name + '.' + format;
                                var callback = (typeof callback === 'function')? callback : function() {};
                                fs.readFile(path, 'utf-8', function(error, content) {
                                  if(error)
                                  content = "<h1>View not found!</h1>";
                                callback(content);
                                });
            },

  getLayout : function(options, callback) {
                    var self = this;
                    var options = options ? options : {
                                'name' : 'default',
                                'format' : 'html'
                                              };
                    var name   = options.name ? options.name : 'default';
                    var format = options.format ? options.format : 'html';
                                 
                                    // callback handling
                    var callback = (typeof callback === 'function') ? callback : function() {};
                                     
                    var path = './../views/layouts/' + name + '.' + format;
                                         
                    fs.readFile(path, 'utf-8', function(error, content) {
                                                    if (error) 
                                                              content = "<h1>Layout not found!</h1>";
                                                                              callback(content);
                                                                                    
                                                        });
                                              }





};

