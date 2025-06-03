const apiKey = '3438e84f46d025f18d2e43fce7279ffb';

function setWeatherTheme(temp, humi, wind) {
  // Clear previous classes first
  document.body.className = '';

  // Apply temperature classes
  if (temp <= 15) {
    document.body.classList.add('temp-cold');
  } else if (temp <= 30) {
    document.body.classList.add('temp-mild');
  } else {
    document.body.classList.add('temp-hot');
  }

  // Apply humidity classes
  if (humi < 40) {
    document.body.classList.add('humi-low');
  } else if (humi <= 70) {
    document.body.classList.add('humi-moderate');
  } else {
    document.body.classList.add('humi-high');
  }

  // Apply wind classes
  if (wind < 2) {
    document.body.classList.add('wind-calm');
  } else if (wind <= 5) {
    document.body.classList.add('wind-breezy');
  } else {
    document.body.classList.add('wind-windy');
  }
}

function displayWeather(data) {
  const cityName = data.name;
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

  setWeatherTheme(parseFloat(tempC), humidity, windSpeed);
}

function showError(msg) {
  document.getElementById("weatherResult").classList.add("d-none");
  document.getElementById("errorMsg").textContent = msg;
  document.body.className = ''; // reset background and color classes
}
