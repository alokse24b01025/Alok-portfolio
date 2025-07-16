const apiKey = "YOUR_API_KEY"; // Replace with your actual OpenWeatherMap API key
const locationEl = document.getElementById("location");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const iconEl = document.getElementById("icon");

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => updateWeather(data))
    .catch((err) => alert("City not found"));
}

function updateWeather(data) {
  locationEl.textContent = `${data.name}, ${data.sys.country}`;
  temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionEl.textContent = data.weather[0].description;
  iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// Auto-toggle theme
document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Optional: Get user's location weather
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => updateWeather(data))
        .catch((err) => console.log("Location error"));
    });
  }
});
