// GET CURRENT POSITION
const success = (position) => {
    const currentPosition = {
        lat: position.coords.latitude,
        lon:position.coords.longitude
    };
    fetchData(currentPosition)
    .then((response) => {
        showData(response);
    });
    // add catch
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
const showData = (data) => {
    const { description, icon } = data.weather[0];
    const { temp } = data.main;
    const city = document.querySelector('.location-city');
    const weatherIcon = document.querySelector('#weather-icon');
    const temperature = document.querySelector('.temperature-degree');
    const summary = document.querySelector('.temperature-description');
    city.textContent = data.name;
    weatherIcon.innerHTML = 
    `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">`;
    summary.textContent = description;
    
    const tempBtn = document.querySelector('.temperature');
    const tempSpan = document.querySelector('.degree-section span');
    const tempC = Math.round(temp - 273);
    const tempF = Math.round((tempC * 5 / 9) + 32);
    temperature.textContent = tempC;
    tempBtn.addEventListener('click', () => {
        if(tempSpan.textContent === 'C') {
            temperature.textContent = tempF;
            tempSpan.textContent = 'F';
        } else {
            temperature.textContent = tempC;
            tempSpan.textContent = 'C'
        };
    });
};

// AUTOMATIC
navigator.geolocation.getCurrentPosition(success);

// CITY INPUT
const onInput = (input) => {
    const { value } = input.target;
    if (input != false) {
    fetchCity(value)
    .then((response) => {
        showData(response);
    });
    }
}

const debounce = (func, delay = 1000) => {
    let timeoutId;
    return(...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

const fetchCity = async (city) => {
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: '599f9ab00f5ffd6eeb1a6bf54606a714'
        }
    });
    return response.data;
};


const input = document.querySelector('input');
input.addEventListener('input', debounce(onInput));
