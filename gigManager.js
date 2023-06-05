// Get DR Gigs
export async function GetGigs(){
    const response = await fetch("https://gig-api.netlify.app/.netlify/functions/api/gigs/dynamiterhythm/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Access-Control-Request-Headers": "*",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS"
                    }}).then((fetchResponse) => {
                        const gigs = fetchResponse.json();
                        return gigs;
                    });  

    return response;
}

export async function DeleteGig(gigId){
    const response = await fetch(`https://gig-api.netlify.app/.netlify/functions/api/gigs/dynamiterhythm/${gigId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS"
        }}).then((fetchResponse) => {
            const responseCode = fetchResponse.responseCode;
            if (responseCode === 200){
                return true;
            }
            else{
                return false;
            }
        });  

    return response;
}


