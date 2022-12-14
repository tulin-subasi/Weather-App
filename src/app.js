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

/*--- */

let apiKey = "29adcafc0b9fced5934f93a3b452d5af";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=istanbul&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(defaultTemp);
function defaultTemp(response) {
  console.log(response.data);
  let hum = document.querySelector("#humidity");
  let val = document.querySelector("#val");
  let wind = document.querySelector("#wind");
  let img = document.querySelector("#image");
  let heading = document.querySelector("h1");
  heading.innerHTML = `${Math.floor(response.data.main.temp)}`;
  hum.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  val.innerHTML = `${response.data.weather[0].description}`;
  img.setAttribute("src", `src/img/${response.data.weather[0].icon}.png`);
  getForecast(response.data.coord);
}

/*--- */
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

/*
Add Weather Forecast Function
*/
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row justify-content-start">`;

  forecast.forEach(function (forecastDay, index) {
    if ((index > 0) & (index < 6)) {
      forecastHTML =
        forecastHTML +
        `
                        <div class="other col-2">
                            <p class="day">
                                ${formatDay(forecastDay.dt)}
                            </p>
                            <img class="temp_img" src="src/img/${
                              forecastDay.weather[0].icon
                            }.png" alt="">
                            <div class="c">
                                <p class="temp1">
                                    ${Math.floor(forecastDay.temp.max)}°
                                </p>
                                <p class="temp2">
                                    ${Math.floor(forecastDay.temp.min)}°
                                </p>
                            </div>
                        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

/*
🕵️‍♀️Feature #2
Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
*/

function getForecast(coordinates) {
  //console.log(coordinates);
  let apiKey = "29adcafc0b9fced5934f93a3b452d5af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

let frm = document.querySelector("#form-search");

let cityInput = document.querySelector("#search-btn");
//console.log(cityInput);

let hum = document.querySelector("#humidity");
let val = document.querySelector("#val");
let wind = document.querySelector("#wind");
let img = document.querySelector("#image");

function showCityTemp(response) {
  celsius = Math.floor(response.data.main.temp);
  console.log(response.data);
  let temperature = celsius;
  let heading = document.querySelector("h1");
  heading.innerHTML = `${temperature}`;
  hum.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  val.innerHTML = `${response.data.weather[0].description}`;
  img.setAttribute("src", `src/img/${response.data.weather[0].icon}.png`);

  getForecast(response.data.coord);
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

/*Add a Current Location button. 
When clicking on it, it uses the Geolocation API 
to get your GPS coordinates and display and the city 
and current temperature using the OpenWeather API.
*/

let btn = document.querySelector("#current");

/* function location(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  return loc;
}
*/
function showTemp(response) {
  celsius = Math.floor(response.data.main.temp);
  let temperature = celsius;
  let heading = document.querySelector("h1");
  heading.innerHTML = `${temperature}`;

  let currentCity = document.querySelector("#location");
  hum.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  val.innerHTML = `${response.data.weather[0].description}`;
  img.setAttribute("src", `src/img/${response.data.weather[0].icon}.png`);

  //console.log(response.data);
  currentCity.innerHTML = `${response.data.name}`;
  getForecast(response.data.coord);
}

function currentPosition(position) {
  //console.log(position);
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
