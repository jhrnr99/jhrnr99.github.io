var username = "";

if (username = "") {
  var element = document.getElementById("Heading1");
  element.innerHTML = "Welcome to Jacob's Bar!";
  element = document.getElementById("Question");
  element.innerHTML = "What should we call you?";
}
else {
  var element = document.getElementById("Heading1");
  element.innerHTML = "Welcome " + username + "!";
  element = document.getElementById("Question");
  element.innerHTML = "";
}

function getInputValue(){
  username = document.getElementById("input").value;
}
