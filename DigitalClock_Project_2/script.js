let is24Hour = true;

function updateClock(){

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let session = "";

    if(!is24Hour){

        session = hours >= 12 ? " PM" : " AM";

        hours = hours % 12;

        if(hours === 0){
            hours = 12;
        }
    }

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");

    document.getElementById("clock").innerHTML =
    `${hours}:${minutes}:${seconds}${session}`;
}

setInterval(updateClock,1000);

updateClock();

document
.getElementById("formatBtn")
.addEventListener("click",()=>{

    is24Hour = !is24Hour;

    if(is24Hour){

        document.getElementById("formatBtn")
        .innerText =
        "Switch to 12 Hour Format";

    }else{

        document.getElementById("formatBtn")
        .innerText =
        "Switch to 24 Hour Format";
    }

    updateClock();

});

document
.getElementById("themeBtn")
.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});