class Geolocation {
    successCallback(position){
        console.log(position)
        console.log(isClose(position))
        {return position}
    }

    errorCallback(error){
        console.log(error)
        {return error}
    }


    showPosition(){
        if(navigator.geolocation){ //checks if you have access to the location
            navigator.geolocation.getCurrentPosition( //gets current position
                this.successCallback,
                this.errorCallback
            )
        }else{
            alert("Your browser does not support geolocation")
        }
    }

}
function isClose(pos){
    const lat1 = pos.coords.latitude
    const lon1 = pos.coords.longitude
    const lat2 = 33.771004
    const lon2 = -84.391211
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    if(d < 15){
        {return true}
    } else{
        alert("Check today's best foods on diet buzz")
        {return false}
    }
}
// console.log(x.coords)
const showPosition = document.querySelector("#showPosition")
showPosition.addEventListener('click', function(e){
    e.preventDefault()
    //this.style.display = "none"
    new Geolocation().showPosition();
})