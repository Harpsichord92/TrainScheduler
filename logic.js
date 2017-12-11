  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD53FcjOhAIPdn-9ZvZTXZLE8yg6aJ8cus",
    authDomain: "trainscheduler-871d2.firebaseapp.com",
    databaseURL: "https://trainscheduler-871d2.firebaseio.com",
    projectId: "trainscheduler-871d2",
    storageBucket: "",
    messagingSenderId: "689426811003"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //Button for adding new trains

  $("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFirst = moment($("#first-input").val().trim(), "HH:mm").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    first: trainFirst,
    freq: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

//Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().freq;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFreq);

  // Prettify the First Train Time
  var trainFirstPretty = moment.unix(trainFirst).format("HH:mm A");

  // To calculate the minutes away the next train is
  var trainMinutes = moment().diff(moment.unix(trainFirst, "X"), "minutes");
  console.log(trainMinutes);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + 
                                                trainDest + "</td><td>" +
                                                trainFreq + "</td><td>" + 
                                                trainFirstPretty + "</td><td>" + 
                                                trainMinutes + "</td><td>" +
                                   "</tr>");
});