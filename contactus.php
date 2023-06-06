<html>
    <head>
    <title>Dynamite Rhythm - Contact Us</title> 
    <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1" />
<link rel="shortcut icon" href="images/DynamiteLogo.png">
    <link rel="stylesheet" type ="text/css" href="stylesheetV2.css"/>
        
         <style>
        .error 
        {
            color: red;
        }
        
        .success
        {
            color: black;
            font-family: sans-serif;
            margin-left: 12.5%;
        }
    </style>
</head>
<body>
   <header class="index">
       <a href="index.html"><img src="images/DynamiteLogo.png" width="100px"></a>
       <a class=burger-nav></a>
           <div class="navbarcontainer2">
            <div class="navbar2">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="upcomingshows.html">Calendar</a></li>
                    <li><a href="media.html">Photo Gallery</a></li>
                    <li><a href="about.html">About the Band</a></li>
                    <li><a href="songs.html">Song List</a></li>
                    <li class="active"><a href="contactus.php">Contact Us</a></li>
                </ul>
            </div>
        </div>
    </header>
    
    
    <script src="./js/jquery.min.js"></script>
    <script src="./js/menu.js"></script>
    
    
    
     <?php
    ob_start();
        $nameError = $emailError = $subjectError = "";
        $name = $visitor_email = $message = $success = $failure = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    //check to make sure all fields are filled out and
        //take in the information from the form
    if (empty($_POST['user_name'])){
        $nameError = "*Please enter your name";
    } else{
        $name = $_POST['user_name'];
    }
    
    if (empty($_POST['user_email'])){
        $emailError = "*Please enter your email";
    } else{
         $visitor_email = $_POST['user_email'];
    }
    
    if (empty($_POST['user_subject'])){
        $subjectError = "*Please enter a message";
    } else{
         $message = $_POST['user_subject'];
    }
      
        //send the email only if all fields are filled in
    if ($nameError == '' and $emailError == '' and $subjectError == ''){
        
        //select which email should receive it and what it should say
        $email_from = "izzytons@gmail.com";   
        //must be your own for impersonation reasons
        $email_subject = "New Website Form Submission";
        $email_body = "You received a message from $name.\n".
            "user email: $visitor_email\n".
            "$name said: \n $message";
        $to = "dynamiterhythmband@gmail.com";
        $headers = "From:" . $email_from . "\r\n";
        $headers .= "Reply-To:" . $visitor_email . "\r\n";
        $headers .= "X-Priority: 1 (Highest)\n"; 
        $headers .= "X-MSMail-Priority: High\n"; 
        $headers .= "Importance: High\n";
        
        if (mail($to, $email_subject, $email_body, $headers)){
            $name = $visitor_email = $message = "";
            $success = "Message sent succesfully. Thank you!";
        } else{
            $failure = "Oops! Something went wrong!";
        }
    }
    }

?>
        
        <div class="container">
        <div class="contactform">
            <span class="error"> </span>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST">
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="user_name" placeholder="Enter Your Name" value="<?php echo htmlentities($name) ?>">
            <span class="error"><?php echo $nameError ?></span>
            <br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="user_email" placeholder="Enter Your Email" value="<?php echo htmlentities($visitor_email) ?>">
            <span class="error"><?php echo $emailError;?></span>
            <br>
            <label for="subject">Subject:</label><br>
            <textarea type="text" id="subject" name="user_subject" placeholder="Type Your Message Here" style="height:200px"></textarea>
            <span class="error"><?php echo $subjectError;?></span>
            <br>
            <button type="submit" name="submit">Submit</button>
            <div class="success"><br><?php 
                if(empty($failure)){echo $success;} else{echo $failure;} ?></div>
        </form>
        </div>
        </div>
        
    
    
    <footer class="contactfooter">
        <div id="footerlist">
        <ul>
   <li> <a href="https://www.facebook.com/dynamiterhythm/" target="_blank"><img src="images/newFBicon.png"></a></li>
       <li> <a href="https://www.instagram.com/dynamiterhythm/" target="_blank"><img src="images/instagram.png"></a></li>
            </ul>
            </div>
        
        <div id="graybar">
            
        </div>
    </footer>

    
    </body>
    
    

    
   
        
       
</html>