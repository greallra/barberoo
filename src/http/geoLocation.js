export function getLocation() {
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);
      }
    
      function error(e) {
        console.log(e);
      }
    
      if(!navigator.geolocation) {
        console.log("browser doesnt support geolocation api");
      } else {
        console.log("locating...");
        navigator.geolocation.getCurrentPosition(success, error);
    
      }
}