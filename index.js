// map display


let map = L.map('map').setView([5.6698,-0.2361], 13);
const attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let tiles = L.tileLayer(tileUrl,{attribution});
tiles.addTo(map);
map.zoomControl.remove()

let myIcon = L.icon({
    iconUrl: 'images/icon-location.png',
    iconSize: [24, 48],
    iconAnchor: [20, 70],
   
});
const marker = L.marker([0,0] ,{icon: myIcon}).addTo(map)



let ipInput = document.getElementById('ipInput');
let send = document.getElementById('send');
const api_key = 'at_mqeV9d5GKHy77J7TxUkL44o1UiruL'
let info = document.querySelector('.map')
let ipAddress = document.getElementById('ipInput').value
let firstTime = true ;

//button handling and data fetching
send.addEventListener('click',()=>{

    if(firstTime === false){
        alert('invalid')
    }
    let ipAddress = document.getElementById('ipInput').value
    const getGeoData = async ()=> {
        let getData =await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${ipAddress}`)
        let response = await getData.json();
        const latitude = response.location.lat
        const longitude =  response.location.lng
        
        document.getElementById('ip-location').innerText = `${response.location.country}, ${response.location.city}`
        document.getElementById('ip-address').innerText = `${response.ip}`
        document.getElementById('timezone').innerText = `UTC ${response.location.timezone}`
        document.getElementById('port').innerText = `${response.isp}`
        console.log(response)
        map.setView([latitude,longitude], 13)
        marker.setLatLng([latitude,longitude])
        info.style.visibility = 'visible'
        

    }

    getGeoData().catch(err =>alert('invalid ip address', err))
})




