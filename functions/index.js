var functions = require("firebase-functions")
var express = require("express")
var firebase = require('firebase') .initializeApp({
  serviceAccount: "./loucura-bb457a058add.json",
  databaseURL: "https://loucura-75e33.firebaseio.com"
})
var app = express();
var bodyParser     =         require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/views'))
app.use(express.static(__dirname + '/public/css'))
app.use(express.static(__dirname + '/public/vendor'))
app.use(express.static(__dirname + '/public'))


var ref = firebase.database().ref();
var ratingref = ref.child('rating')

var videosIDs = [0,1,2,3,4,5,6,7,8,9]

function writeVideoData(videoId) {
  if (!(firebase.database().ref('videos/' + videoId))) {
    firebase.database().ref('videos/' + videoId).set({
      rating_avg: 0
    });
  }
}

ref.on('value', function(snap) {
 snap.forEach(function (childSnap) {
   for (i = 0; i < childSnap.val().length; i++) {
     var avg = 0;
     for (j = 0; j < Object.keys(childSnap.val()[i]).length; j++) {
       key = Object.keys(childSnap.val()[i])[j]
       if (key != 'rating_avg') {
         avg += childSnap.val()[i][key]
        //  console.log(key)
       }
     }
    avg /= j-1
    avg = avg || 0

    var updates = {};
    updates['/videos/' + i + '/rating_avg'] = avg;

    firebase.database().ref().update(updates);
   }
    // console.log((childSnap.val().length));
 });
});



for (i = 0; i < videosIDs.length; i++) {
  writeVideoData(videosIDs[i]);
}

function updateRating(vid, rating) {

  // Get a key for a new Post.
  var newVideoKey = firebase.database().ref().child('videos/' + vid).push(parseFloat(rating));

}

videoId = 0
var n = firebase.database().ref('videos/' + videoId + '/n');
var rating = firebase.database().ref('videos/' + videoId).rating;
// return firebase.database().ref('/videos/' + videoId).once('value').then(function(snapshot) {
//   rating = (snapshot.val() && snapshot.val().rating) || 'NaN';
//   n = (snapshot.val() && snapshot.val().n) || 'NaN';
// });

// console.log("Rating e n:")
// console.log(rating)
// console.log(n)

app.get('/', function (req, res) {
  console.log("tentei")
  req.body.input = 4
  res.sendFile('/index.html');
});

app.post('/test', function (req, res) {
  var body = req.body
  console.log(req.body)
  if (body.id == 0) {
    updateRating(0, body.rating)
    res.json({"avg": 1})
  } else if (body.id == 1) {
    updateRating(1, body.rating)
  } else if (body.id == 2) {
    updateRating(2, body.rating)
  } else if (body.id == 3) {
    updateRating(3, body.rating)
  } else if (body.id == 4) {
    updateRating(4, body.rating)
  } else if (body.id == 5) {
    updateRating(5, body.rating)
  } else if (body.id == 6) {
    updateRating(6, body.rating)
  } else if (body.id == 7) {
    updateRating(7, body.rating)
  } else if (body.id == 8) {
    updateRating(8, body.rating)
  } else if (body.id == 9) {
    updateRating(9, body.rating)
  }

  // res.render('registered.html')
  // res.redirect('/')
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
