
const start = document.querySelector("#start");

start.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
        data => {
            console.log(data);
        },
        error => console.log(error), {
            enableHighAccuracy: true
        }
    );
});