// GET CURRENT POSITION
const success = (position) => {
    const currentPosition = {
        lat: position.coords.latitude,
        lon:position.coords.longitude
    };
    fetchData(currentPosition)
    .then((response) => {
        displayResults(response);
    });
};


// FETCH WEATHER DATA
const fetchData = async ( position ) => {
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: position.lat,
            lon: position.lon,
            appid: '599f9ab00f5ffd6eeb1a6bf54606a714'
        }
    });
    return response.data;
};

// DISPLAY RESULTS
const displayResults = (data) => {
    console.log(data);
    //update dom
    const { description, icon } = data.weather[0];
    const { temp } = data.main;

    const city = document.querySelector('.location-city');
    const weatherIcon = document.querySelector('#weather-icon');
    const temperature = document.querySelector('.temperature-degree');
    const summary = document.querySelector('.temperature-description');
    const tempBtn = document.querySelector('.temperature');
    //add F
    const tempC = Math.round(temp - 273);
    city.textContent = data.name;
    weatherIcon.innerHTML = 
    `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">`;
    temperature.textContent = tempC;
    summary.textContent = description;


}

// AUTOMATIC
navigator.geolocation.getCurrentPosition(success);

// CITY INPUT