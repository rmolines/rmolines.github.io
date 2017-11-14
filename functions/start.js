var express = require('express');
var app = express();
var bodyParser     =         require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/views'))
app.use(express.static(__dirname + '/public/css'))
app.use(express.static(__dirname + '/public/vendor'))
app.use(express.static(__dirname + '/public'))

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// // The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);



app.get('/', function (req, res) {
  res.sendFile('/index.html');
});

app.post('/test', function (req, res) {
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/messages').push({original: "teste"}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
  console.log(req.body.t.input);
  res.render('registered.html')
});

const api = functions.https.onRequest(app)

module.exports = {
  api
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
