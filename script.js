const API_KEY = "ecbfeb6a79825fdfe9839b9cf485df9f";

async function getWeather(city) {
  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!weatherResponse.ok) throw new Error("City not found");

    const weatherData = await weatherResponse.json();
    displayWeather(weatherData);

    getForecast(city);
  } catch (error) {
    document.getElementById("weather").innerHTML = `<p class="error">${error.message}</p>`;
  }
}

async function getForecast(city) {
  try {
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!forecastResponse.ok) throw new Error("Forecast data not available");

    const forecastData = await forecastResponse.json();
    displayForecast(forecastData);
  } catch (error) {
    document.getElementById("forecast").innerHTML = `<p class="error">${error.message}</p>`;
  }
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weather");
  const { name, main, weather } = data;

  weatherDiv.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
    <p><strong>Condition:</strong> ${weather[0].description}</p>
  `;
}

function displayForecast(data) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "<h3>5-Day Forecast</h3>";

  const dailyData = {};

  data.list.forEach((entry) => {
    const date = new Date(entry.dt_txt).toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(entry.main.temp);
  });

  for (const [date, temps] of Object.entries(dailyData)) {
    const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
    forecastDiv.innerHTML += `
      <div class="forecast-card">
        <p class="date">${date}</p>
        <p>${avgTemp}°C</p>
      </div>
    `;
  }
}

getWeather("Mumbai");

