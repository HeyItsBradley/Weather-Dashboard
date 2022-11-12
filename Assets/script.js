//VARIABLES
var userInput = document.getElementById("userInput");
var userForm = document.getElementById("formSubmit");
var cityToCords =
  " http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={API key}";
var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?";
var lat = "";
var lon = "";
var apikey = "9a971c3220d79475f9be536dd4515f62";
var apiKey2 = "f768e14492ff74a6238ecb011d8ddefc";
var inputLatAndLong = "lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
var getWeather = "http://api.openweathermap.org/data/2.5/weather?";

var getForcast = "http://api.openweathermap.org/data/2.5/forecast?";
const getDate = new Date();

let day = getDate.getDate();
let month = getDate.getMonth() + 1;
let year = getDate.getFullYear();
let date = `${month}-${day}-${year}`;
var createButtonCount = 0;
var forecastArr = [];

//FUNCTIONS

//this functions is responsible for form submision by captureing user input
function handleFormSubmit(e) {
  e.preventDefault();
  var input = userInput.value;
  fetchCityCords(input);

  //make an api call with that search term and confirm data is send back
}
//functions is responsible for making api call with the user search term
function fetchCityCords(city) {
  console.log(city);
  var getCityCords =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apikey;
  fetch(getCityCords)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data[0].lat;
      lon = data[0].lon;

      fetchCityWeather();
      fetchCityForecast();
    });
}

//this functions will take the lat and long and get the weather
function fetchCityWeather() {
  fetch(
    getWeather +
      "lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey2 +
      "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $("#cityName").text(data.name + " (" + date + ")");
      $("#tempText").text("Temp: " + data.main.temp + "°F");
      $("#windText").text("Wind:  " + data.wind.speed + "MPH");
      $("#humidityText").text("Humidity: " + data.main.humidity + "%");
      var currentCity = data.name;
      createCityButton(currentCity);
    });
}

//this functions will make a new button
function createCityButton(currentCity) {
  var createButton = document.createElement("button");
  createButton.type = "submit";
  createButton.setAttribute("class", currentCity);
  createButton.className = "my-2 col-12 btn btn-primary " + currentCity;
  createButton.id = "historyButton";
  createButton.textContent = currentCity;

  document.getElementById("history").appendChild(createButton);
  var storageName = currentCity;
  var storageContent = $("#historyButton");
  localStorage.setItem(storageName, storageContent);
  console.log($("." + currentCity));

  createButtonCount++;
}
//this will handle the history input
function handleHistorySubmit(e) {
  e.preventDefault();
  console.log(this.textContent);
  var input = this.textContent;
  fetchCityCordsFromHistory(input);
}
//this will be responsible for getting weather from history button
function fetchCityWeatherFromHistory() {
  fetch(
    getWeather +
      "lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey2 +
      "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $("#cityName").text(data.name + " (" + date + ")");
      $("#tempText").text("Temp: " + data.main.temp + "°F");
      $("#windText").text("Wind:  " + data.wind.speed + "MPH");
      $("#humidityText").text("Humidity: " + data.main.humidity + "%");
    });
}
//this will be responsible from getting city cords from history button
function fetchCityCordsFromHistory(input) {
  console.log(input);
  var getCityCords =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    input +
    "&appid=" +
    apikey;
  fetch(getCityCords)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data[0].lat;
      lon = data[0].lon;

      fetchCityWeatherFromHistory();
    });
}

function fetchCityForecast() {
  fetch(
    getForcast +
      "lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey2 +
      "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

//EVENT LISTENERS
userForm.addEventListener("submit", handleFormSubmit);

$(document).on("click", "#historyButton", handleHistorySubmit);
