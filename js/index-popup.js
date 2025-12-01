const overlay = document.getElementById("overlay");
const popup = document.getElementById("index-popup");
const closeButton = document.getElementById("close-button");

// OnLoad Event
window.onload = () => {
    if(sessionStorage.getItem("firstLoad") == null){
    OpenPopup();
    closeButton.addEventListener("click", () => ClosePopup());
    sessionStorage.setItem("firstLoad", "false");
    }
};

// Function Definitions
function OpenPopup(){
    popup.classList.add("active");
    overlay.classList.add("active");
}

function ClosePopup(){
    popup.classList.remove('active')
    overlay.classList.remove('active')
}