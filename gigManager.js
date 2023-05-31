// Get DR Gigs
GetGigs = function(){
(req, res) => fetch("https://gig-api.netlify.app/.netlify/functions/api/gigs/dynamiterhythm", {
                    method: "GET",
                    body: JSON.stringify({}),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Access-Control-Request-Headers": "*",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "X-Requested-With, content-type",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Headers": "content-type",
                        "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
                        "api-key": "fMVeiz5XeVSF10C0VkyMyKwOulrRbFXBnpt1QzQjBO2b8tJzBHsVH220qnb5fAQk"
                    }
                    })
                    .then((response) => response.json())
                    .then((json) => {console.log(json); res.send(json)});
}