window.addEventListener('load', () => {
let long;
let lat;
let temp = document.querySelector('.temp');
let description = document.querySelector('.description');
let location = document.querySelector('.location');
let tempSection = document.querySelector('.temp-section');
let tempType = document.querySelector('.temp-type');
location.transition;
//check if the user has shared his location
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(position =>{
long = position.coords.longitude;
lat = position.coords.latitude;
//use a proxy to get around the issue with darksky
const proxy = "https://cors-anywhere.herokuapp.com/"
const api = `${proxy}https://api.darksky.net/forecast/375956ac85df4e8a18859e135ef69e6b/${lat},${long}`;

//get elements from the API
fetch(api)
.then(data =>{
  return data.json();
})
.then(data =>{
  const {temperature, summary, icon} = data.currently;
temp.textContent =`${temperature} F`;
description.textContent = summary;
location.textContent = data.timezone;
let celsius = (temperature - 32) * (5/9);
//set icon
setIcons(icon, document.querySelector('.icon'));
//change temperature type on click
tempSection.addEventListener('click', () =>{
  if(tempType.textContent === "C"){
    tempType.style.opacity = "1";
    tempType.textContent = "F";
    temp.textContent = Math.floor(temperature);

  }
  else {
      tempType.style.opacity = "1";
      tempType.textContent = "C";
      temp.textContent = Math.floor(celsius);
  }
    });
  });
});

}

else{
   location.textContent = "We couldnt find your location, we're not wizards"
}


function setIcons(icon, iconID) {
  const skycons = new Skycons({color: "black"});
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}
});
