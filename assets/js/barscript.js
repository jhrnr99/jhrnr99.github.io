function startPage() {
  heading = document.getElementById("Heading1");
  heading.innerHTML = "Welcome to Jacob's Bar!";
  question = document.getElementById("Question");
  question.innerHTML = "What should we call you?";
  drinkButton = document.getElementById("DrinkButton");
  drinkButton.style.visibility = "hidden";
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
  displayQueue();
}

function displayQueue() {
  readData();
}

function readData() {
  var ref = firebase.database().ref("orders");

  ref.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      var drink = childData.drink;
      heading.innerHTML = "Somebody get " + childData.username + " a " + childData.drink + "!"
    });
  });
}
