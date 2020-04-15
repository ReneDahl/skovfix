window.onload = function () {
  //alert("app script loaded...");

  //calling the method open in the db file.. remember the callback as a parameter..
  todoDB.open(refreshTodos);

  // Get references to the form elements.
  var newTodoForm = document.getElementById("new-todo-form");
  var newTodoInput = document.getElementById("new-todo");

  // Handle new todo item form submissions.
  newTodoForm.onsubmit = function () {
    // Get the todo text.
    var text = newTodoInput.value;

    // Check to make sure the text is not blank (or just spaces).
    if (text.replace(/ /g, "") != "") {
      // Create the todo item.
      todoDB.createTodo(text, function (todo) {
        refreshTodos();
      });
    }

    // Reset the input field.
    newTodoInput.value = "";

    // Don't send the form.
    return false;
  };
};

function refreshTodos() {
  todoDB.fetchTodos(function (todos) {
    var todoList = document.getElementById("todo-items");
    todoList.innerHTML = "";

    for (var i = 0; i < todos.length; i++) {
      // Read the todo items backwards (most recent first).
      var todo = todos[todos.length - 1 - i];

      var li = document.createElement("li");
      li.className = "list-group-item";
      li.id = "todo-" + todo.timestamp;
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "todo-checkbox";
      checkbox.setAttribute("data-id", todo.timestamp);

      li.appendChild(checkbox);

      var span = document.createElement("span");
      span.innerHTML = todo.text;

      li.appendChild(span);

      todoList.appendChild(li);

      // Setup an event listener for the checkbox.
      checkbox.addEventListener("click", function (e) {
        var id = parseInt(e.target.getAttribute("data-id"));

        todoDB.deleteTodo(id, refreshTodos);
      });
    }
  });
}

// var submitForm = function (event) {
//   if (event.keyCode == 13) {
//     event.preventDefault();
//     return false;
//   } else {
//     alert("the form is submittet");
//   }
// };

// var inputAddTask = function (event) {
//   var inputText = document.getElementById("new-task");
//   inputText.addEventListener("keyup", function onEvent(e) {
//     if (e.keyCode === 13) {
//       inputText = document.getElementById("new-task").value;

//       todoDB.createTask(inputText);
//     }
//   });
// };
