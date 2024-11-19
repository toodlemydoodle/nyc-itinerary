async function fetchWeatherData() {
    try {
        // Load the weather.json file
        const response = await fetch('weather.json');
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error('Error loading weather data:', error);
        return {};
    }
}

async function updateWeather() {
    // Fetch weather data
    const weatherData = await fetchWeatherData();

    // Find all itinerary items
    const itineraryItems = document.querySelectorAll('.itinerary');

    itineraryItems.forEach(item => {
        // Get the time from the data-time attribute
        const time = item.getAttribute('data-time');

        // Find the weather for this time
        const weather = weatherData[time] || { description: 'No data', temp: '--' };

        // Update the weather div with the description and temperature
        const weatherDiv = item.querySelector('.weather');
        weatherDiv.textContent = `${weather.description}, ${weather.temp}`;
    });
}

// Run the updateWeather function on page load
updateWeather();
