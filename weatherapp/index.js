
    const apiKey = '6d01b67df7f98025af8ef09616e350ce';

    function toggleMode() {
      document.body.classList.toggle('light');
    }

    function getWeather() {
      const city = document.getElementById('cityInput').value.trim();
      if (!city) {
        return alert('Please enter a city name');
      }
      fetchWeatherByCity(city);
        
    }

    function getWeatherByLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const { latitude, longitude } = pos.coords;
          fetchWeatherByCoords(latitude, longitude);
        }, () => alert('Location access denied'));
      } else {
        alert('Geolocation not supported');
      }
    }

    function fetchWeatherByCity(city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => renderWeather(data))
        .catch(() => alert('Something went wrong'));
    }

    function fetchWeatherByCoords(lat, lon) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => renderWeather(data))
        .catch(() => alert('Failed to get weather by location'));
    }

    function renderWeather(data) {
      if (data.cod !== 200) {
        document.getElementById('weatherResult').innerHTML = `<p style="color:red;">❌ ${data.message}</p>`;
        const resultBox = document.getElementById('weatherResult');
resultBox.innerHTML = `
  <div class="icon">${icon}</div>
  <p><strong>City:</strong> ${data.name}</p>
  <p><strong>Condition:</strong> ${data.weather[0].description}</p>
  <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
  <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
  <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
`;

// Trigger animation
resultBox.classList.remove("show");
void resultBox.offsetWidth; // force reflow for restart animation
resultBox.classList.add("show");

        return;
      }

      const icon = getWeatherIcon(data.weather[0].main, data.main.temp);
      document.getElementById('weatherResult').innerHTML = `
        <div class="icon">${icon}</div>
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
    }

    function getWeatherIcon(condition, temp) {
      const c = condition.toLowerCase();
      if (c.includes('clear')) return '☀️';
      if (c.includes('cloud')) return '☁️';
      if (c.includes('rain')) return '🌧️';
      if (c.includes('snow')) return '❄️';
      if (c.includes('storm') || c.includes('thunder')) return '🌩️';
      if (temp > 30) return '🔥';
      return '🌥️';
    }
  