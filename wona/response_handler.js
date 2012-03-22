var fs = require('fs');
 
// Constructor
var response_handler = function(res) {
    this.res = res;
};
 
// properties and methods
response_handler.prototype = {
    //store the node response object so we can operate on it
    res: {},

    serverError : function(code, content) {
          var self = this;
          console.log("Server Error" + code + " : " + content); 
          self.res.writeHead(code, {'Content-Type': 'text/plain'});
          self.res.end(content);
                    },
    renderHtml : function(content) {
          var self = this;
          self.res.writeHead(200, {'Content-Type': 'text/html'});
          self.res.end(content, 'utf-8');
                                 },
    getHeadersByFileExtension : function(extension) {
          var self = this;
          var headers = {};
                                                                                          switch (extension) {
              case 'css':
                headers['Content-Type'] = 'text/css';
                break;
              case 'js':
                headers['Content-Type']= 'application/json';
              case 'ico':
                headers['Content-Type']= 'image/x-icon';
                break;
              default:
                headers['Content-Type']='text/plain';
                                                                                          }
                                                                                          return headers;
                                }








};
 
// node.js module export
module.exports = response_handler;
