var first_welcome_page ={
	type: 'html-button-response',
	stimulus: "<p><img src='./img/CrowdCog.jpg' style='height: 100px;'></img></p>"  + 
				"<img src='./img/welcome.gif' style='height: 200px; '></img> "+
	"<h1>Welcome to Go/NoGO Game</h1> <p>This is the demo version of orthogonalized GoNoGo experiment. <br>by <a href='https://sepsad.github.io'>Sepehr Saeedpour</a> @<a href='https://crowdcognition.net/'>Crowd Cognition</a> </p> "+
				"<p><br>Click on START when you are ready!</p>",
	choices: ['START'],
	data: {},
	on_load: function() {
		document.getElementById("jspsych-progressbar-container").style.visibility = "hidden";
	},
	on_finish: function() {
		jsPsych.data.addDataToLastTrial({
		exp_stage:"first_welcome",
		})
	},
	// on_start: function() {
	// 	// preloadImages(images);
	// 	// return
	// }
}