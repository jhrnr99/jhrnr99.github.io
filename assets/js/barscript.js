
function startPage() {
  username = "";
  var element = document.getElementById("Heading1");
  element.innerHTML = "Welcome to Jacob's Bar!";
  element = document.getElementById("Question");
  element.innerHTML = "What should we call you?";
  document.write(username);
}

function getInputValue(){
  username = document.getElementById("input").value;
  var element = document.getElementById("Heading1");
  element.innerHTML = "Welcome " + username + "!";
  element = document.getElementById("Question");
  element.innerHTML = "";
}
