const APIkey = "ca3f6bd3972414b632534a7de05cbcbc";

// GIVEN a weather dashboard with form inputs
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#city-input");

// WHEN I search for a city
searchForm.addEventListener("submit", event => {
  event.preventDefault();

  // THEN I am presented with current and future conditions for that city and that city is added to the search history
  const city = searchInput.value.trim();
  if (city) {
    displayCurrentWeather(city);
    displayFiveDayForecast(city);
    addCityToSearchHistory(city);
  }
});

// WHEN I view current weather conditions for that city
async function displayCurrentWeather(city) {
  try {
    // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`);
    const data = await response.json();

    // Display city name
    document.querySelector("#city-name").textContent = data.name;

    // Display date
    const date = new Date();
    document.querySelector("#date").textContent = date.toDateString();

    // Display icon representing weather conditions
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.querySelector("#weather-icon").setAttribute("src", iconUrl);

    // Display temperature
    document.querySelector("#temperature").textContent = `Temperature: ${data.main.temp}°F`;

    // Display humidity
    document.querySelector("#humidity").textContent = `Humidity: ${data.main.humidity}%`;

    // Display wind speed
    document.querySelector("#wind-speed").textContent = `Wind Speed: ${data.wind.speed} mph`;
  } catch (error) {
    console.error(error);
  }
}
// WHEN I view future weather conditions for that city
async function displayFiveDayForecast(city) {
    try {
      // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIkey}`);
      const data = await response.json();
  
      // Clear any existing forecast items
      document.querySelector("#forecast-list").innerHTML = "";
  
      // Get forecast data for every 8th item (corresponds to every 3rd hour)
      for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000); // Convert Unix timestamp to JavaScript date
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
  
        // Create a new forecast item
        const forecastItem = document.createElement("li");
        forecastItem.innerHTML = `
          <div class="date">${date.toDateString()}</div>
          <img class="icon" src="${iconUrl}" />
          <div class="temp">Temperature: ${forecast.main.temp}°F</div>
          <div class="wind-speed">Wind Speed: ${forecast.wind.speed} mph</div>
          <div class="humidity">Humidity: ${forecast.main.humidity}%</div>
        `;
  
        // Append the forecast item to the forecast list
        document.querySelector("#forecast-list").appendChild(forecastItem);
      }
    } catch (error) {
      console.error(error);
    }
  }
  // Array to store search history
const searchHistory = [];

// Add a city to the search history
function addCityToSearchHistory(city) {
  searchHistory.push(city);
  // Add the city to the search history list
  const cityItem = document.createElement("li");
  cityItem.textContent = city;
  document.querySelector("#search-history").appendChild(cityItem);
}
document.querySelector("#search-history").addEventListener("click", event => {
    if (event.target.tagName === "LI") {
      const city = event.target.textContent;
      displayCurrentWeather(city);
      displayFiveDayForecast(city);
    }
  });
  

