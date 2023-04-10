var cityFormEl = document.querySelector('#city-form');
var recentButtonsEl = document.querySelector('#recent-cities-buttons');
var cityInputEl = document.querySelector('#cityname');
var currentweatherContainerEl = document.querySelector('#current-weather-container');
var citySearchTerm = document.querySelector('#city-search-term');
// const city = document.getElementById('city');

var APIKKey = "4e82548e9a516fc5ec14f1ab6d4a2c48"



// function to get weather data from openweathermap api when user searches for a city

var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var cityname = cityInputEl.value.trim();


        getCityWeather(cityname);

        currentweatherContainerEl.textContent = '';
        cityInputEl.value = '';
    } 

// button click handler for recent searches

var buttonClickHandler = function(event) {
    var cityname = event.target.getAttribute('data-cityname');

    // if cityname exists, get weather data for that city

        getCityWeather(cityname);
        // clear old content
        currentweatherContainerEl.textContent = '';
};

// function to get weather data from openweathermap api

var getCityWeather = function(cityname) {
    // format the openweathermap api url
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=" + APIKKey;
    // declare cityname variable
    var cityname = cityname;

    // make a request to the url
    fetch(queryURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(queryURL);
        console.log(data.main.temp);

        // call on displayWeather function
        displayWeather(data, cityname);
        // get latitude and longitude data from response
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        getFiveDayForecast(lat, lon, cityname);

        // check if cityname already exists in recent search buttons
        var existingButton = document.querySelector(`button[data-cityname="${cityname}"]`);
        if (!existingButton) {
            // append data attributes to recent search buttons
            // save cityname to localStorage
            localStorage.setItem('cityname', cityname);
            // create button for recent search and set data attribute to cityname and text to cityname with a class of btn
            var recentButton = document.createElement('button');
            recentButton.setAttribute('data-cityname', cityname);
            recentButton.textContent = cityname;
            recentButton.classList.add('btn');
            recentButtonsEl.appendChild(recentButton);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error: City not found');

    });
};

// function to get 5 day forecast data from openweathermap api
getFiveDayForecast = function(lat, lon, cityname) {
    // format the openweathermap api url
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKKey;

    // make a request to the url
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(queryURL);
            // call on displayWeather function
            displayFiveDayForecastWeather(data, cityname);
        });
};


// create elements on the page to display weather data i nthe weather report container
var displayWeather = function(data, cityname) {
    // create a div element to hold weather data
    var weatherReportEl = document.createElement('div');
    // weatherReportEl.classList = 'card-body';
    // create a h2 element to hold Weather Report for:
    var weatherReportTitleEl = document.createElement('h2');
    weatherReportTitleEl.textContent = 'Weather Report for:';
    weatherReportTitleEl.classList = 'card-title';
    // create a span element to hold city name
    var citynameEl = document.createElement('span');
    citynameEl.textContent = cityname;
    citynameEl.classList = 'card-title';
    // create an image element to hold weather icon
    var weatherIconEl = document.createElement('img');
    weatherIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    // create a span element to hold temperature data
    var temperatureEl = document.createElement('span');
    temperatureEl.textContent = 'Temperature: ' + data.main.temp + ' °F   ';
    temperatureEl.classList = 'card-text';
    // create a span element to hold humidity data
    var humidityEl = document.createElement('span');
    humidityEl.textContent = 'Humidity: ' + data.main.humidity + '%   ';
    humidityEl.classList = 'card-text';
    // create a span element to hold wind speed data
    var windSpeedEl = document.createElement('span');
    windSpeedEl.textContent = 'Wind Speed: ' + data.wind.speed + ' MPH';
    windSpeedEl.classList = 'card-text';

    // append the cityname, weather icon, and temperature to the weather report div
    var weatherContainer = document.getElementById('current-weather-container');
    weatherReportEl.appendChild(weatherReportTitleEl);
    weatherReportEl.appendChild(citynameEl);
    weatherReportEl.appendChild(weatherIconEl);
    weatherReportEl.appendChild(temperatureEl);
    weatherReportEl.appendChild(humidityEl);
    weatherReportEl.appendChild(windSpeedEl);
    weatherContainer.appendChild(weatherReportEl);
};

var displayFiveDayForecastWeather = function(data) {
    // create a div element to hold weather data
    var weatherForecastContainer = document.getElementById('forecast-container');
    weatherForecastContainer.innerHTML = '';


    var dailyForecast = [];
    //loop through each day in the forecast
    for (var i = 0; i < data.list.length; i++) {
        //get the data for the current day
        var dateString = data.list[i].dt_txt;
        

        //create a new date object
        var forecastdate = new Date(dateString);

        // check if current data point is at 12pm
        if (forecastdate.getHours() === 12) {
            //create a new card element for each day
            var ForecastCard = document.createElement('div');
            ForecastCard.classList = 'forecast-card';

            // add data to daily forecast array
            dailyForecast.push(data.list[i]);
            console.log(dailyForecast);




    // create a span element to hold date
    var forecastdateEl = document.createElement('span');
    var dateObj = new Date(data.list[i].dt_txt); // convert to date object
    var dateString = dateObj.toLocaleDateString(); // convert to localized date string
    forecastdateEl.textContent = dateString;
    forecastdateEl.classList = 'card-title';
    // create an image element to hold weather icon
    var weatherIconEl = document.createElement('img');
    weatherIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png');
    // create a span element to hold temperature data
    var temperatureEl = document.createElement('span');
    temperatureEl.textContent = 'Temperature: ' + data.list[i].main.temp + ' °F   ';
    temperatureEl.classList = 'card-text';
    // create a span element to hold humidity data
    var humidityEl = document.createElement('span');
    humidityEl.textContent = 'Humidity: ' + data.list[i].main.humidity + '%   ';
    humidityEl.classList = 'card-text';
    // create a span element to hold wind speed data
    var windSpeedEl = document.createElement('span');
    windSpeedEl.textContent = 'Wind Speed: ' + data.list[i].wind.speed + ' MPH';
    windSpeedEl.classList = 'card-text';

    // append the cityname, weather icon, and temperature to the weather report div
    var weatherForecastContainer = document.getElementById('forecast-container');
    ForecastCard.appendChild(forecastdateEl);
    ForecastCard.appendChild(weatherIconEl);
    ForecastCard.appendChild(temperatureEl);
    ForecastCard.appendChild(humidityEl);
    ForecastCard.appendChild(windSpeedEl);
    weatherForecastContainer.appendChild(ForecastCard);
};

};

};



// add event listener to city form and recent search buttons

cityFormEl.addEventListener('submit', formSubmitHandler);
recentButtonsEl.addEventListener('click', buttonClickHandler);