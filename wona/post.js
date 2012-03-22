var querystring = require('querystring'),
    http = require('http'),
    mysql = require('mysql'),
    request = require('request');

http.createServer( function(req, res) {
  if(req.url === 'http://localhost/post') {
      if(req.method === 'POST')
request(
    {
      method: 'POST' ,
      uri: 'localhost:4567/post' ,
      multipart:
      [ { 'content-type': 'application/json' ,
          body: JSON
