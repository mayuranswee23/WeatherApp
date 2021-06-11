var key = 'afa013543942d5e89b71cb83d24b61a7'
// var url = `https:api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`

// when a user inputs a city name and press the button, the city name and weather will appear 

var getCityName = document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();
    var cityName = document.getElementById("cityName").value
    save(cityName)
    showSearchHistory()

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
    var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${key}`
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

    //day One 
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
    var dayOneCelsius = selectedDayOneTemp
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

    //day Two

    var dayTwo = document.getElementById("dayTwoDate")
    var tomorrow = new Date();
    var nextDate =  (tomorrow.getMonth()+1) + '/' + (tomorrow.getDate()+2) + '/' +  tomorrow.getFullYear() ;
   dayTwo.innerHTML = nextDate
  
   var dayTwoIcon = document.getElementById("dayTwoIcon")
   var dayTwoSelectedIcon = data.daily[2].weather[0].icon
   var dayTwoIconUrl = 'http://openweathermap.org/img/wn/'+ dayTwoSelectedIcon +'@2x.png'
   var dayTwoimage = new Image ();
   dayTwoimage.src = dayTwoIconUrl;
   dayTwoIcon.appendChild(dayTwoimage)

   var dayTwoTemp = document.getElementById("dayTwoTemp")
   var selectedDayTwoTemp = data.daily[2].temp.day
   var dayTwoCelsius = selectedDayTwoTemp
   var tempDayTwoFloor = Math.floor(dayTwoCelsius)
   dayTwoTemp.innerText = tempDayTwoFloor
   var TwoCelsius = document.createTextNode(" °C")
   dayTwoTemp.appendChild (TwoCelsius)

   var dayTwoWind = document.getElementById("dayTwoWind")
   var dayTwoSelectedWind = data.daily[2].wind_speed
   var dayTwoWindSpeed = dayTwoSelectedWind * 3.6
   var dayTwoRoundedSpeed = Math.round(dayTwoWindSpeed*10)/10
   dayTwoWind.innerText = dayTwoRoundedSpeed
   var dayTwoKmh = document.createTextNode(" km/h")
   dayTwoWind.appendChild (dayTwoKmh)

   var dayTwoHumidity = document.getElementById("dayTwoHumidity")
   var selectedDayTwoHumidity = data.daily[2].humidity
   dayTwoHumidity.innerHTML = selectedDayTwoHumidity
   var twoHumidityNotation = document.createTextNode (" %")
   dayTwoHumidity.appendChild(twoHumidityNotation)

// day three

var dayThree = document.getElementById("dayThreeDate")
    var dayAfter = new Date();
    var thirdDate =  (dayAfter.getMonth()+1) + '/' + (dayAfter.getDate()+3) + '/' +  dayAfter.getFullYear() ;
   dayThree.innerHTML = thirdDate
  
   var dayThreeIcon = document.getElementById("dayThreeIcon")
   var dayThreeSelectedIcon = data.daily[3].weather[0].icon
   var dayThreeIconUrl = 'http://openweathermap.org/img/wn/'+ dayThreeSelectedIcon +'@2x.png'
   var dayThreeimage = new Image ();
   dayThreeimage.src = dayThreeIconUrl;
   dayThreeIcon.appendChild(dayThreeimage)

   var dayThreeTemp = document.getElementById("dayThreeTemp")
   var selectedDayThreeTemp = data.daily[3].temp.day
   var dayThreeCelsius = selectedDayThreeTemp
   var tempDayThreeFloor = Math.floor(dayThreeCelsius)
   dayThreeTemp.innerText = tempDayThreeFloor
   var ThreeCelsius = document.createTextNode(" °C")
   dayThreeTemp.appendChild (ThreeCelsius)

   var dayThreeWind = document.getElementById("dayThreeWind")
   var dayThreeSelectedWind = data.daily[3].wind_speed
   var dayThreeWindSpeed = dayThreeSelectedWind * 3.6
   var dayThreeRoundedSpeed = Math.round(dayThreeWindSpeed*10)/10
   dayThreeWind.innerText = dayThreeRoundedSpeed
   var dayThreeKmh = document.createTextNode(" km/h")
   dayThreeWind.appendChild (dayThreeKmh)

   var dayThreeHumidity = document.getElementById("dayThreeHumidity")
   var selectedDayThreeHumidity = data.daily[3].humidity
   dayThreeHumidity.innerHTML = selectedDayThreeHumidity
   var threeHumidityNotation = document.createTextNode (" %")
   dayThreeHumidity.appendChild(threeHumidityNotation)


   //dayfour 
   var dayFour = document.getElementById("dayFourDate")
   var dayAfterTom = new Date();
   var fourDate =  (dayAfterTom.getMonth()+1) + '/' + (dayAfterTom.getDate()+4) + '/' +  dayAfterTom.getFullYear() ;
  dayFour.innerHTML = fourDate
  // dayOne.appendChild(date)

  var dayFourIcon = document.getElementById("dayFourIcon")
  var dayFourSelectedIcon = data.daily[4].weather[0].icon
  var dayFourIconUrl = 'http://openweathermap.org/img/wn/'+ dayFourSelectedIcon +'@2x.png'
  var dayFourimage = new Image ();
  dayFourimage.src = dayFourIconUrl;
  dayFourIcon.appendChild(dayFourimage)

  var dayFourTemp = document.getElementById("dayFourTemp")
  var selectedDayFourTemp = data.daily[4].temp.day
  var dayFourCelsius = selectedDayFourTemp
  var tempDayFourFloor = Math.floor(dayFourCelsius)
  dayFourTemp.innerText = tempDayFourFloor
  var FourCelsius = document.createTextNode(" °C")
  dayFourTemp.appendChild (FourCelsius)

  var dayFourWind = document.getElementById("dayFourWind")
  var dayFourSelectedWind = data.daily[4].wind_speed
  var dayFourWindSpeed = dayFourSelectedWind * 3.6
  var dayFourRoundedSpeed = Math.round(dayFourWindSpeed*10)/10
  dayFourWind.innerText = dayFourRoundedSpeed
  var dayFourKmh = document.createTextNode(" km/h")
  dayFourWind.appendChild (dayFourKmh)

  var dayFourHumidity = document.getElementById("dayFourHumidity")
  var selectedDayFourHumidity = data.daily[4].humidity
  dayFourHumidity.innerHTML = selectedDayFourHumidity
  var fourHumidityNotation = document.createTextNode (" %")
  dayFourHumidity.appendChild(fourHumidityNotation)


  //day five
  var dayFifth = document.getElementById("dayFiveDate")
   var dayFive = new Date();
   var fiveDate =  (dayFive.getMonth()+1) + '/' + (dayFive.getDate()+5) + '/' +  dayFive.getFullYear() ;
  dayFifth.innerHTML = fiveDate
  // dayOne.appendChild(date)

  var dayFiveIcon = document.getElementById("dayFiveIcon")
  var dayFiveSelectedIcon = data.daily[5].weather[0].icon
  var dayFiveIconUrl = 'http://openweathermap.org/img/wn/'+ dayFiveSelectedIcon +'@2x.png'
  var dayFiveimage = new Image ();
  dayFiveimage.src = dayFiveIconUrl;
  dayFiveIcon.appendChild(dayFiveimage)

  var dayFiveTemp = document.getElementById("dayFiveTemp")
  var selectedDayFiveTemp = data.daily[5].temp.day
  var dayFiveCelsius = selectedDayFiveTemp
  var tempDayFiveFloor = Math.floor(dayFiveCelsius)
  dayFiveTemp.innerText = tempDayFiveFloor
  var FiveCelsius = document.createTextNode(" °C")
  dayFiveTemp.appendChild (FiveCelsius)

  var dayFiveWind = document.getElementById("dayFiveWind")
  var dayFiveSelectedWind = data.daily[5].wind_speed
  var dayFiveWindSpeed = dayFiveSelectedWind * 3.6
  var dayFiveRoundedSpeed = Math.round(dayFiveWindSpeed*10)/10
  dayFiveWind.innerText = dayFiveRoundedSpeed
  var dayFiveKmh = document.createTextNode(" km/h")
  dayFiveWind.appendChild (dayFiveKmh)

  var dayFiveHumidity = document.getElementById("dayFiveHumidity")
  var selectedDayFiveHumidity = data.daily[5].humidity
  dayFiveHumidity.innerHTML = selectedDayFiveHumidity
  var fiveHumidityNotation = document.createTextNode (" %")
  dayFiveHumidity.appendChild(fiveHumidityNotation)


    // for (var i =1; i<6; i++){
    //     var Temp = data.daily[i].temp.day
    //     var Wind = data.daily[i].wind_speed
    //     var Humidity = data.daily[i].humidity
    //     var Icon = data.daily[i].weather[0].icon
    //     var date =  (today.getMonth()+[1]) + '/' + (today.getDate()+[i]) + '/' +  today.getFullYear() ;
    //     console.log(Temp)
    //     console.log(Wind)
    //     console.log(Humidity)
    //     console.log(date)
    // }
}


function save (newCity){
    var cityArr = JSON.parse(localStorage.getItem("savedCity")) || []
    cityArr.push(newCity)
    localStorage.setItem("savedCity", JSON.stringify(cityArr))
}

function showSearchHistory (){
    var cityList = document.querySelector(".cityList")
    cityList.innerHTML = ""
    // if there is nothing in localStorage, an array will be created
    var cityArr = JSON.parse(localStorage.getItem("savedCity")) || []
    cityArr.forEach(cityName => { 
        var cityButton = document.createElement("button")
        cityButton.textContent = cityName
        cityButton.classList.add("btn", "historyButton")
        cityList.appendChild(cityButton)
    });
}

showSearchHistory()
var historyButtons = document.querySelectorAll(".historyButton")
historyButtons.forEach(button => {
    button.addEventListener("click", function(){
        var cityText = this.textContent
        var url = `https:api.openweathermap.org/data/2.5/forecast?q=${cityText}&appid=${key}`
        getWeather(url)
    })
})   



    