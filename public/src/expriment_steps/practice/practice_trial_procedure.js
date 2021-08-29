//stimulus
squares0 = ['f1_1', 'f1_2', 'f1_3', 'f1_4']
stim0 = make_stimuli(true, (squares0), 'block_p')

console.log(stim0);

var practice_trial_procedure = {
	timeline: [
		practice_stimulus, 
		practice_fixation_before_target_detection,
		practice_target_detection_task, 
		practice_fixation_before_feedback,
		practice_feedback, 
		practice_fixation_before_stimulus
	],
	timeline_variables: stim0,
	repetitions: reps_in_trial,
	randomize_order: true
}