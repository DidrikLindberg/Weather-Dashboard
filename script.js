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
        // getCityWeather(cityname);
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
    }
};




// searchButton.addEventListener('click', () => {
//     var city = searchInput.value;
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKKey;

//     fetch(queryURL)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             console.log(queryURL);
//             console.log(data.main.temp);
//             console.log(data.main.humidity);
            // transfer content to html
        // displayWeather(data);
            // document.querySelector('.city').innerHTML = "City: " + data.name;
            // document.querySelector('.temp').innerHTML = "Temp: " + data.main.temp;
            // document.querySelector('.humidity').innerHTML = "Humidity: " + data.main.humidity;
            // document.querySelector('.wind-speed').innerHTML = "Wind-Speed: " + data.wind.speed;
            

//         });
// });

cityFormEl.addEventListener('submit', formSubmitHandler);
recentButtonsEl.addEventListener('click', buttonClickHandler);