// GET CURRENT POSITION
const currentPosition = {};
const success = (position) => {
    //console.log(position.coords.latitude, position.coords.longitude);
    currentPosition.lat = position.coords.latitude;
    currentPosition.lon = position.coords.longitude;
};

navigator.geolocation.getCurrentPosition(success);
console.log(currentPosition);
console.log(currentPosition.lat);


// FETCH WEATHER DATA
const fetchData = async ( position ) => {
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: 'London',
            // lat: position.lat,
            // lon: position.lon,
            appid: '599f9ab00f5ffd6eeb1a6bf54606a714'
        }
    });
    console.log(response.data);
    //update dom
}

//fetchData(currentPosition);