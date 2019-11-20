/**
 * 
 */
 $("#g1").on("click", function() {
	 			sessionStorage.setItem("game", "colors");

                window.location.href="leaderboard.html"; 
                });
         $("#g3").on("click", function() {
        	 sessionStorage.setItem("game", "cards");

        	   window.location.href="leaderboard.html"; });
           $("#return_menu").on("click", function() {
        	   window.location.href="WelcomePage.html"; });