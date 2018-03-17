
  var config = {
    apiKey: "AIzaSyC9UgqiDs9UHrlUIZsVPBA3K9ASgKxqiYg",
    authDomain: "trains-458b6.firebaseapp.com",
    databaseURL: "https://trains-458b6.firebaseio.com",
    projectId: "trains-458b6",
    storageBucket: "",
    messagingSenderId: "907708841192"
  };
  firebase.initializeApp(config);
  console.log("begin");

  $(function(){
	let trainData = firebase.database();

		$('form').on('submit', function (e){
			e.preventDefault();

			let trainName = $("#trainNameInput").val().trim();
			let destination = $("#destinationInput").val().trim();
			let firstTime = moment($("#timeInput").val().trim(), "HH:mm").format("");
			let frequency = $("#frequencyInput").val().trim();

			var newTrains = {
				name: trainName,
				tdestination: destination,
				tFirst: firstTime,
				tfreq: frequency,
			}

			trainData.ref().push(newTrains);

			console.log(newTrains.name);
			console.log(newTrains.tdestination);
			console.log(newTrains.tFirst);
			console.log(newTrains.tfreq);

			$("#trainNameInput").val("");
			$("#destinationInput").val("");
			$("#timeInput").val("");
			$("#frequencyInput").val("");

			return false;
		});

		trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

			console.log(childSnapshot.val());

			let trainName = childSnapshot.val().name;
			let destination = childSnapshot.val().tdestination;
			let firstTime = childSnapshot.val().tFirst;
			let frequency = childSnapshot.val().tfreq;

			var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

			var currentTime = moment();

			var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

			var tRemainder = diffTime % frequency;

			var tMinutesTillTrain = frequency - tRemainder;
			var nextTrain = moment().add(tMinutesTillTrain, "minutes");
			var nextTrainConverted = moment(nextTrain).format("hh:mm a");

			$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

		});
  })
