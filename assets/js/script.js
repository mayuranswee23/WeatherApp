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

    //obtaining index from another API
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

    
     var dayOne = document.getElementById("dayOneDate")
     var today = new Date();
     var date =  (today.getMonth()+1) + '/' + (today.getDate()+1) + '/' +  today.getFullYear() ;
    dayOne.innerHTML = date
    // dayOne.appendChild(date)

    var dayOneIcon = document.getElementById("dayOneIcon")
    var dayOneSelectedIcon = data.daily[1].weather[0].icon
    var dayOneIconUrl = 'http://openweathermap.org/img/wn/'+ dayOneSelectedIcon +'@2x.png'
    var dayOneimage = new Image ();
    dayOneimage.src = dayOneIconUrl;
    dayOneIcon.appendChild(dayOneimage)

    var dayOneTemp = document.getElementById("dayOneTemp")
    var selectedDayOneTemp = data.daily[1].temp.day
    var dayOneCelsius = selectedDayOneTemp - 272.15
    var tempDayOneFloor = Math.floor(dayOneCelsius)
    dayOneTemp.innerText = tempDayOneFloor
    var doCelsius = document.createTextNode(" °C")
    dayOneTemp.appendChild (doCelsius)

    var dayOneWind = document.getElementById("dayOneWind")
    var dayOneSelectedWind = data.daily[1].wind_speed
    var dayOneWindSpeed = dayOneSelectedWind * 3.6
    var dayOneRoundedSpeed = Math.round(dayOneWindSpeed*10)/10
    dayOneWind.innerText = dayOneRoundedSpeed
    var dayOneKmh = document.createTextNode(" km/h")
    dayOneWind.appendChild (dayOneKmh)


    var dayOneHumidity = document.getElementById("dayOneHumidity")
    var selectedDayOneHumidity = data.daily[1].humidity
    dayOneHumidity.innerHTML = selectedDayOneHumidity
    var humidityNotation = document.createTextNode (" %")
    dayOneHumidity.appendChild(humidityNotation)


}


// var wind = document.getElementById("currentWindSpeed")
// var selectedWind = data.list[0].wind.speed
// var windSpeed = selectedWind * 3.6
// var roundedSpeed = Math.round(windSpeed*10)/10
// wind.innerText = roundedSpeed
// var kmH = document.createTextNode(" km/h")
// wind.appendChild (kmH)






    