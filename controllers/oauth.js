const request = require('request');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');
const bodyParser = require("body-parser");

// const mapped  = require('../helpers/mapper.js');

// Function to create icon field

// function icons(check, hd, photo) {
//   let iconCode = "";
//   if (check == "yes"){
//       iconCode += a;
//   }
//   if (hd == true){
//       iconCode += b;
//   }
//   if (photo == true){
//       iconCode += c;
//   }

//   return iconCode;
// }

// // Function to map requested data to a more usable format

// function mapper (data) {  
//   //  console.log ("d:   " + data); 
//   let filteredDataObject = [];

//   for (let i = 0; i < data.length; i++) {

//       console.log ("map!" + data[i]);
//       if (data[i].columns.custbody162.name){
//           let a = data[i].columns.custbody162.name;
//       } else {let a = "";}
//       if (data[i].columns.custbody32){
//           let b = data[i].columns.custbody32;
//       } else {let a = "";}
//       if (data[i].columns.custbody162.name){
//           let c = data[i].columns.custbody144;
//       } else {let a = "";}
//       let iconCode = icons(a, b, c);
//       filteredDataObject.push({
//           wo:data[i].columns.tranid,
//           item:data[i].columns.item.name,
//           desc:data[i].columns.displayname,
//           note:data[i].columns.memo,
//           // icons:iconCode,
//           qty:data[i].columns.formulanumeric,
//           duedate:data[i].columns.enddate,
//           bo:data[i].columns.quantitybackordered,
//           bs:data[i].columns.custbody34.name,
//           iss:data[i].columns.custbody178.name,
//           cust:data[i].columns.entity.name
//       });
  
//   };

//   console.log("mapper");
//   return filteredDataObject;
// }


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
      
      
      // let filteredDataObject = [];

      // for (let i = 0; i < body.length; i++) {
    
      //     console.log ("map!" + body[i]);
      //     if (body[i].columns.custbody162.name){
      //         let a = body[i].columns.custbody162.name;
      //     } else {let a = "";}
      //     if (body[i].columns.custbody32){
      //         let b = body[i].columns.custbody32;
      //     } else {let a = "";}
      //     if (body[i].columns.custbody162.name){
      //         let c = body[i].columns.custbody144;
      //     } else {let a = "";}
      //     let iconCode = icons(a, b, c);
      //     filteredDataObject.push({
              // wo:body[i].columns.tranid,
              // item:body[i].columns.item.name,
              // desc:body[i].columns.displayname,
              // note:body[i].columns.memo,
              // // icons:iconCode,
              // qty:body[i].columns.formulanumeric,
              // duedate:body[i].columns.enddate,
              // bo:body[i].columns.quantitybackordered,
              // bs:body[i].columns.custbody34.name,
              // iss:body[i].columns.custbody178.name,
              // cust:body[i].columns.entity.name
      //     });
      
      // };

      res.send(body);
    });
  }

  function getDept(req, res) {
    console.log ("re.params.id: " + req.params.id);

    const request_data_id = {
      url: 'https://3429264.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=356&deploy=1&searchid=' + req.params.id,
      method: 'GET'
      //data: { status: 'Hello Ladies + Gentlemen, a signed OAuth request!' }
    };
    console.log("qqqqq"+request_data_id);
    request({
      url: request_data_id.url,
      method: request_data_id.method,
      form: request_data_id.data,
      headers: oauth.toHeader(oauth.authorize(request_data_id, token)),
    }, function(error, response, body) {
      // Process your data here
      if (error){
        console.log(error);
      }
      console.log("Data Received!!!!!");
      // console.log(body);
      res.send(body);
    });
  }


  function update(req, res) {
    const request_data_post = {
      url: 'https://3429264.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=356&deploy=1',
      method: 'POST'
      //data: { status: 'Hello Ladies + Gentlemen, a signed OAuth request!' }
    };
    console.log("request body id:"+req.body.id);
    const body = { workorders:[
      {id:req.body.id, field:req.body.field}
      ]
    };
    request({
      url: request_data_post.url,
      method: request_data_post.method,
      form: request_data_post.data,
      headers: oauth.toHeader(oauth.authorize(request_data_post, token)),
      body: body,
      json: true
    }, function(error, response, body) {
      // Process your data here
      if (error){
        console.log(error);
      }
      console.log("Data Received!!!!!");
      // console.log(body);
      res.send(body);
    });
  }

  module.exports.getAll = getAll;
  module.exports.getDept = getDept;
  module.exports.update = update;