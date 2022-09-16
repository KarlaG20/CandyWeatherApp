// Time
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunady",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunady",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecastweather");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `         <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />
                <div class="temperatures">
                  <span class="temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
//Show temperature

function showConditions(response) {
  let tempe = document.querySelector("#temp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");

  celcious = response.data.main.temp;

  tempe.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = `: ${response.data.main.humidity}%`;
  wind.innerHTML = `: ${response.data.wind.speed}km/h`;
  description.innerHTML = response.data.weather[0].main;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

// City
function showCity(event) {
  event.preventDefault();
  //let cityInput = document.querySelector("#city-input");
  //let city = document.querySelector("#city");
  //city.innerHTML = cityInput.value;
  let apiKey = "233429df8d706a6069b522576a6dc300";
  let cityTemp = document.querySelector("#cityInput").value;
  let showCity = document.querySelector("#city");
  showCity.innerHTML = cityTemp;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTemp}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showConditions);
}

let cityForm = document.querySelector("#boton");
cityForm.addEventListener("click", showCity);

function showLocation(response) {
  console.log(response.data);
  let city = document.querySelector("#city");
  let temperatura = document.querySelector("#temp");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  celcious = response.data.main.temp;

  city.innerHTML = response.data.name;
  temperatura.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = `: ${response.data.main.humidity}%`;
  wind.innerHTML = `: ${response.data.wind.speed}km/h`;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showCoordinates(position) {
  let apiKey = "233429df8d706a6069b522576a6dc300";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocation);
}

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCoordinates);
}

let current = document.querySelector("#current");
current.addEventListener("click", showCurrent);

//F

function showFTemp(event) {
  event.preventDefault();
  let tempStart = document.querySelector("#temp");
  C_link.classList.remove("active");
  f_link.classList.add("active");
  let FTemperature = (celcious * 9) / 5 + 32;
  tempStart.innerHTML = Math.round(FTemperature);
}

function showFTempC(event) {
  event.preventDefault();
  C_link.classList.add("active");
  f_link.classList.remove("active");
  let tempStart = document.querySelector("#temp");
  tempStart.innerHTML = Math.round(celcious);
}

let f_link = document.querySelector("#F");
f_link.addEventListener("click", showFTemp);

let celcious = null;

let C_link = document.querySelector("#C");
C_link.addEventListener("click", showFTempC);
