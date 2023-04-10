# Weather-Dashboard
## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| HTML    | [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) | 
| CSS     | [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)      |   
| Javascript    | [https://developer.mozilla.org/en-US/docs/Web/javascript](https://developer.mozilla.org/en-US/docs/Web/javascript)      |   
| Git | [https://git-scm.com/](https://git-scm.com/)     |   

## Description

[Deployed Site](https://didriklindberg.github.io/Weather-Dasboard/)

This is a JavaScript application that allows users to lookup the weather for a specific city using the OpenWeatherMap API. The application takes the user's input of a city name, makes an API request to retrieve weather data, and displays the data on the webpage. The application extracts the latitude and longitude fro the first api call and passes it as parameters in a second api call to retreive a five day forecast. The application also allows users to click on buttons of previously searched cities, which triggers an API request for the corresponding weather data to be displayed. The application also saves the city names to local storage for future reference.

![My_Image](/assets/imgs/Mobile-view.jpg)

## Example function description

The function getCityWeather takes a single parameter cityname, which is the name of the city for which the weather information is requested. It first constructs a URL for the OpenWeatherMap API using the provided API key and the given cityname parameter.

Then, it uses the fetch() function to make a request to the API endpoint and fetch the weather information for the specified city. It expects a JSON response and once it receives the response, it logs the response data to the console.

After that, it calls the displayWeather function and passes the response data and cityname as arguments to display the weather information on the webpage.

The function then extracts the latitude and longitude data from the API response, and calls the getFiveDayForecast function with these parameters, to get the five day forecast for the city.

Next, it checks if the cityname already exists in the recent search buttons. If not, it saves the cityname to the browser's local storage and creates a new button with the cityname as text, and adds it to the recently searched buttons on the webpage.

If there is an error while making the request to the API or the city is not found, it logs an error message to the console and displays an alert message to the user indicating that the city was not found.


````java
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
``````



## Learning Points 

This project was the first time I used APIs. This app uses two separate APIs from the "https://openweathermap.org/" to retreive the current weather data and the 5-day forecast. This includes fethcing the API data and awaiting a JSON response.

 ### Find my


 * [Portfolio](https://didriklindberg.github.io/Portfolio-Site) 
* [Github](https://github.com/DidrikLindberg)
