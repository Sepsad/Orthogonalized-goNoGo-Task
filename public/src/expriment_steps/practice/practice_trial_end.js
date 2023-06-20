var practice_trial_end = {
	type: 'html-keyboard-response',
	stimulus: '<p class= "instruction"  dir="rtl">پایان بخش تمرینی</p> <p dir="rtl">یک کلید فشار دهید برای ادامه.</p>',
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