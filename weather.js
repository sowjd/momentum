const weather = document.querySelector(".js-weather");
const Coords = "Coords";
const API_KEY = "YOUR_API_KEY_HERE";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(res){
        return res.json();
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}℃ @${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(Coords, JSON.stringify(coordsObj));
}

function handleGetGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGetGeoFail(err) {
    console.log("Cannot get Coords.");
    console.log(err);
}

function getCoords() {
    navigator.geolocation.getCurrentPosition(handleGetGeoSuccess, handleGetGeoFail);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(Coords);

    if (loadedCoords === null) {
        getCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();