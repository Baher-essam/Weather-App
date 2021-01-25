// //getting main elemnts
const weatherNotification = document.querySelector('.weather-notification');
// const tempElement = document.querySelector('.temp-value p');
// const descElement = document.querySelector('.temp-description p');
// const locationElement = document.querySelector('.temp-location p');



window.addEventListener('load', ()=> {
    let long;
    let lat;
    let kelvin = 273;
    //getting DOM elements for api
    let locationTimezone = document.querySelector('.location-timezone');
    let locationCountry = document.querySelector('.location-country');
    let currentDegree = document.querySelector('.current-degree');
    let almostDegree = document.querySelector('.almost-degree');
    let weatherDesc = document.querySelector('.weather-description');
    let weatherIcon = document.querySelector('.icon');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            key = '2b2ba16893949d7d46b3a88a0a0cbdf0';

           const weatherApi =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

            fetch(weatherApi)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {country} = data.sys;
                const name  = data.name;
                const {temp, feels_like } = data.main;
                const {description , main , id , icon} = data.weather[0];
               //set DOM elements for API
                locationTimezone.innerHTML= name;
                locationCountry.innerHTML= country;
                weatherDesc.innerHTML= description;
                currentDegree.innerHTML= ( temp-kelvin).toFixed(1) + ` <span>C</span>`;
                almostDegree.innerHTML= `feels like `+( feels_like-kelvin).toFixed(1)+ ` <span>C</span>`;
                weatherIcon.innerHTML =`<img src="icons/${icon}.svg">`;
                // document.getElementById("temp").onclick =  fahrenheitTemp();
            });

           
            
            function fahrenheitTemp(currentDegree , almostDegree){
                currentDegree = (currentDegree *9/5)+32;
                almostDegree = (almostDegree *9/5)+32;
            }
        });
        // else
        // {
        //     console.log('No geo support. Will try with IP Location.');
        // }
        
    }



});