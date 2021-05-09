// fetching the data
class Drinks {
    async getData() {
        try {
            let response = await fetch("drinks.json");
            let data = await response.json();
            console.log(data.items);
            return data.items;
        }
        catch (err) {
            console.log(err);
        }
    }
}

class UI {
    displayItems(drinks) {
        let output = '';
        drinks.forEach(function(drink) {
            output = output + `
            <div class="drinks">
            <h3>${drink.name}</h3>
            <h4>Ingredients - ${drink.ingredients}</h4>
            <h4>Type - ${drink.type}</h4>
            </div>
            `;
        })
        heading.innerHTML = output;
    }
}

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
}

function readData() {
  table = document.createElement('table');
  dbRef.on("value", function(snapshot) {
    if (tableFlag == "N") {
      snapshot.forEach(function(childSnapshot) {
        var drink = childSnapshot.val().drink;
        var user = childSnapshot.val().username;
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var text1 = document.createTextNode("Somebody get " + user + " a " + drink + "!");

        td1.appendChild(text1);
        tr.appendChild(td1);
        table.appendChild(tr);
      });
    } else {
    	dbRef.limitToLast(1).once('child_added', function(data) {
        var drink = data.val().drink;
        var user = data.val().username;
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var text1 = document.createTextNode("Somebody get " + user + " a " + drink + "!");

        td1.appendChild(text1);
        tr.appendChild(td1);
        table.appendChild(tr);
        });
    }
    document.body.appendChild(table);
    tableFlag = "Y";
  });
  drinks = new Drinks();
  ui = new UI();
  drinks.getData().then(drinks => {
    ui.displayItems(drinks);
  });
}
