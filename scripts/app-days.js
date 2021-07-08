const input = document.getElementById("city-input");
const btn = document.getElementById("btn");

const getMonth = (date) => {
    //console.log(date)
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

const getDay = (dateDay) => {
    let dayS = dateDay.getDay()
    let day

    switch(dayS){
        case 1:
            day = "Monday";
            return day;
        case 2:
            day = "Tuesday";
            return day;
        case 3:
            day = "Wednesday";
            return day;
        case 4:
            day = "Thursday";
            return day;
        case 5:
            day = "Friday";
            return day;
        case 6:
            day = "Saturday";
            return day;
        case 7:
            day = "Sunday";
            return day;
    
        default:
            break;
    }
}

const showWeather = (data) => {
    const location = data.location;
    const current = data.current;
    const forecast = data.forecast;
    const h2 = document.getElementById('weather-header');
    h2.innerHTML = `3-Days Forecast for <span class="big">${location.name}</span> in <span class="big">${location.country}</span>`;
    for(let i = 0; i < 3; i++)
    {
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');
        let unixDate = forecast.forecastday[i].date_epoch;
        let dateDay = new Date(unixDate * 1000)
        let day = getDay(dateDay)

        let date = forecast.forecastday[i].date.split("-");
        console.log(date)
        let month = getMonth(date);
        let cardInfo = `
        <div id="day-name" class="day-name">${day}</div>
        <div id="month-name" class="month-name">${month} ${date[2]}</div>
        <img src="${forecast.forecastday[i].day.condition.icon}" id="weather-icon" class="weather-icon"/>
        <div id="about-weather" class="about-weather">${forecast.forecastday[i].day.condition.text}</div>
        <div class="temp-box">
            <div id="min-temp" class="min-temp">${forecast.forecastday[i].day.mintemp_c.toFixed(0)}°C</div>
            <div id="actual-temp" class="actual-temp">${forecast.forecastday[i].day.avgtemp_c.toFixed(0)}°C</div>
            <div id="max-temp" class="max-temp">${forecast.forecastday[i].day.maxtemp_c.toFixed(0)}°C</div>
        </div>
        <div class="temp-info-box">
            <div class="low">Min</div>
            <div class="now">Average</div>
            <div class="high">Max</div>
        </div>
        <div id="humidity" class="humidity">Humidity: ${forecast.forecastday[i].day.avghumidity.toFixed(0)}%</div>
        <div id="wind-speed" class="wind-speed">Wind Speed: ${forecast.forecastday[i].day.maxwind_mph.toFixed(0)}mph</div>`;
        weatherCard.innerHTML = cardInfo;
        document.getElementById('weather-cards').appendChild(weatherCard)
    }
}

const getWeather = () => {
    let city = input.value;
    console.log(city)
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${config.apikey}&q=${city}&days=10&aqi=no&alerts=no`;
    fetch(url)
    .then( res => res.json() )
    .then( data => showWeather(data) )
    .catch(err => alert("Wrong city name"))
}

btn.addEventListener('click', getWeather)
