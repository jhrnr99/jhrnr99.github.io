
function startPage() {
  console.log("In startPage function");
  username = "";
  var element = document.getElementById("Heading1");
  element.innerHTML = "Welcome to Jacob's Bar!";
  element = document.getElementById("Question");
  element.innerHTML = "What should we call you?";
  console.log(username);
}

function getInputValue(){
  console.log("In getInputValue function");
  username = document.getElementById("input").value;
  var element = document.getElementById("Heading1");
  element.innerHTML = "Welcome " + username + "!";
  element = document.getElementById("Question");
  element.innerHTML = "";
  console.log(username);
}
