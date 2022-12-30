var fullscreen_intro = {
	type: 'instructions',
	pages: [ 
		"<p class= 'instruction'>On the next screen you will be asked to put your browser in full screen mode." +
		"<br><br>After entering full screen mode it is very important that you do not exit, switch tabs, minimize, or adjust the browser for the remainder of the game." +
		// "Doing so changes the display of the game and the game does not pause once started." +
		"<br><br><b>Any of these will disturb the experiment and if the experiment is interrupted, we will not be able to pay you.</b></p>",
	],
	show_clickable_nav: true,
	data: {},
	on_finish: function(data) {
		jsPsych.data.addDataToLastTrial({
				exp_stage:"fullscreen",
				// primary_key:data.trial_index,
				exp_part: "fullscreen"
		})
	}
};