
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
// const city = document.getElementById('city');

var APIKKey = "4e82548e9a516fc5ec14f1ab6d4a2c48"


searchButton.addEventListener('click', () => {
    var city = searchInput.value;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKKey;

    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(queryURL);
            console.log(data.main.temp);
            console.log(data.main.humidity);
            // transfer content to html
            document.querySelector('.city').innerHTML = "City: " + data.name;
            document.querySelector('.temp').innerHTML = "Temp: " + data.main.temp;
            document.querySelector('.humidity').innerHTML = "Humidity: " + data.main.humidity;
            document.querySelector('.wind-speed').innerHTML = "Wind-Speed: " + data.wind.speed;
            
            

          

        })
})


