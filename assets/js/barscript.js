function startPage() {
  heading = document.getElementById("Heading1");
  heading.innerHTML = "Welcome to Jacob's Bar!";
  question = document.getElementById("Question");
  question.innerHTML = "What should we call you?";
  drinkButton = document.getElementById("DrinkButton");
  drinkButton.style.visibility = "hidden";
  dbRef = firebase.database().ref("orders");
  tableFlag = "N"
}

function getInputValue() {
  username = document.getElementById("Input").value;
  changeDisplay();
}

function changeDisplay() {
  heading.innerHTML = "Welcome " + username + "!";
  question.style.visibility = "hidden";
  textField = document.getElementById("Input");
  textField.style.visibility = "hidden";
  button = document.getElementById("Button")
  button.style.visibility = "hidden";
  wantADrink();
}

function wantADrink() {
  drinkButton.style.visibility = "visible";
  question = document.getElementById("Question");
  question.style.visibility = "visible";
  question.innerHTML = "Would you like a drink?";
  drinkButton.style.visibility = "visible";
}

function drinkRequested() {
  question.style.visibility = "hidden";
  drinkButton.style.visibility = "hidden";
  heading.innerHTML = "You drink is on the way " + username + "!";
  var drink = "Mojito";
  writeDrinkOrder(username, drink);
}

function writeDrinkOrder(username, drink) {
  var ordersListRef = firebase.database().ref('orders');
  var newOrderRef = ordersListRef.push();
  newOrderRef.set({
    username: username,
    drink: drink
  });
  readData();
  /*key = newOrderRef.getKey();
  dbRef.child(key).limitToLast(1).on('child_added', (data) => {
  	readData(data);
  });*/
}

function readData() {
  table = document.createElement('table');
  /*dbRef.on('child_added', (data) => {
    readData(data);
  });*/
  if (tableFlag = "N") {
    dbRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        childSnapshot.forEach(function(childSnapshot) {
          console.log(childSnapshot.val());
          var drink = childSnapshot.val().drink;
          var user = childSnapshot.val().username;
          var tr = document.createElement('tr');

          var td1 = document.createElement('td');

          var text1 = document.createTextNode("Somebody get " + user + " a " + drink + "!");

          td1.appendChild(text1);
          tr.appendChild(td1);

          table.appendChild(tr);
          tableFlag = "Y";
        });
      });
    });
  } else {
    dbRef.limitToLast(1).on("child_added", function(snap) {
      console.log("tableFlag = Y");
      var drink = snap.val().drink;
      var user = snap.val().username;
      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      var text1 = document.createTextNode("Somebody get " + user + " a " + drink + "!");
      td1.appendChild(text1);
      tr.appendChild(td1);

      table.appendChild(tr);
    });
  }
  document.body.appendChild(table);
}
