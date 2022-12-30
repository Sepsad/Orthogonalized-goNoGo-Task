//stimulus
squares0 = ["f1_1", "f1_2", "f1_3", "f1_4"];
stim0 = make_stimuli(true, squares0, "block_p");
reps_in_trial = 3;
console.log(stim0);
var practice_stimulus = {
  type: 'image-keyboard-response',
  stimulus : jsPsych.timelineVariable('stimulus'),
  choices: jsPsych.NO_KEYS,
  data: jsPsych.timelineVariable('data'),
  trial_duration : stimuli_duration,
  on_finish: function(data) {

    jsPsych.data.addDataToLastTrial({
      exp_stage:"practice_stimulus",
    })
  }
};

var practice_trial_procedure = {
  timeline: [
    practice_stimulus,
    practice_fixation_before_target_detection,
    practice_target_detection_task,
    practice_fixation_before_feedback,
    practice_feedback,
    practice_fixation_before_stimulus,
  ],
  timeline_variables: stim0,
  repetitions: reps_in_trial,
  on_load: function () {
    document.getElementById("jspsych-progressbar-container").style.visibility =
      "hidden";
  },
  randomize_order: true,
};
