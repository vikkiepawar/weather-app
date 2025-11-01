const apiKey = "ecbfeb6a79825fdfe9839b9cf485df9f";

const weatherContainer = document.querySelector("#weather");
const forecastContainer = document.querySelector("#forecast");

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    weatherContainer.innerHTML = "<p>Geolocation not supported by this browser.</p>";
  }
};

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeatherByLocation(lat, lon);
}

function error() {
  weatherContainer.innerHTML = "<p>Unable to retrieve your location. Please enter a city manually.</p>";
}

async function getWeatherByLocation(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  );
  const data = await response.json();
  displayWeather(data);
}

function displayWeather(data) {
  weatherContainer.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>${data.weather[0].description}</p>
    <p>🌡️ ${data.main.temp}°C</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
  `;
}
