function main_trial_procedure(stim) {
	return {
		timeline: [
			main_stimulus,
			main_fixation_before_target_detection, 
			main_target_detection_task,
			main_fixation_before_feedback,
			main_feedback, 
			main_fixation_before_stimulus
		],
		on_load: function() {
			document.getElementById("jspsych-progressbar-container").style.visibility = "hidden";
		},
		timeline_variables: stim,
		repetitions: reps_in_exp,
		randomize_order: true
	}
}