var fs =require('fs');
var url                     = require('url');
var controller              = require('./controller');
var response_handler        = require('./response_handler');
var actions = {
    'view' : function(user) {
          controller.supply_view(user, function (content) {
            ;
            }
}

this.dispatch = function(req, res) {
    //set up response handler passing res object
    responseHandler = new response_handler(res);

    var requestedUrl = url.parse(req.url);
    var parts, action, argument;


     
    
};
