const apiKey = "33e72b35ba3e1846550a5aed869ccd6c";

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  
  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  getCurrentWeather(city);
  getForecast(city);
});

function getCurrentWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        document.getElementById("currentWeather").innerHTML = "City not found!";
        return;
      }

      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      document.getElementById("currentWeather").innerHTML = `
        <h2>${data.name}</h2>
        <img src="${iconUrl}" alt="Weather icon">
        <h3>${Math.round(data.main.temp)}°C</h3>
        <p>${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(() => {
      document.getElementById("currentWeather").innerHTML = "Error fetching data!";
    });
}

function getForecast(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const forecastContainer = document.getElementById("forecast");
      forecastContainer.innerHTML = "";

      const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

      dailyData.slice(0, 5).forEach(day => {
        const iconCode = day.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const date = new Date(day.dt_txt).toDateString();

        forecastContainer.innerHTML += `
          <div class="forecast-card">
            <h4>${date}</h4>
            <img src="${iconUrl}" alt="Weather icon">
            <p>${Math.round(day.main.temp)}°C</p>
            <p>${day.weather[0].description}</p>
          </div>
        `;
      });
    });
}
