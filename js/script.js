// Your OpenWeatherMap API key
const API_KEY = 'your_openweathermap_api_key';

// Function to fetch weather data
async function fetchWeather(time) {
    const location = 'New York City';
    const date = '2024-11-28'; // Fixed for the itinerary
    const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=imperial`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        // Filter weather data by time of the day
        const weatherData = data.list.find(entry => entry.dt_txt.includes(`${date} ${time}`));
        if (weatherData) {
            return {
                description: weatherData.weather[0].description,
                temp: Math.round(weatherData.main.temp) + '°F',
            };
        }
        return { description: 'No data', temp: '--' };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return { description: 'Error', temp: '--' };
    }
}

// Function to update the weather for each itinerary item
async function updateWeather() {
    const itineraryItems = document.querySelectorAll('.itinerary');

    for (const item of itineraryItems) {
        const time = item.getAttribute('data-time');
        const weatherDiv = item.querySelector('.weather');

        // Fetch weather data
        const weather = await fetchWeather(time);
        weatherDiv.textContent = `${weather.description}, ${weather.temp}`;
    }
}

// Update weather on page load
updateWeather();
