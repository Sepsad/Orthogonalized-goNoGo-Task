var goodbye_page ={
	type: 'html-keyboard-response',
	stimulus: function (){
		var completion_code = jsPsych.data.get().last(1).values()[0].experiment_id

		return ( "<h1><strong>Thanks for participating in this game!</strong></h1>" + 
				"<h3><strong>Your completion code is: <font color='red'>"+ completion_code +"</font></strong></h3>" +
				"<p>Please copy and paste this into the MTurk window to claim payment.</p>" +
				"<p>If you have any questions about Go-NoGo Game, please mail Sepehr at <a href='Sepehrsdp@gmail.com' target = '_top'>sepehrsdp@gmail.com</a></p>"   )

	}  ,
	choices: jsPsych.NO_KEYS,
	data: {},
	on_load: function() {
		document.getElementById("jspsych-progressbar-container").style.visibility = "visible";
	},
	on_finish: function() {
		jsPsych.data.addDataToLastTrial({
		exp_stage:"goodbye",
		})
	},
}