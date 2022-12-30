var practice_trial_end = {
	type: 'html-keyboard-response',
	stimulus: '<p class= "instruction">This marks the end of the Practice Trial.</p> <p>Press any key to continue to the main game.</p>',
	data: {},
	on_finish: function(data) {
		const practice_data = jsPsych.data.get().last(6*4*reps_in_trial);
		block_corr = practice_data.filter({exp_stage: 'practice_target_detection', correct: true}).count();
		data.error_block = 1-(block_corr/(4*reps_in_trial));

		data.num_gos = practice_data.filter({exp_stage: 'practice_target_detection', choice: 'go'}).count();
		data.num_nogos = practice_data.filter({exp_stage: 'practice_target_detection', choice: 'nogo'}).count();

		jsPsych.data.addDataToLastTrial({
			exp_stage:"practice_end",
			suspicious: false,
			block: 'block_p',
			exp_part: "practice"
		})
	}
};