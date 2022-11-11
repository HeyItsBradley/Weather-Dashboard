//Variable Decleratoins
var userInput = document.getElementById("userInput");
var userForm = document.getElementById("formSubmit");
var weatherApi =
  "https://api.openweathermap.org/geo/1.0/direct?q=austin&appid={key}";
var apikey = "";

//Functions

//this functions is responsible for form submision by captureing user input
function handleFormSubmit(e) {
  e.preventDefault();
  var input = userInput.value;
  fetchWeather(input);
  //make an api call with that search term and confirm data is send back
}
//functions is responsible for making api call with the user search term
function fetchWeather(city) {
  console.log(city);
  var apiCall =
    weatherApi +
    fetch(apiCall)
      .then(function (response) {
        return response.json;
      })
      .then(function (data) {
        console.log(data);
      });
}

//Event Listners
userForm.addEventListener("submit", handleFormSubmit);
