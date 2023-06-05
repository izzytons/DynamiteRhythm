// Imports
import * as gigManager from "./gigManager.js"

// OnLoad Event
window.onload = async () => {
    if (document.body.classList.contains("upcomingshows")){
        PopulateCalendarPage();
    }
    else if (document.body.classList.contains("editcalendar")){
        PopulateEditCalendarPage();
    }
}

// Local variables
var monthNames = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
];

// Create single calendar html object for a gig object
function CreateCalendarObject(gig){

    const eventContainer = document.getElementById("event_container");

    // Create event divs
    const event = document.createElement("div");
    const eventRight = document.createElement("div");
    const eventLeft = document.createElement("div");
    const eventDate = document.createElement("div");
    const eventDay = document.createElement("div");
    const eventMonth = document.createElement("div");
    const eventTitle = document.createElement("h3");
    const eventDescription = document.createElement("div");
    const eventTime = document.createElement("div");
    const descParagraph = document.createElement("p");
    const locationParagraph = document.createElement("p");

    event.classList.add("event");
    eventRight.classList.add("event_right");
    eventLeft.classList.add("event_left");
    eventDate.classList.add("event_date");
    eventDay.classList.add("event_day");
    eventMonth.classList.add("event_month");
    eventTitle.classList.add("event_title");
    eventDescription.classList.add("event_description");
    eventTime.classList.add("event_time");

    eventContainer.appendChild(event);
    event.appendChild(eventLeft);
    eventLeft.appendChild(eventDate);
    eventDate.appendChild(eventDay);
    eventDate.appendChild(eventMonth);

    event.appendChild(eventRight);
    eventRight.appendChild(eventTitle);
    eventRight.appendChild(eventDescription);
    eventRight.appendChild(eventTime);
    eventDescription.appendChild(descParagraph);
    eventDescription.appendChild(locationParagraph);

    // Fill in information
    const gigDateAndTime = new Date(gig.DateAndTime);
    eventDay.innerHTML = gigDateAndTime.getDay();
    eventMonth.innerHTML = monthNames[gigDateAndTime.getMonth()];
    eventTime.innerHTML = "<img src=images/time.png alt=\"\" />";
    eventTime.innerHTML += gigDateAndTime.toLocaleString('en-us', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    eventTitle.innerHTML = gig.Title;
    descParagraph.textContent = gig.Description;
    locationParagraph.textContent = gig.Location;
}

// Display upcoming shows on html page using data returned from API
async function PopulateCalendarPage(){
    console.log("Running PopulateCalendarPage");

    const eventContainer = document.getElementById("event_container");
    const gigsFromDB = await gigManager.GetGigs(); // get gig list from DB
    console.log(`Gigs retrieved from API: ${JSON.stringify(gigsFromDB)}`);

    // Filter out past gigs
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0); //reset the time for date comparison regardless of time
    const futureGigs = gigsFromDB.filter((x) => { 
        const gigDate = new Date(x.DateAndTime).setHours(0,0,0,0);
        return gigDate >= currentDate;
    });

    console.log(`future gigs: ${JSON.stringify(futureGigs)}`);

    // Construct page differently if no future gigs
    if (futureGigs.length == 0){
        // Create new div with informational text
        const noGigsDiv = document.createElement("div");
        const firstLine = document.createElement("h1");
        const secondLine = document.createElement("h1");
        firstLine.innerHTML = "We have no upcoming gigs at the moment.";
        secondLine.innerHTML = "More coming soon!";
        noGigsDiv.appendChild(firstLine);
        noGigsDiv.appendChild(secondLine);
        noGigsDiv.style.textAlign = "center";
        eventContainer.appendChild(noGigsDiv);
    } 
    else{
        // Group gigs by year
        const groupedGigs = GroupByYear(futureGigs);
        console.log(`Gigs grouped by year: ${JSON.stringify(groupedGigs)}`);

        groupedGigs.forEach((group) => {
            // Create header for year
            const yearHeader = document.createElement("h3");
            yearHeader.classList.add("year");
            yearHeader.innerHTML = group[0];
            eventContainer.appendChild(yearHeader);

            // Add calendar objects for each gig in given year (group key)
            group[1].forEach((currentGig) => {
                CreateCalendarObject(currentGig)
            });
        });
    }
}

// Display upcoming shows on html page using data returned from API with update, delete, and create functionality
async function PopulateEditCalendarPage(){
    console.log("Running PopulateEditCalendarPage");
    const eventContainer = document.getElementById("event_container");
    const gigsFromDB = await gigManager.GetGigs(); // get gig list from DB
    console.log(`Gigs retrieved from API: ${JSON.stringify(gigsFromDB)}`);

    // Filter out past gigs
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0); //reset the time for date comparison regardless of time
    const futureGigs = gigsFromDB.filter((x) => { 
        const gigDate = new Date(x.DateAndTime).setHours(0,0,0,0);
        return gigDate >= currentDate;
    });

    console.log(`future gigs: ${JSON.stringify(futureGigs)}`);

    // Group gigs by year
    const groupedGigs = GroupByYear(futureGigs);
    console.log(`Gigs grouped by year: ${JSON.stringify(groupedGigs)}`);

    groupedGigs.forEach((group) => {
        // Create header for year
        const yearHeader = document.createElement("h3");
        yearHeader.classList.add("year");
        yearHeader.innerHTML = group[0];
        eventContainer.appendChild(yearHeader);

        // Add calendar objects for each gig in given year (group key)
        group[1].forEach((currentGig) => {
            CreateCalendarObject(currentGig);
            const modificationButtons = document.createElement("div");
            const updateButton = document.createElement("button");
            const deleteButton = document.createElement("button");
            updateButton.innerText = "Update";
            deleteButton.innerText = "Delete";
            modificationButtons.classList.add("modification-buttons");
            deleteButton.id = "deletegig-button";
            deleteButton.addEventListener("click", async () => await gigManager.DeleteGig(currentGig._id));

            modificationButtons.appendChild(updateButton);
            modificationButtons.appendChild(deleteButton);
            eventContainer.appendChild(modificationButtons);
        });
    });

    // Add create gig button at bottom of gigs list
    const createGigButton = document.createElement("button");
    createGigButton.innerText = "Add New Gig";
    createGigButton.addEventListener("click", () => {}); // TODO: ADD PUT REQUEST IN GIGMANAGER AND ADD FUNCTIONALITY HERE
    eventContainer.appendChild(createGigButton);
}


// Function to group gig list by year
function GroupByYear(gigs){
    const gigList = gigs;
    const groupedResult = gigList.reduce((group, gig) => {
        const gigDateAndTime = new Date(gig.DateAndTime);
        const year = gigDateAndTime.getFullYear();
        group[year] = group[year] ?? []
        group[year].push(gig);
        return group;
    }, {});

    return Object.entries(groupedResult);
}

//-----------------------------------------------------------------------------------------------------------------------------------

// EXAMPLE EVENT
{/* <div class = "event">
            <div class = "event_left">
                <div class = "event_date">
                    <div class = "event_day">23</div>
                    <div class = "event_month">June</div>
                </div>  
            </div>
            
            <div class = "event_right">
                <h3 class = "event_title">Private Concert</h3>
                <div class = "event_description">
                    <p>Pawtucket, RI</p>
                </div>
                <div class = "event_time"> <img src=images/time.png alt="" />6:30 pm</div>
            </div>   
        </div> */}


// Gig Schema
// const GigSchema = new Schema(
//     {
//         Title: String,
//         Location: String,
//         Description: String,
//         Band: String,
//         DateAndTime: Date,
//         _id: mongodb.ObjectId
//     }
// );