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

    // if cityname exists, get weather data for that city
    if (cityname) {
        getCityWeather(cityname);
        //append data attributes to recent search buttons
        // save cityname to localStorage
        localStorage.setItem('cityname', cityname);
        // create button for recent search and set data attribute to cityname and text to cityname with a class of btn
        var recentButton = document.createElement('button');
        recentButton.setAttribute('data-cityname', cityname);
        recentButton.textContent = cityname;
        recentButton.classList.add('btn');
        recentButtonsEl.appendChild(recentButton);
        
        // clear old content
        currentweatherContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a City');
    }
};

// button click handler for recent searches

var buttonClickHandler = function(event) {
    var cityname = event.target.getAttribute('data-cityname');

    // if cityname exists, get weather data for that city
    if (cityname) {
        getCityWeather(cityname);
        // clear old content
        currentweatherContainerEl.textContent = '';
        
    }
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
        });
};


// create elements on the page to display weather data i nthe weather report container
var displayWeather = function(data, cityname) {
    // create a div element to hold weather data
    var weatherReportEl = document.createElement('div');
    weatherReportEl.classList = 'card-body';
    // create a span element to hold city name
    var citynameEl = document.createElement('span');
    citynameEl.textContent = cityname;
    citynameEl.classList = 'card-title';
    // create an image element to hold weather icon
    var weatherIconEl = document.createElement('img');
    weatherIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    // create a span element to hold temperature data
    var temperatureEl = document.createElement('span');
    temperatureEl.textContent = 'Temperature: ' + data.main.temp + ' °F';
    temperatureEl.classList = 'card-text';

    // append the cityname, weather icon, and temperature to the weather report div
    var weatherContainer = document.getElementById('current-weather-container');
    weatherReportEl.appendChild(citynameEl);
    weatherReportEl.appendChild(weatherIconEl);
    weatherReportEl.appendChild(temperatureEl);
    weatherContainer.appendChild(weatherReportEl);
};





// add event listener to city form and recent search buttons

cityFormEl.addEventListener('submit', formSubmitHandler);
recentButtonsEl.addEventListener('click', buttonClickHandler);