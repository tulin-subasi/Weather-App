/*⏰Feature #1
In your project, display the current date and time using JavaScript: Tuesday 16:00
*/

let day = document.querySelector("p#current-day-time.day_time");
let current = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[current.getDay()];
//console.log(currentDay);
//console.log(day);
let currentHour = current.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = current.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
day.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

/*
🕵️‍♀️Feature #2
Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
*/

let frm = document.querySelector("#form-search");

let cityInput = document.querySelector("#search-btn");
console.log(cityInput);

function showCityTemp(response) {
  console.log(response.data.main.temp);
  let temperature = Math.floor(response.data.main.temp);
  let heading = document.querySelector("h1");
  heading.innerHTML = `${temperature}`;
}

function writeCity(input) {
  input.preventDefault();
  let city = document.querySelector("#search");
  input = city.value;
  let currentCity = document.querySelector("#location");
  currentCity.innerHTML = `${input}`;

  let apiKey = "29adcafc0b9fced5934f93a3b452d5af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemp);
}
frm.addEventListener("submit", writeCity);
cityInput.addEventListener("click", writeCity);

/*
🙀Bonus Feature
Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
*/
let temperature = document.querySelector("#temp");

let cel = document.querySelector("#C");
let fah = document.querySelector("#F");

let celsius = 33;

function C(temp) {
  temp.preventDefault();

  temperature.innerHTML = `${celsius}`;
}

function F(temp) {
  temp.preventDefault();
  let fahrenheit = (`${celsius}` * 9) / 5 + 32;
  temperature.innerHTML = `${fahrenheit}`;
}

cel.addEventListener("click", C);
fah.addEventListener("click", F);

/*Add a Current Location button. 
When clicking on it, it uses the Geolocation API 
to get your GPS coordinates and display and the city 
and current temperature using the OpenWeather API.
*/

let axios = require("axios").default;

let btn = document.querySelector("#current");

/* function location(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  return loc;
}
*/
function showTemp(response) {
  let temperature = Math.floor(response.data.main.temp);
  let heading = document.querySelector("h1");
  heading.innerHTML = `${temperature}`;

  let currentCity = document.querySelector("#location");

  console.log(response.data.name);
  currentCity.innerHTML = `${response.data.name}`;
}

function currentPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "29adcafc0b9fced5934f93a3b452d5af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
  //console.log(position.name);

  //let loc = new google.maps.LatLng(lat, lon);
}

function loc(request) {
  request.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

btn.addEventListener("click", loc);
