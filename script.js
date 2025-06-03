const apiKey = '3438e84f46d025f18d2e43fce7279ffb';

function setWeatherTheme(temp, humi, wind, weatherMain) {
  // Reset all classes
  document.body.className = '';

  // Weather condition-based themes
  switch (weatherMain) {
    case 'Rain':
      document.body.classList.add('rainy-theme');
      return;
    case 'Snow':
      document.body.classList.add('snowy-theme');
      return;
    case 'Clouds':
      document.body.classList.add('cloudy-theme');
      return;
    case 'Clear':
      document.body.classList.add('clear-theme');
      return;
    default:
      break;
  }

  // Fallback to temperature-based themes
  if (temp <= 15) {
    document.body.classList.add('temp-cold');
  } else if (temp <= 30) {
    document.body.classList.add('temp-mild');
  } else {
    document.body.classList.add('temp-hot');
  }
}

function displayWeather(data) {
  const cityName = data.name;
  const weatherMain = data.weather[0].main;
  const description = data.weather[0].description;
  const tempC = (data.main.temp - 273.15).toFixed(1);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const iconCode = data.weather[0].icon;

  document.getElementById("cityName").textContent = cityName;
  document.getElementById("description").textContent = description;
  document.getElementById("temp").textContent = `${tempC} °C`;
  document.getElementById("humidity").textContent = `${humidity} %`;
  document.getElementById("wind").textContent = `${windSpeed} m/s`;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.getElementById("weatherResult").classList.remove("d-none");
  document.getElementById("errorMsg").textContent = "";

  setWeatherTheme(parseFloat(tempC), humidity, windSpeed, weatherMain);
}

function showError(msg) {
  document.getElementById("weatherResult").classList.add("d-none");
  document.getElementById("errorMsg").textContent = msg;
  document.body.className = '';
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
    showError("Geolocation not supported.");
  }
}
