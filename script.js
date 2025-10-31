const API_KEY = "ecbfeb6a79825fdfe9839b9cf485df9f";

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    console.log("Weather Data:", data); 

  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}

getWeather("Mumbai");
