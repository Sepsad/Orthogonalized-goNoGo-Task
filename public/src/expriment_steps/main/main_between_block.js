function main_between_block(percent) {
	return {
		type: 'html-keyboard-response',
		stimulus: function() {
			// var bonus = jsPsych.data.get().last(2).values()[0].curr_bonus;
			// var rounded_bonus = Math.round(bonus)

			return ["<p class= 'instruction'> You have completed " + percent + " of the task" + 
			//  "and earned <b>"+ rounded_bonus + "</b> bonus points in total!</p>"+
							"<br>Feel free to take a few seconds to break. This will time out after 1 minute.</p>"+
							"<p>Click any key to continue.</p>"];
		},
		data: {},
		trial_duration: 60000,
		response_ends_trial: true,
		on_load: function() {
			document.getElementById("jspsych-progressbar-container").style.visibility = "visible";
		},
		on_finish: function(data) {
			var curr_block = jsPsych.data.get().last(2).values()[0].block;
			data.num_gos = jsPsych.data.get().filter({choice: 'go' , exp_stage: 'main_target_detection', block: curr_block}).count()
			data.num_nogos = jsPsych.data.get().filter({choice: 'nogo', exp_stage: 'main_target_detection', block: curr_block}).count()
			// data.num_nogos = (2*reps_in_exp)- data.num_gos

			num_trials = jsPsych.data.get().filter({exp_stage: 'main_target_detection', block: curr_block}).count()

			ttl_correct = jsPsych.data.get().filter({exp_stage: 'main_target_detection', correct: true, block: curr_block}).count()
			error_rate = 1 - (ttl_correct/num_trials)
			data.error_block = error_rate

			num_trials = jsPsych.data.get().filter({exp_stage: 'main_target_detection', block: curr_block}).count()

			if (data.num_gos == num_trials){
					data.suspicious_type = 'all_one'
					data.suspicious = true
			}
			else if (data.num_gos == 0){
					data.suspicious_type = 'time_outs'
					data.suspicious = true
			}
			else if (error_rate >= error_rate_cap){
					data.suspicious_type = 'error_rate'
					data.suspicious = true
			}
			else{
					data.suspicious = false
			}
			data.block = curr_block // defines as this block after the filtering to determine num gos
			data.exp_part = 'main'

			jsPsych.data.addDataToLastTrial({
				exp_stage:"between_block",
			})
		}
  }
};