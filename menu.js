$(document).ready(function(){
    console.log("document is ready; function started running");
     
          $(".burger-nav").on("click", function(){
                
                console.log("burger-nav was clicked");
                $(".burger-nav").toggleClass("open");
                $(".navbar2 ul li").toggleClass("open");
                $("#bodypic").toggleClass("open");
                $("footer").toggleClass("open");
                $("#calendarcontainer").toggleClass("open");
                $("#mediabody").toggleClass("open");
                $("#aboutimg").toggleClass("open");
                $("#songlist").toggleClass("open");
                $(".contactform").toggleClass("open");  
                $(".event_container").toggleClass("open");  
                $(".contact_div").toggleClass("open");  
            });        
                                   
});