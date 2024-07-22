var html;
const latitude = 40.7128;
const longitude = -74.0060;
const apiKey = "31ce3240097d0c7e5a53efae792c3a10";

  // Display the entered city name in the city list container
  const cityList = document.getElementById('cityList');
const cityItem = document.createElement("div");

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;

    cityItem.textContent = city; // Set the text content of cityItem to the entered city

    // Call the index function with the city parameter
    index(city);

    // Fetch weather data for the city

    const apiKey = "31ce3240097d0c7e5a53efae792c3a10";

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update the weather information display based on the fetched data
            const weatherInfo = document.getElementById('weatherInfo');
            if (data.main && data.main.temp) {
                weatherInfo.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp} °C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
            } else {
                console.error('Weather data structure:', data);
                weatherInfo.innerHTML = 'Weather data not available.';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

async function index(city) {

    const apiKey = "31ce3240097d0c7e5a53efae792c3a10";

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.main && data.main.temp) {
            document.getElementById('cityInput').value = data.name; // Set the value of the input field to the city name
        } else {
            console.error('Weather data structure:', data);
            document.getElementById('cityInput').value = 'City not found';
        }
    } catch (error) {
        console.error("Error fetching city data:", error);
    }
}


function displayCity(city) {
    const cityList = document.getElementById('cityList');
    const cityItem = document.createElement("div");
    cityItem.textContent = city;
    cityList.appendChild(cityItem);
}


document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;

    
    displayCity(city);

    
    index(city);

    
});

async function fetchForecast(city) {
    const apiKey = "31ce3240097d0c7e5a53efae792c3a10";
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(forecastApiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching forecast data:", error);
        return null;
    }
}

function displayForecast(forecastData) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = ''; 
    forecastData.list.slice(0, 5).forEach((forecast) => {
        const forecastBox = document.createElement('div');
        forecastBox.classList.add('forecastBox');
        forecastBox.innerHTML = `
            <h3>${forecast.dt_txt}</h3>
            <p>Temperature: ${forecast.main.temp} °C</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
            <p>Wind Speed: ${forecast.wind.speed} m/s</p>
        `;
        forecastContainer.appendChild(forecastBox);
    });
}

document.getElementById('searchButton').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;

    displayCity(city);
    index(city);

    const forecastData = await fetchForecast(city);
    if (forecastData) {
        displayForecast(forecastData);
    }
});

function displayCity(city) {
    const cityList = document.getElementById('cityList');
    cityList.innerHTML = ''; // Clear existing city list

    const cityItem = document.createElement("div");
    cityItem.textContent = city;
    cityList.appendChild(cityItem);
}