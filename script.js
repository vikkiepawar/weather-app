const API_KEY = "ecbfeb6a79825fdfe9839b9cf485df9f";

const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error-message");
const weatherInfoEl = document.getElementById("weather-info");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

async function getWeather(city) {
  try {
    loadingEl.style.display = "block";
    errorEl.style.display = "none";
    weatherInfoEl.innerHTML = "";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

  
    weatherInfoEl.innerHTML = `
      <h2>${data.name}</h2>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌤️ Condition: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    errorEl.textContent = error.message;
    errorEl.style.display = "block";
  } finally {
    loadingEl.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});
