const apikey = "5d50cb77a4d850371ce5a430e31c9b24";
const weatherDataEl = document.getElementById("weather-data");
//const weatherDataEl = document.querySelector("weather-data");//不成功，只能getElementById
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

const getWeatherData = async (cityValue) => {
  console.log("city: ", cityValue);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("network response failed");
    }

    const data = await response.json(); //转raw数据
    console.log("data: ", data);

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed}m/s`,
    ];

    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon"/>`;
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature} C`;
    weatherDataEl.querySelector(".description").textContent = `${description}`;
    //details里面的每一个ITEM
    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join(""); //MAP返回的还是一个new array,所以用JOIN合成一个string.
  } catch (error) {}
};

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;

  getWeatherData(cityValue);
});
