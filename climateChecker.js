const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const details = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
let isCelsius = true;
let currentTemp;

const fetchWeatherData = (city) => {
  const APIKey = "6365f55b9623b8760b65d3408ada0993";

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        error404.style.visibility = "visible";
        weatherBox.style.visibility = "hidden";
        details.style.visibility = "hidden";
        return;
      }

      container.style.height = "550px";
      error404.style.visibility = "hidden";
      weatherBox.style.visibility = "visible";
      details.style.visibility = "visible";

      const image = document.querySelector(".weather-box img");
      const temp = document.querySelector(".weather-box .temp");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Mist":
        case "Haze":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "images/cloud.png";
      }

      currentTemp = parseInt(json.main.temp);
      temp.innerHTML = `${currentTemp}<span class="celsius">°C</span><span class="farenheit">°F</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed} Km/h`;

      const celsius = document.querySelector(".celsius");
      const farenheit = document.querySelector(".farenheit");

      celsius.style.opacity = 1;
      farenheit.style.opacity = 0.5;

      celsius.addEventListener("click", () => {
        if (!isCelsius) {
          temp.firstChild.nodeValue = currentTemp;
          celsius.style.opacity = 1;
          farenheit.style.opacity = 0.5;
          isCelsius = true;
        }
      });

      farenheit.addEventListener("click", () => {
        if (isCelsius) {
          const fahrenheitTemp = parseInt((currentTemp * 9) / 5 + 32);
          temp.firstChild.nodeValue = fahrenheitTemp;
          celsius.style.opacity = 0.5;
          farenheit.style.opacity = 1;
          isCelsius = false;
        }
      });
    });
};

search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value.trim();
  fetchWeatherData(city);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = document.querySelector(".search-box input").value.trim();
    fetchWeatherData(city);
  }
});
