/**
* created by Hemadri Dasari on 02/05/2018
*/

const express = require('express'),
      router = express.Router(),
      Client = require('node-rest-client').Client;

let client = new Client();
//router middleware to intercept every request
router.use(function(req, res, next){
  console.log(`Request method: ${req.method}, Request Param: ${req.params}, Request URL: ${req.url}`);
  next();
}); 

router.get('/data', function(req, res, next){
  //read query params
  let country = req.query.country;
  let category = req.query.category;

  //contruct URL
  let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${config.apiKey}`

  //Use node-rest-client to talk to external API
  client.get(url, function (data, response) {
      res.json({status: 201, message: "News data fetched successfully", data: data});
  });
});

//export router
module.exports = router;