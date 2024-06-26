document.addEventListener('DOMContentLoaded', function () {
    const ipAddressElement = document.getElementById('ip-address');
    const locationElement = document.getElementById('location');
    const timezoneElement = document.getElementById('timezone');
    const ispElement = document.getElementById('isp');
    const searchBtn = document.getElementById('search-btn')
    const ipInput = document.getElementById('ip-input');


    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
    let marker = L.marker([0, 0]).addTo(map);
    
    function updateMap(lat, lon) {
        map.setView([lat, lon], 13);
        marker.setLatLng([lat, lon]);
    }



async function fetchIPinfo(ip){

  try{
    const apiKey = 'at_kZU4agyr5sBa2VoWdkVrLFYeZodQN';
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json()
    console.log(data)

    ipAddressElement.textContent = data.ip;
    locationElement.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}, ${data.location.timezone}`;
    ispElement.textContent = data.isp;
    timezoneElement.textContent = `UTC ${data.location.timezone}`;
    updateMap(data.location.lat, data.location.lng);
  }catch (error){
    console.log('Error fetching IP information:', error);
  }
    
}


async function getUserIp(){

    try{
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        await fetchIPinfo(data.ip)
    }catch (error){
        console.log('Error fetching users Ip address:', error);
    }
}



searchBtn.addEventListener('click', () => {

    const ip = ipInput.value.trim();
    if(ip){
        fetchIPinfo(ip)
    }

});

});