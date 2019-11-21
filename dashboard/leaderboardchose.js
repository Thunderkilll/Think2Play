 $("#g1").on("click", function() {
		var audio_option =  sessionStorage.getItem("audio");
		if(audio_option != "off")
		{var audio = new Audio("sounds/clicksound.mp3");
		audio.play();
		}
	 			sessionStorage.setItem("game", "colors");

                window.location.href="leaderboard.html"; 
                });
         $("#g3").on("click", function() {
        		var audio_option =  sessionStorage.getItem("audio");
        		if(audio_option != "off")
        		{var audio = new Audio("sounds/clicksound.mp3");
        		audio.play();
        		}
        	 sessionStorage.setItem("game", "cards");

        	   window.location.href="leaderboard.html"; });
           $("#return_menu").on("click", function() {
        		var audio_option =  sessionStorage.getItem("audio");
        		if(audio_option != "off")
        		{var audio = new Audio("sounds/clicksound.mp3");
        		audio.play();
        		}
        	   window.location.href="../WelcomePage.html"; });