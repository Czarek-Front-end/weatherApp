const input = document.querySelector('input');
const btn = document.querySelector('button');
const cityHeading = document.querySelector('.city-heading');
const header = document.querySelector('.header')

const warning = document.querySelector('.warning');
const weatherImg = document.querySelector('.weather-image');
const tempHeading = document.querySelector('.temp-heading');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const temperatureFeels = document.querySelector('.temperature-feels');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=853a311741558e551a4f3929d06f0e8c';
const units = '&units=metric';
const language = '&lang=pl';

let city;
let url;


const getWeather = () => {
    city = (!input.value) ? 'Warszawa' : input.value;
    url = apiLink + city + apiKey + units + language;

    axios.get(url) 
    .then(res => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        const tempFeels = res.data.main.feels_like;
        const status = Object.assign({}, ...res.data.weather)

        cityHeading.textContent = res.data.name;
        tempHeading.textContent = Math.floor(temp) + '°C';
        weather.textContent = status.main;
        temperature.textContent = Math.floor(temp) + '°C';
        temperatureFeels.textContent = Math.floor(tempFeels) + '°C';
        humidity.textContent = hum + '%';
        warning.textContent = '';
        input.value = '';

        
        if (status.id >= 200 && status.id < 300) {
            weatherImg.setAttribute('src', 'img/thunderstorm.svg');
            header.style.background = 'linear-gradient(180deg, rgba(17,41,74,1) 0%, rgba(17,70,132,1) 100%)';
            weather.textContent = 'Burza'
            btn.style.background = '#112E54';
        } else if (status.id >= 300 && status.id < 400){
            weatherImg.setAttribute('src', 'img/rainy.svg');
            header.style.background = 'linear-gradient(180deg, rgba(13,35,70,1) 0%, rgba(88,117,162,1) 100%)';
            weather.textContent = 'Mżawka'
            btn.style.background = '#3E5982';
        } else if (status.id >= 500 && status.id < 600){
            weatherImg.setAttribute('src', 'img/rainy.svg');
            header.style.background = 'linear-gradient(180deg, rgba(27,50,88,1) 0%, rgba(88,117,162,1) 100%)';
            weather.textContent = 'Deszczowo'
            btn.style.background = '#3E5982';
        } else if (status.id >= 600 && status.id < 700){
            weatherImg.setAttribute('src', 'img/snow.svg');
            header.style.background = 'linear-gradient(180deg, rgba(12,75,147,1) 0%, rgba(66,134,203,1) 100%)';
            weather.textContent = 'Śnieg'
            btn.style.background = '#286AB0';
        } else if (status.id >= 700 && status.id < 800){
            weatherImg.setAttribute('src', 'img/mist.svg');
            header.style.background = 'linear-gradient(180deg, rgba(123,123,123,1) 0%, rgba(203,203,203,1) 100%)';
            weather.textContent = 'Mgła'
            btn.style.background = '#ABABAB';
        } else if (status.id === 800){
            weatherImg.setAttribute('src', 'img/sunny.svg');
            header.style.background = 'linear-gradient(180deg, rgba(253,210,125,1) 0%, rgba(252,182,125,1) 100%)';
            weather.textContent = 'Słonecznie'
            btn.style.background = '#FCBF7D';
        } else if (status.id >= 801 && status.id < 900) {
            weatherImg.setAttribute('src', 'img/cloud.svg');
            header.style.background = 'linear-gradient(180deg, rgba(13,35,70,1) 0%, rgba(88,117,162,1) 100%)';
            weather.textContent = 'Pochmurno'
            btn.style.background = '#3E5982';
        }
    })
    .catch(() => 
        warning.textContent = 'Wpisz poprawną nazwę miasta'
    )
};
getWeather();
btn.addEventListener('click', getWeather);