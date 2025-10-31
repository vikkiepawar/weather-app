const API_KEY = "ecbfeb6a79825fdfe9839b9cf485df9f";

async function getWeatherData() {
  const city = document.getElementById("cityInput").value || "Mumbai";
  const weatherResult = document.getElementById("weatherResult");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    console.log("Weather Data:", data);

    // Extract data
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].description;
    const cityName = data.name;

    // Update HTML
    document.getElementById("cityName").textContent = `📍 ${cityName}`;
    document.getElementById("temperature").textContent = `🌡️ Temperature: ${temp}°C`;
    document.getElementById("humidity").textContent = `💧 Humidity: ${humidity}%`;
    document.getElementById("condition").textContent = `🌦️ Condition: ${condition}`;

    weatherResult.style.display = "block";

  } catch (error) {
    weatherResult.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
