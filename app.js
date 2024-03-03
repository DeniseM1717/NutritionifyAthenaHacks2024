/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/documentation/web-api/tutorials/code-flow
 */

//need to run this on ngrok

 var express = require('express');
 var request = require('request');
 var crypto = require('crypto');
 var cors = require('cors');
 var querystring = require('querystring');
 var cookieParser = require('cookie-parser');
 
 var client_id = 'a9454635426f428496e401dc33b516ed'; // your clientId
 var client_secret = 'f2d9e9e1784846a684413313c13f1e70'; // Your secret
 var redirect_uri = 'http://localhost:5173/results'; // Your redirect uri
 
 
 const generateRandomString = (length) => {
   return crypto
   .randomBytes(60)
   .toString('hex')
   .slice(0, length);
 }
 
 var stateKey = 'spotify_auth_state';
 
 var app = express();
 
 app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());
 
 app.get('/login', function(req, res) {
 
   var state = generateRandomString(16);
   res.cookie(stateKey, state);
 
   // your application requests authorization
   var scope = 'user-read-private user-read-email user-top-read';
   res.redirect('https://accounts.spotify.com/authorize?' +
     querystring.stringify({
       response_type: 'code',
       client_id: client_id,
       scope: scope,
       redirect_uri: 'https://756d-2600-387-15-12-00-7.ngrok-free.app/callback',
       state: state
     }));
 });
 
 app.get('/callback', function(req, res) {
 
   // your application requests refresh and access tokens
   // after checking the state parameter
 
   var code = req.query.code || null;
   var state = req.query.state || null;
   var storedState = req.cookies ? req.cookies[stateKey] : null;
    console.log(code, state)
   if (state === null || state !== storedState) {
     res.redirect('/#' +
       querystring.stringify({
         error: 'state_mismatch'
       }));
   } else {
     res.clearCookie(stateKey);
     var authOptions = {
       url: 'https://accounts.spotify.com/api/token',
       form: {
         code: code,
         redirect_uri: "https://756d-2600-387-15-12-00-7.ngrok-free.app/callback",
         grant_type: 'authorization_code'
       },
       headers: {
         'content-type': 'application/x-www-form-urlencoded',
         Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
       },
       json: true
     };
 
     request.post(authOptions, function(error, response, body) {
         console.log("sdlfkghiuergw", response, body)
    //    if (!error && response.statusCode === 200) {
 
         var access_token = body.access_token,
             refresh_token = body.refresh_token;
 
    //      var options = {
    //        url: 'https://api.spotify.com/v1/me',
    //        headers: { 'Authorization': 'Bearer ' + access_token },
    //        json: true
    //      };
 
    //      // use the access token to access the Spotify Web API
    //      request.get(options, function(error, response, body) {
    //        console.log(body);
    //      });
 
         // we can also pass the token to the browser to make requests from there
         res.redirect(redirect_uri + "?" +
           querystring.stringify({
             code: access_token,
             refresh_token: refresh_token
           }));
    //    } 
    //    else {
    //      res.redirect('/#' +
    //        querystring.stringify({
    //          error: 'invalid_token'
    //        }));
    //    }
     });
   }
 });
 
 app.get('/refresh_token', function(req, res) {
 
   var refresh_token = req.query.refresh_token;
   var authOptions = {
     url: 'https://accounts.spotify.com/api/token',
     headers: { 
       'content-type': 'application/x-www-form-urlencoded',
       'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) 
     },
     form: {
       grant_type: 'refresh_token',
       refresh_token: refresh_token
     },
     json: true
   };
 
   request.post(authOptions, function(error, response, body) {
     if (!error && response.statusCode === 200) {
       var access_token = body.access_token,
           refresh_token = body.refresh_token;
       res.send({
         'access_token': access_token,
         'refresh_token': refresh_token
       });
     }
   });
 });
 
 console.log('Listening on 8888');
 app.listen(8888);



 //http://localhost:8888/#access_token=BQBYzuHN8MOiGjOjhDXdaokIlSBESy7YALuBEa8CgjFLWoyRsd7DkeF9389r27E6HtSe2f0spasLmNO29k4dxNrlALzxq5_ECRfnmk7LBLZAcPZWw1u-ysX23RgrUzYh64rf96IBG-TqWac3c9Qr2AdmNf9oVcoo8cycAYKcU0NR1QBDbGx7YyV0qdpyI8pFXpzM-heuR1ycK9OV75yAVw&refresh_token=AQCdSxTSrdH5QUSTpvZrdq_TuY3xxwe7ELH6FiCHGTUVU3zO25tmmSi2AcCmhuFkFGbiUq89EeAw_leIr_6p6lFpF_5y_6TY4ZykgZWLCE7tjtQAqXUV60rmM70lcBKlF0k