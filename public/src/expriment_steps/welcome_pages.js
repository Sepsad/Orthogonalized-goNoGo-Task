var first_welcome_page ={
	type: 'html-button-response',
	stimulus: "<img src='../img/welcome.gif' style='height: 200px; '></img> <h1>Welcome to Go- NoGO Game</h1> <p> This game will take approximately 25 minutes to complete <br>Click on START when you are ready!</p>",
	choices: ['START'],
	data: {},
	on_finish: function() {
		jsPsych.data.addDataToLastTrial({
		exp_stage:"first_welcome",
		})
	},
	on_start: function() {
		preloadImages(images);
	}
}