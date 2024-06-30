document.addEventListener('DOMContentLoaded', function() {
    const cityForm = document.getElementById('cityForm');
    const cityInput = document.getElementById('cityInput');
    const weatherDataContainer = document.getElementById('weatherData');

    const apiKey = '458595aeca82d94d964cb28b495f779e'; 
    function fetchWeatherData(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {

                localStorage.setItem('weatherData', JSON.stringify(data));
                displayWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch weather data. Please try again.');
            });
    }

    function displayWeatherData(data) {
        console.log(data);
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15)* 9/5 + 32; 
        const windSpeed=data.wind.speed;
        const humidity=data.main.humidity;

        const weatherHTML = `
            <h2>Weather for ${cityName} ☀️</h2>
            <p>Temp: ${temperature}°F</p>
            <p>Wind: ${windSpeed} MPH</p>
            <p>Humidity: ${humidity} %</p>

        `;

        weatherDataContainer.innerHTML = weatherHTML;
    }

    cityForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (city === '') {
            alert('Please enter a city name.');
            return;
        }
        fetchWeatherData(city);
    });

    document.addEventListener('DOMContentLoaded', function() {
        const storedWeatherData = localStorage.getItem('weatherData');
        if (storedWeatherData) {
            const weatherData = JSON.parse(storedWeatherData);
            displayWeatherData(weatherData);
        }
    });
});

