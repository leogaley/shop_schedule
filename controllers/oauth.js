const request = require('request');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');


const oauth = OAuth({
  consumer: {
    key: '82bf5f7084dcff6e790390a3021a5b0fa0dac8c2f8c0cfaf7a30eb26c1236060',
    secret: 'd76fa738ad33417a92eaccfd96346c0c7058b800a99114c38bc224a0b38f95e3'
  },
  signature_method: 'HMAC-SHA1',
  realm: '3429264',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});
   
const request_data = {
  url: 'https://3429264.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=356&deploy=1',
  method: 'GET'
  //data: { status: 'Hello Ladies + Gentlemen, a signed OAuth request!' }
};
   
// Note: The token is optional for some requests
const token = {
  key: 'c47bd6e5486913b853ed2ceef8654cd6298ea6cbaa3dad254e0342bf1a129ac9',
  secret: '73db7ad0df06b6f0c5581b458b79b67d610a623b60694a4731b1cb6233557491'
};
  

function getAll(req, res) {
    request({
      url: request_data.url,
      method: request_data.method,
      form: request_data.data,
      headers: oauth.toHeader(oauth.authorize(request_data, token))
    }, function(error, response, body) {
      // Process your data here
      console.log("Data Received!!!!!");
      // console.log(body);
      res.send(body);
    });
  }

  module.exports.getAll = getAll;