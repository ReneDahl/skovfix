var submitForm = function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    return false;
  } else {
    alert("the form is submittet");
  }
};

var inputAddTask = function (event) {
  inputId = document.getElementById("input-id");
  inputId.addEventListener("keyup", function onEvent(e) {
    if (e.keyCode === 13) {
      alert("Enter press on tasks...");
    }
  });
};
