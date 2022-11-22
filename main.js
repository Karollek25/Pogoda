const input = document.querySelector('input');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const windspeed = document.querySelector('.windspeed');
const feelsTemperature = document.querySelector('.feelsTemperature');
const temperature = document.querySelector('.temperature');
const temperatureDescription = document.querySelector('.temperatureDescription');
const cityName = document.querySelector('.cityName');
const date = document.querySelector('.date');
const errror = document.querySelector('.errror');
const button =document.querySelector('button');
const img = document.querySelector('img');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey ='&appid=5242cb5d72424e87b05940d3b4d9e025';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';

const chceckWeather = () => {
    const apiCity = input.value || "Barcelona";
    const URL = apiLink + apiCity + apiKey + apiUnits + apiLang;
    console.log(URL)

    axios.get(URL).then(response => {
        console.log(response.data);
        //poprawić odczytywanie godziń dla róznych stref czasowych
        temperature.textContent = `${Math.floor(response.data.main.temp)}°C`
        img.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
        temperatureDescription.textContent = `${response.data.weather[0].description}`
        date.textContent =`${new Date().toString().slice(4, 21)}`
        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`
        feelsTemperature.textContent = `${Math.floor(response.data.main.feels_like)} °C`
        pressure.textContent = `${response.data.main.pressure} hPa`
        humidity.textContent = `${response.data.main.humidity} %`
        windspeed.textContent = `${response.data.wind.speed} m/s`
        errror.textContent = '';

    }).catch(error => {
        if (error.response.data.code === '404') {
            errror.textContent ="nie ma takeigo miasta"
        }else{
            errror.textContent = "wystapił inny problem"
        }

        [cityName, temperature, feelsTemperature, temperatureDescription, 
        pressure, windspeed, humidity, date].forEach(element => {
            element.textContent = '';
        })
        img.src = '';
    }).finally( () =>{
        input.value = '';
    }

    )
}

chceckWeather()

button.addEventListener('click', chceckWeather)