const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatheritemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('time-zone');
const weatherForecastEl = document.getElementById('weather-forecast')
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const Months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
const API_Key = '015f4a43988a7d518e87347083e60a0d';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const houresIn12HrFormat = hour>=13 ? hour%12 : hour
    const minutes = time.getMinutes();
    const ampm = hour>=12 ? 'PM' : 'AM'

    timeEl.innerHTML = houresIn12HrFormat+ ':' + minutes+' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day]+', '+date+ ' '+Months[month] 
} , 1000)

getWeatherData()
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success) => {
        let {latitude , longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=
        ${latitude}&lon=${longitude}&exclude={hourly,minutely}&appid=${API_Key}`).then(res = res.json()).then(data =>{

            console.log(data);
            showWeatherData(data);
        })

    })
}
function showWeatherData()
{
    let {humidity,pressure,sunrise,sunset,wind_speed} = data.current;
    currentWeatheritemsEl.innerHTML = 
        `<div class="weather_item">
        <div>Humidity</div>
        <div>${humidity}</div>
        </div>
        <div class="weather_item">
            <div>Pressure</div>
            <div>${pressure}</div>
    </div> 
    <div class="weather_item">
            <div>Wind Speed</div>
            <div>${wind_speed}</div>
    </div>
    <div class="weather_item">
            <div>Sunrise</div>
            <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather_item">
            <div>Sunset</div>
            <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    </div>`;

    let otherDayForcast = ''
    day.daily.forEach((day , idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `

            <div class="weather-forecast-item">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="temp">Night - ${day.temp.night}&#176; C</div>
            <div class="temp">Day - ${day.temp.day}&#176; C</div>
        </div>
            `
        }else{
            otherDayForcast += `
            
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
        </div>
            `
        }

        
    });
    
    }


