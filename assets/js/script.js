var APIkey = "ca3f6bd3972414b632534a7de05cbcbc";

var searchInput = document.querySelector("#search-text");
var searchForm = document.querySelector("#search-form");
var searchesList = document.querySelector("#search-list");

var lat 
var lon 

var city = document.getElementById("city")

var temp = document.getElementById("temp")
var humidity = document.getElementById("humidity")
var windSpeed = document.getElementById("wind-speed")

var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
	var date_time = current_date+" "+current_time;	
	document.getElementById("time-date").innerHTML = date_time;
console.log(date_time)

async function getApi() {
    var cityText = document.querySelector("#search-text").value;
    console.log(cityText)

    response = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityText + "&id=524901&units=imperial&appid=" + APIkey)

    .then(function (response) {

// var data = response.json()
response.json().then(function(data){
  // console.log(data.city.coord)
  console.log(data.city)

city.innerHTML = data.city.name

var lat = data.city.coord.lat
var lon = data.city.coord.long

fetch("api.openweathermap.org/data/2.5/forecast?lat=" + lat + lon + "&appid=" + APIkey)
.then(function (response){

  // var data = response.json()
  response.json().then(function(data){
    console.log(data)
  })
})

})})}




// //function to hold the fetch and data handling.
var todos = [];

// The following function renders items in a todo list as <li> elements
function renderTodos() {
  // Clear todoList element and update todoCountSpan
  searchesList.innerHTML = "";

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    searchesList.appendChild(li);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored todos from localStorage
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedTodos !== null) {
    todos = storedTodos;
  }
  // This is a helper function that will render todos to the DOM
  renderTodos();
}

function storeTodos() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add submit event to form
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var todoText = searchInput.value.trim();

getApi()

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;

  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  searchInput.value = "";

  // Store updated todos in localStorage, re-render the list
  storeTodos();
  renderTodos();
});



// Calls init to retrieve data and render it to the page on load
init()
