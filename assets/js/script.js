var key = '27da8b73e6fb1d73f946f7ce7ad0c662'
var url = `api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`
var city = document.getElementById("cityName").value
// when a user inputs a city name and press the button, the city name and weather will appear 

var getCityName = document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();
    var cityName = document.getElementById("cityName").value
    console.log(cityName)
})

var getData = function (){
    fetch(`https:api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`)
    .then((response)=>response.json())
    .then((data)=>populatePage(data))
    console.log(data)
}

getData(cityName)

