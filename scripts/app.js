const input = document.getElementById("city-input");
const btn = document.getElementById("btn");
const weatherCard = document.createElement('div');

const getMonth = (date) => {
    console.log(date)
    let monthS = date[1];
    let month;

    switch (monthS) {
        case '01':
            month = "January";
            return month;
        case '02':
            month = "February";
            return month;
        case '03':
            month = "March";
            return month;
        case '04':
            month = "April";
            return month;
        case '05':
            month = "May";
            return month;
        case '06':
            month = "June";
            return month;
        case '07':
            month = "July";
            return month;
        case '08':
            month = "August";
            return month;
        case '09':
            month = "September";
            return month;
        case '10':
            month = "October";
            return month;
        case '11':
            month = "November";
            return month;
        case '12':
            month = "December";
            return month;
    
        default:
            break;
    }
}

const showWeather = (data) => {
    const location = data.location;
    const current = data.current;
    const forecast = data.forecast;
    const h2 = document.getElementById('weather-header');
    h2.innerHTML = `Current Weather for <span class="big">${location.name}</span> in <span class="big">${location.country}</span>`;
    weatherCard.classList.add('weather-card');
    let date = current.last_updated.split(/-| /);
    let month = getMonth(date);
    let cardInfo = `
    <div id="day-name" class="day-name">Today</div>
    <div id="month-name" class="month-name">${month} ${date[2]}</div>
    <img src="${current.condition.icon}" id="weather-icon" class="weather-icon"/>
    <div id="about-weather" class="about-weather">${current.condition.text}</div>
    <div class="temp-box">
        <div id="min-temp" class="min-temp">${forecast.forecastday[0].day.mintemp_c.toFixed(0)}°C</div>
        <div id="actual-temp" class="actual-temp">${current.temp_c.toFixed(0)}°C</div>
        <div id="max-temp" class="max-temp">${forecast.forecastday[0].day.maxtemp_c.toFixed(0)}°C</div>
    </div>
    <div class="temp-info-box">
        <div class="low">Min</div>
        <div class="now">Now</div>
        <div class="high">Max</div>
    </div>
    <div id="humidity" class="humidity">Humidity: ${current.humidity}%</div>
    <div id="wind-speed" class="wind-speed">Wind Speed: ${current.wind_mph.toFixed(0)}mph</div>`;
    weatherCard.innerHTML = cardInfo;
    document.getElementById('weather-cards').appendChild(weatherCard)
}

const getWeather = () => {
    let city = input.value;
    console.log(city)
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${config.apikey}&q=${city}&days=3&aqi=no&alerts=no`;
    fetch(url)
    .then( res => res.json() )
    .then( data => showWeather(data) )
    .catch(err => alert("Wrong city name"))
}

btn.addEventListener('click', getWeather)
