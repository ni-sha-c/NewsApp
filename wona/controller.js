var view = require('./view.js');
 
var controller = function() {};
 
controller.prototype = {
   
    supply_view : function(user, callback) {
                 var callback = (typeof callback === 'function') ? callback : function() {};
                  
                     var data = {
                             user ? user : 'nobody'
                                  };
                      
                      view.renderView('view', data, function(data) {
                                 callback(data);
                                     });
                           },
    hash: function hash(text){
                    return crypto.createHash('sha1').update(crypto.createHash('md5').update(text).digest('hex')).digest('hex');
                      }
};
 
module.exports = new controller();
