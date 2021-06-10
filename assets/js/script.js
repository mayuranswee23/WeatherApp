var key = 'afa013543942d5e89b71cb83d24b61a7'
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

//Select City Name

var populatePage = function (data){
    console.log(data)
    var city = document.getElementById("city")
    var selectedCity = data.city.name
    city.innerHTML = selectedCity


    var today = new Date();
    var date =  (today.getMonth()+1) + '/' + today.getDate() + '/' +  today.getFullYear() ;
    var currentDate = document.getElementById("currentDate")
    currentDate.innerHTML = date

    // var date = document.getElementById("currentDate")
    // var selectedDate = data.list[0].dt_txt
    // date.innerHTML = selectedDate
    
    // date.appendChild(selectedDate)
    // date.innerHTML = selectedDate
    // date.appendChild(dateText)
    // var displayDate = document.createElement('span')
    // displayDate.className = "display"
    // displayDate.textContent = selectedDate
    
    
    // var temperature = document.getElementById("currentTemperature")
    // var selectedTemp = data.list[0].main.temp
    // var tempCelsius = selectedTemp - 272.15
    // Math.floor(tempCelsius)
    // var displayTemp = document.createElement('p')
    // displayTemp.textContent = tempCelsius
    // temperature.appendChild(displayTemp)

    var temperature = document.getElementById("currentTemperature")
    var selectedTemp = data.list[0].main.temp
    var tempCelsius = selectedTemp - 272.15
    var tempFloor = Math.floor(tempCelsius)
    temperature.innerText = tempFloor
    var celsius = document.createTextNode(" °C")
    temperature.appendChild (celsius)

    var humidity = document.getElementById("currentHumidity")
    var selectedUv = data.list[0].main.humidity
    humidity.innerHTML = selectedUv
    var humidityNotation = document.createTextNode (" %")
    humidity.appendChild(humidityNotation)

    var wind = document.getElementById("currentWindSpeed")
    var selectedWind = data.list[0].wind.speed
    var windSpeed = selectedWind * 3.6
    var roundedSpeed = Math.round(windSpeed*10)/10
    wind.innerText = roundedSpeed
    var kmH = document.createTextNode(" km/h")
    wind.appendChild (kmH)

    var icon = document.getElementById("icon")
    var iconSelected = data.list[0].weather[0].icon
    var iconUrl = 'http://openweathermap.org/img/wn/'+ iconSelected +'@2x.png'
    var image = new Image ();
    image.src = iconUrl;
    icon.appendChild(image)

    //obtaining UV index from another API
    var lat = data.city.coord.lat
    var lon = data.city.coord.lon
    var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${key}`
    console.log(uvUrl)

    fetch(uvUrl)
    .then(response => response.json())
    .then(data => populateData(data));


}

function populateData (data){
    console.log(data)
    var uvIndex = document.getElementById("uvIndex")
    var selectedUv = data.current.uvi
    var uvSpan = document.createElement('span')
    uvSpan.textContent = selectedUv

    if (selectedUv <= 2){
    uvSpan.setAttribute ('id', 'uvReadingGreen')
    }
    if (selectedUv >2 && selectedUv <=5 ){
     uvSpan.setAttribute ('id', 'uvReadingYellow') 
    }
    if (selectedUv >5 && selectedUv <=7 ){
        uvSpan.setAttribute ('id', 'uvReadingOrange') 
     }
    if (selectedUv >7 && selectedUv <=10 ){
        uvSpan.setAttribute ('id', 'uvReadingRed') 
    }
    if (selectedUv >10){
        uvSpan.setAttribute ('id', 'uvReadingPurple')
        }
     uvIndex.appendChild(uvSpan)


    



}




// var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${key}`

// function getUv(cityName){
//     var uvIndex = document.getElementById("uvIndex")
//     var lat = data.city.coord.lat
//     var lon = data.city.coord.lon
//     console.log(uvUrl)
// }

//     fetch(uvUrl)
//     .then(response => response.json())
//     .then(data => populateUv(data));



    // function getData(city){
    //     var url = `https:api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
    //     fetch(url)
    //   .then((response) => response.json())
    //   .then((shark) => populatePage(shark));
    // }