function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = `6c24b098b2bd19340ed515f93a30a1a9`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row mb-3">`;

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col px-3">
          <div class="card border-0">
            <h4 class="card-title fs-5" id="forecast-day">${day}</h4>
              <p class="fs-2">
                ☀️ <br />
                <span class="forecastTemperatures">
                  <span class="maxTemp">26˚ </span>
                  <span class="minTemp">12˚</span>
                </span>
              </p>
          </div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemp(response) {
  console.log(response.data);
  celciusTemp = response.data.main.temp;

  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celciusTemp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);

  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let form = document.querySelector("#enter-city-form");
form.addEventListener("submit", activateForm);

function search(city) {
  let apiKey = `6c24b098b2bd19340ed515f93a30a1a9`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

function activateForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitLink = (celciusTemp * 9) / 5 + 32;
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(fahrenheitLink);
}

let celciusTemp = null;

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelcius);

function showCelcius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(celciusTemp);
}
