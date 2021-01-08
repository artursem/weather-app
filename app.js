window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationCity = document.querySelector('.location-city');
    const weatherIcon = document.querySelector('#weather-icon');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=599f9ab00f5ffd6eeb1a6bf54606a714
            const myID = '599f9ab00f5ffd6eeb1a6bf54606a714';
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myID}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data=> {
                    //console.log(data);
                    const { description, icon } = data.weather[0];
                    const { temp } = data.main;
                    const tempC = Math.floor(temp - 273);
                    const name = data.name;

                    //console.log(`Pogoda w ${name}: ${weatherDescription}, temperatura: ${temp}`);


                    // Set DOM elements acc to data 
                    temperatureDegree.textContent = tempC;
                    locationCity.textContent = name;
                    temperatureDescription.textContent = description;
                    weatherIcon.innerHTML = 
                    `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">`;

                });

        });
    }; // else - nie ma lokalizacji

    
});