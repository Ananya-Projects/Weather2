const apiKey = "94c69cb1deef1377532a4ce758f8875f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card")
const textin = document.querySelector(".text")

weatherIcon.classList.remove("rotate", "rainfall","mist-fade","cloud-move","drizzle-drop","snowfall","haze-blur")

async function checkWeather(city){
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === 200) {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
            document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
            document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

            if(data.weather[0].main === "Clouds"){
                weatherIcon.src = "images/clouds.png";
                card.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
                weatherIcon.classList.add("cloud-move");
                textin.innerHTML = "It's a cloudy day. Stay cozy! ☁️";
            } 
            else if(data.weather[0].main === "Clear"){
                weatherIcon.src = "images/clear.png";
                card.style.background = "linear-gradient(135deg, #Fdb813, #Ff914d)";
                weatherIcon.classList.add("rotate");
                textin.innerHTML = "The sun is shining bright! ☀️";
            } 
            else if(data.weather[0].main === "Rain"){
                weatherIcon.src = "images/rain.png";
                card.style.background = "linear-gradient(135deg, #667db6, #0082c8, #667db6)";
                weatherIcon.classList.add("rainfall");
                textin.innerHTML = "Don't forget your umbrella! 🌧️";
            } 
            else if(data.weather[0].main === "Drizzle"){
                weatherIcon.src = "images/drizzle.png";
                card.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
                weatherIcon.classList.add("drizzle-drop");
                textin.innerHTML = "Light rain outside. Grab a hoodie! 🌦️";
            } 
            else if(data.weather[0].main === "Mist"){
                weatherIcon.src = "images/mist.png";
                card.style.background = "linear-gradient(135deg, #B2B8C2, #F0F2F0)";
                weatherIcon.classList.add("mist-fade");
                textin.innerHTML = "Foggy view ahead. Drive safely! 🌫️";
            } 
            else if(data.weather[0].main === "Snow"){
                weatherIcon.src = "images/snow.png";
                card.style.background = "linear-gradient(135deg, #E6E9F0, #EEF1F5)";
                weatherIcon.classList.add("snowfall");
                textin.innerHTML = "Snow is falling! Time for some hot cocoa. ❄️";
            }
            else if(data.weather[0].main === "Haze"){
                weatherIcon.src = "images/haze.png";
                card.style.background = "linear-gradient(135deg, #B2B8C2, #C2C2C2)";
                weatherIcon.classList.add("haze-blur");
                textin.innerHTML = "Hazy skies today. Air quality might be low. 😷";
            }
        } 
        else {
            alert("City not found. Please enter a valid city name.");
        }
    } 
    catch (error) {
        console.error('Error fetching weather data:', error);
        alert("Failed to retrieve weather data. Please try again.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim(); 
    if (city) {
        checkWeather(city); 
    } 
    else {
        alert("Please enter a city name.");
    }
});