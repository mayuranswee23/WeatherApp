var key = '2d551bf0a67809e27c38c5bc0c75da65'
// var url = `https:api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`

// when a user inputs a city name and press the button, the city name and weather will appear 

var getCityName = document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();
    var cityName = document.getElementById("cityName").value

    if(!cityName) {
        // Show error;
        window.alert('Please enter a city name!')
        return;
    }
    // console.log(cityName)
    var url = `https:api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`
    getWeather(url)
})




function getWeather (weatherApiUrl){
fetch(weatherApiUrl)
.then(response => response.json())
.then(data => populatePage(data));
}


// var getData = function (){
//     var city = document.getElementById("cityName").value
//     fetch(`https:api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`)
//     .then((response)=>response.json())
//     .then(()=>populatePage())
//     console.log(data)
// }

// getData(cityName)

var populatePage = function (data){
    console.log(data)
}