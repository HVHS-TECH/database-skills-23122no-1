/**************************************************************
 **************************************************************
 **                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **
 **************************************************************
 **************************************************************/

const HTML_OUTPUT = document.getElementById("databaseOutput");

/**************************************************************/
// helloWorld()
// Demonstrate a minimal write to firebase
// This function replaces the entire database with the message "Hello World"
// 
// This uses the set() operation to write the key:value pair "message":"Hello World"
// The ref('/') part tells the operation to write to the base level of the database "/"
// This means it replaces the whole database with message:Hello World
/**************************************************************/

let user = "fourth_user";
let score = 8;

function addHighScores() {
  console.log("adding high scores")
  highscoreTable = {
    game1: {
      users: {
        user_one: {
          score: 12
        },
        user_two: {
          score: 2
        },
        user_three: {
          score: 5
        }
      }
    }
  }

  firebase.database().ref("/").set(highscoreTable);
}

function addUser() {
  firebase.database().ref("game1/users/" + user).set(score);
}

function fb_readHighScore() {
  console.log("reading high score");
  firebase.database().ref("game1/users").orderByValue().limitToLast(1).once("value", fb_displayHighScore, fb_readError)
}

function fb_displayHighScore(snapshot) {
  let highScores = snapshot.val()
  HTML_OUTPUT.innerHTML += ("user_one got " + highScores["user_one"] + " points");
}

function fb_readAllScores() {
  console.log("reading high scores");
  firebase.database().ref("game1/users").orderByValue().limitToLast(3).once("value", fb_displayAllScores, fb_readError)
}

function fb_displayAllScores(snapshot) {
  console.log(snapshot.val());
  snapshot.forEach(fb_showOneScore)
}

function fb_showOneScore(child) {
  console.log(child.val());
  HTML_OUTPUT.innerHTML += "<p>" + child.key + " got " + child.val() + " points </p>";
}

function fb_login() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("logged in");
      console.log(user)
      var uid = user.uid;
      console.log("user added");
      welcome.innerHTML = "Welcome, " + user.displayName;
      profilePhoto.src = user.photoURL;
      firebase.database().ref("game1/users/" + uid + "/email").set(user.email);
      firebase.database().ref("game1/users/" + uid + "/name").set(user.displayName);
    } else {
      console.log("Not logged in");
      // Using a popup.
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      });
    }
  });
}

function helloWorld() {
  console.log("Running helloWorld()")
  firebase.database().ref('/').set(
    {
      message: 'Kia ora'
    }
  )
}

function goodbye() {
  console.log("Running goodbye()")
  firebase.database().ref('/').set(
    {
      message: 'Ka kite āno'
    }
  )
}

function simpleRead() {
  console.log("reading message")
  firebase.database().ref("/").child("message").once("value", displayRead, fb_readError);
  console.log("Leaving simpleRead");
}

function displayRead(snapshot) {
  var dbData = snapshot.val();
  if (dbData == null) {
    console.log("There was no record when trying to read the message")
  } else {
    console.log("Running displayRead(), the message is: " + snapshot.val())
    HTML_OUTPUT.innerHTML = snapshot.val();
  }
}

function fb_readError(error) {
  console.log("there was an error reading the message");
  console.error(error);
}

function fb_readListener() {
  console.log("Read Listener");
  firebase.database().ref("/").child("message").on("value", fb_logDatabaseRead, fb_readError);
}

function fb_logDatabaseRead(snapshot) {
  var dbData = snapshot.val();
  if (dbData == null) {
    console.log("There was no record when trying to read the message")
  } else {
    console.log("Running displayRead(), the message is: " + snapshot.val())
    HTML_OUTPUT.innerHTML = snapshot.val();
  }
}

