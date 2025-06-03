const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

function displayWeather(data) {
  document.getElementById('cityName').textContent = data.name;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('temp').textContent = (data.main.temp - 273.15).toFixed(1);
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('wind').textContent = data.wind.speed;
  document.getElementById('weatherResult').classList.remove('d-none');
  document.getElementById('errorMsg').textContent = '';
}

function showError(msg) {
  document.getElementById('weatherResult').classList.add('d-none');
  document.getElementById('errorMsg').textContent = msg;
}

async function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return showError('Please enter a city name.');

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    if (data.cod === 200) displayWeather(data);
    else showError('City not found!');
  } catch (err) {
    showError('Unable to fetch data.');
  }
}

async function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();
        if (data.cod === 200) displayWeather(data);
        else showError('Location not found!');
      } catch (err) {
        showError('Failed to get location weather.');
      }
    }, () => {
      showError('Location access denied.');
    });
  } else {
    showError('Geolocation not supported.');
  }
}
