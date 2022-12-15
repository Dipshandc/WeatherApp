// select elements
const notificationElement = document.querySelector(".notification")
const iconElement = document.querySelector(".weather-icon")
const tempElement = document.querySelector(".temperature-value p")
const descElement = document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".location p")
const humidityElement = document.querySelector(".humidity p")

//App Data
const weather = {
    temperature: {
        value: 0,
        unit: "celsius"
    },
    description: "",
    iconId: "01d",
    city: "",
    country: "",
    humidity: ""
};
// const var for app
const KELVIN = 273
const key = "82005d27a116c2880c8f0fcb866998a0"

// Check if browser supports geolocation
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)

}
else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.<p>"
}

// function to display weather
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png">`;
    tempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    humidityElement.innerHTML = `Humidity: ${weather.humidity}%`
}

// convert
function tempConversion() {
    let celsius = weather.temperature.value
    if (weather.temperature.unit === undefined) return
    else if (weather.temperature.unit === "celsius") {
        let fahrenheitTemperature = (celsius * 9 / 5) + 32;
        fahrenheitTemperature = Math.floor(fahrenheitTemperature);
        tempElement.innerHTML = `${fahrenheitTemperature} °<span>F</span>`
        weather.temperature.unit = "fahrenheit"
    }
    else {
        tempElement.innerHTML = `${celsius} °<span>C</span>`
        weather.temperature.unit = "celsius"

    }
}

function setPosition(position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    getWeather(latitude, longitude)
}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}<p>`
}

// function to get weather from api
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    console.log(api)
    fetch(api)
        .then(function (response) {
            let data = response.json()
            return data
        }).then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN)
            weather.description = data.weather[0].description
            weather.iconId = data.weather[0].icon
            weather.city = data.name
            weather.country = data.sys.country
            weather.humidity = data.main.humidity
            console.log(weather.temperature.value, weather.iconId, weather.description, weather.city, weather.country)
        })
        .then(function () {
            displayWeather()
        })
}
