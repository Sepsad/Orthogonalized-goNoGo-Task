var main_end_bonus_block = {
	type: 'instructions',
	data: {},
	pages: function() {
		var bonus = jsPsych.data.get().last(4).values()[0].curr_bonus
		var rounded_bonus = Math.round(bonus)
		if (rounded_bonus < fixed_bonus){
			rounded_bonus = fixed_bonus
		}

		return [
			'<p class= "instruction">Great! Congratulations!' +
			'<br>You earned <b>' + rounded_bonus + ' bonus points </b>!' +
			// '<br>Thank you so much for your participation.</p>' +
			'<p>Click <q>Next</q></p>'
		];
	},
	show_clickable_nav: true,
	on_load: function() {
		document.getElementById("jspsych-progressbar-container").style.visibility = "visible";
	},
	on_finish: function(data) {
		var curr_block = jsPsych.data.get().last(4).values()[0].block;
		data.num_gos = jsPsych.data.get().filter({choice: 'go', exp_stage: 'main_target_detection', block: curr_block}).count()
		data.num_nogos = jsPsych.data.get().filter({choide: 'nogo', exp_stage: 'main_target_detection', block: curr_block}).count()
		// data.num_nogos = (2*reps_in_exp)- data.num_gos

		num_trials = jsPsych.data.get().filter({exp_stage: 'main_target_detection', block: curr_block}).count()
		ttl_correct = jsPsych.data.get().filter({exp_stage: 'main_target_detection', correct: true, block: curr_block}).count()
		error_rate = 1 - (ttl_correct/num_trials)
		data.error_block = error_rate


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
			exp_stage:"end_main_bonus",
		})
	}
};