
function onGeoOk(positon) {
    console.log(positon);
    const lat = positon.coords.latitude;
    const lng = positon.coords.longitude;
    const APIKEY = "4f27c3ad8f338d36bca0249b0c855f64";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APIKEY}`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            const weather = document.querySelector("#weather span:first-child")
            const city = document.querySelector("#weather span:last-child")
            weather.innerText = data.weather[0].main;
            city.innerText = data.name;
        });
}

function onGeoError() {
    alert("cant find you")
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)

