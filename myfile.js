
  var config = {
    apiKey: "AIzaSyBBz0ZQ-pm6WRjpRk0yp3hwdIzwSdG1eU4",
    authDomain: "first-project-84717.firebaseapp.com",
    databaseURL: "https://first-project-84717.firebaseio.com",
    projectId: "first-project-84717",
    storageBucket: "first-project-84717.appspot.com",
    messagingSenderId: "1024553920268"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#form-submit").on("click", function() {
    database.ref().push({
        name:$("#employee-name").val().trim(),
        title: $("#employee-title").val().trim(),
        start: $("#start-date").val().trim(),
        monthlyRate: $("#monthly-rate").val().trim()

      });
    });

    database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
        var empName = snapshot.val().name;
        var empTitle = snapshot.val().title;
        var empStart= snapshot.val().start;
        var emptMonthlyRate = snapshot.val().monthlyRate;
        var months = moment().diff(empStart, "months");

        var parsed1 = parseInt(emptMonthlyRate,10);
        var parsed2 = parseInt(months,10);
        var billed = parsed1 * parsed2;
        
        console.log(billed);
        console.log(months);
        console.log(emptMonthlyRate);

        var newRow = $("<tr>").append(
             $("<td>").text(empName), 
             $("<td>").text(empTitle),
             $("<td>").text(empStart),
             $("<td>").text(emptMonthlyRate),
             $("<td>").text(months),
             $("<td>").text(billed)
            );

    $(".table").append(newRow);

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});
