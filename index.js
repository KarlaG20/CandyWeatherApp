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

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//Show temperature

function showConditions(response) {
  console.log(response.data);
  let tempe = document.querySelector("#temp");
  tempe.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `: ${response.data.wind.speed}km/h`;
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
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temperatura = document.querySelector("#temp");
  temperatura.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `: ${response.data.wind.speed}km/h`;
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

// F

function fTransform(event) {
  event.preventDefault();
  let tempValue = document.querySelector("#temp");
  tempValue.innerHTML = "64.4°";
}

let fTemp = document.querySelector("#F");
fTemp.addEventListener("click", fTransform);

//C

function cTransform(event) {
  event.preventDefault();
  let tempValue = document.querySelector("#temp");
  tempValue.innerHTML = "18°";
}

let cTemp = document.querySelector("#C");
cTemp.addEventListener("click", cTransform);

//showing temperature
