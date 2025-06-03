const apiKey = '3438e84f46d025f18d2e43fce7279ffb'; // Your API key

function displayWeather(data) {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("temp").textContent = (data.main.temp - 273.15).toFixed(1);
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("wind").textContent = data.wind.speed;

  const iconCode = data.weather[0].icon;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.getElementById("weatherResult").classList.remove("d-none");
  document.getElementById("errorMsg").textContent = "";
}

function showError(msg) {
  document.getElementById("weatherResult").classList.add("d-none");
  document.getElementById("errorMsg").textContent = msg;
}

async function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return showError("Please enter a city name.");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();
    if (data.cod === 200) {
      displayWeather(data);
    } else {
      showError("City not found!");
    }
  } catch {
    showError("Unable to fetch weather data.");
  }
}

async function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const data = await response.json();
        if (data.cod === 200) {
          displayWeather(data);
        } else {
          showError("Weather data unavailable.");
        }
      } catch {
        showError("Error getting location weather.");
      }
    }, () => {
      showError("Location access denied.");
    });
  } else {
    showError("Geolocation is not supported by your browser.");
  }
}
