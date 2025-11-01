const API_KEY = "ecbfeb6a79825fdfe9839b9cf485df9f";
const weatherContainer = document.querySelector(".weather-container");
const message = document.querySelector(".message");

async function getWeather(city) {
  try {
    showLoading("Fetching weather data...");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    showWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

function showWeather(data) {
  message.textContent = "";
  weatherContainer.innerHTML = `
    <h2>${data.name}</h2>
    <p>🌡️ Temperature: ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌤️ Condition: ${data.weather[0].description}</p>
  `;
}

function showLoading(text) {
  message.textContent = text;
  weatherContainer.innerHTML = "";
}

function showError(text) {
  message.textContent = "⚠️ " + text;
  weatherContainer.innerHTML = "";
}

async function getWeatherByLocation() {
  if (!navigator.geolocation) {
    showError("Geolocation not supported in this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        showLoading("Fetching location-based weather...");
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather for your location.");
        }

        const data = await response.json();
        showWeather(data);
      } catch (error) {
        showError(error.message);
      }
    },
    (error) => {
      showError("Location access denied. Please allow location access.");
    }
  );
}

getWeatherByLocation();
