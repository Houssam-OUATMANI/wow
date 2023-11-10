// *** Récuperer le formulaire
const form = document.querySelector("form")
const input = document.querySelector("input")
const meteoHtml = document.querySelector(".meteo")
// *** Ecouter l'evenement de soumission du formulaire

// *** CLé API 
const API_KEY = "865274347f2dd120f30c1c197fa5b193"

form.addEventListener("submit", function (e) {
    e.preventDefault()
    getData(input.value)
    form.reset()
})

// *** Programme qui recupere les données méteo
async function getData(city) {
    // *** Fetch permet de faire un appel http 
     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=865274347f2dd120f30c1c197fa5b193&units=metric&lang=fr`)
     const weather = await response.json()
     displayWeather(weather)
}


// ***  Programme qui affiche les données méteo

function displayWeather(weather) {

    meteoHtml.innerHTML = `
        <h1>Données Méteo pour ${weather.name}</h1>
        <h2>Temps ${weather.weather[0].description}</h2>
        <p>Température ${Math.round(weather.main.temp)} °C </p>
        <p>Température Ressenti ${Math.round(weather.main.feels_like)} °C </p>
    `
}
// *** Geolocalisation
navigator.geolocation.getCurrentPosition(success, error)

// *** En cas de succes (l'utilisateur accepte de donner sa position GPS)
async function success(pos) {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=865274347f2dd120f30c1c197fa5b193&units=metric&lang=fr`
    const response =  await fetch(url)
    const weather = await response.json()
    displayWeather(weather)
}

// *** En cas d'erreur (l'utilisateur refuse de donner sa position GPS)

function error () {
    meteoHtml.innerHTML = "<h1>Vous avez refusé de donner votre Position <br>Entrez le nom d'une ville </h1>"
}