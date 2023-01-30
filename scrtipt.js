var key = "be3a1c546ba346651be769db457cb1b7";

var button = document.querySelector("#searchBtn");
var inputValue = document.querySelector("search-bar");
var currentCard = document.querySelector("#currentCard");
var forecastBox = document.querySelector("#forecast-box");



function getLatLng(city) {
  var geo =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=be3a1c546ba346651be769db457cb1b7";
  fetch(geo)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;

      getCurrent(lat, lon);
    });
}

function getCurrent(lat, lon) {
  var forecast =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&appid=" +
    key;
  fetch(forecast)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var cardDiv = document.createElement("div");
      cardDiv.setAttribute("class", "card");

      var titleEl = document.createElement("h2");
      titleEl.setAttribute("class", "card-title");
      titleEl.textContent = data.name;

      var tempEl = document.createElement("p");
      tempEl.textContent = "Temperature: " + data.main.temp + " °F ";

      var humidityEl = document.createElement("p");
      humidityEl.textContent = "Humidity: " + data.main.humidity + " % ";

      var windEl = document.createElement("p");
      windEl.textContent = "Wind: " + data.wind.speed + " mph ";

      cardDiv.appendChild(titleEl);
      cardDiv.appendChild(tempEl);
      cardDiv.appendChild(humidityEl);
      cardDiv.appendChild(windEl);

      currentCard.appendChild(cardDiv);
    });
  console.log(lat, lon);
  getForecast(lat, lon);
}
function getForecast(lat, lon) {
  console.log(lat, lon);
  var forecast =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&appid=" +
    key;
  fetch(forecast)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      
      for (var i = 0; i < data.list.length; i++) {
        var targetDate = data.list[i].dt_txt.split(" ")[1];
        if (targetDate === "12:00:00") {
          
          console.log(data.list[i]);

          var cardDiv = document.createElement("div");
          cardDiv.setAttribute("class", "card");

          var titleEl = document.createElement("h2");
          titleEl.setAttribute("class", "card-title");
          titleEl.textContent = data.city.name;

          var tempEl = document.createElement("p");
          tempEl.textContent = "Temperature: " + data.list[i].main.temp + " °F ";

          var humidityEl = document.createElement("p");
          humidityEl.textContent ="Humidity: " + data.list[i].main.humidity + " % " ;

          var windEl = document.createElement("p");
          windEl.textContent = "Wind: " + data.list[i].wind.speed + " mph ";

          cardDiv.appendChild(titleEl);
          cardDiv.appendChild(tempEl);
          cardDiv.appendChild(humidityEl);
          cardDiv.appendChild(windEl);

          forecastBox.appendChild(cardDiv);
        }
      }
    });
}

button.addEventListener("click", function () {
  var city = document.querySelector(".search-bar").value;
  getLatLng(city);
});
