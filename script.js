const apiKey = "ecbfeb6a79825fdfe9839b9cf485df9f";

const currentWeather = document.getElementById("currentWeather");
const hourlyDiv = document.getElementById("hourly");
const weeklyDiv = document.getElementById("weekly");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const darkToggle = document.getElementById("darkToggle");

darkToggle.onclick = () => document.body.classList.toggle("dark");

navigator.geolocation.getCurrentPosition(pos => {
  fetchByCoords(pos.coords.latitude, pos.coords.longitude);
});

searchBtn.onclick = () => {
  if (cityInput.value.trim())
    fetchByCity(cityInput.value.trim());
};

async function fetchByCity(city) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
  const data = await res.json();
  fetchByCoords(data.coord.lat, data.coord.lon);
}

async function fetchByCoords(lat, lon) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
  const data = await res.json();
  showCurrent(data);
  showHourly(data);
  showWeekly(data);
  showRainChart(data);
}

function showCurrent(data) {
  const d = data.list[0];
  currentWeather.innerHTML = `
    <h2>${data.city.name}</h2>
    <img src="https://openweathermap.org/img/wn/${d.weather[0].icon}@4x.png">
    <h1>${Math.round(d.main.temp)}°C</h1>
    <p>${d.weather[0].description}</p>
  `;
}

function showHourly(data) {
  hourlyDiv.innerHTML = "";
  data.list.slice(0, 8).forEach(h => {
    hourlyDiv.innerHTML += `
      <div class="glass">
        <p>${h.dt_txt.split(" ")[1]}</p>
        <p>${Math.round(h.main.temp)}°C</p>
      </div>`;
  });
}

function showWeekly(data) {
  weeklyDiv.innerHTML = "";
  const days = data.list.filter(i => i.dt_txt.includes("12:00"));
  days.forEach(d => {
    weeklyDiv.innerHTML += `
      <div class="glass">
        <p>${d.dt_txt.split(" ")[0]}</p>
        <p>${Math.round(d.main.temp)}°C</p>
      </div>`;
  });
}

function showRainChart(data) {
  const labels = data.list.slice(0, 8).map(i => i.dt_txt.split(" ")[1]);
  const rain = data.list.slice(0, 8).map(i => i.pop * 100);

  new Chart(document.getElementById("rainChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Rain Probability %",
        data: rain,
        borderColor: "#00c6ff",
        fill: false
      }]
    }
  });
}
