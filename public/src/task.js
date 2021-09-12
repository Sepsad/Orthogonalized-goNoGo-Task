var timeline = [];

// full screen mode

timeline.push(consent);

timeline.push(preload);

timeline.push(first_welcome_page);

// timeline.push(form_page)

// timeline.push(fullscreen_intro)

// timeline.push(fullscreen)

timeline.push(before_instructions);

timeline.push(instructions);

//  instruction Questions
timeline.push(instruction_questions);

timeline.push(instruction_question_feedback);

// instructuon Questions
timeline.push(instructions_repeat);

// practice code
timeline.push(practice_instruction);

// practice trial all together
timeline.push(practice_trial_procedure);
timeline.push(practice_trial_end);

// // main code
timeline.push(main_start_page);

main_squares = shuffler(["f4_1", "f4_2", "f4_3", "f4_4"]);

stim1 = make_stimuli(false, main_squares, "block_1");
stim2 = make_stimuli(false, main_squares, "block_2");
stim3 = make_stimuli(false, main_squares, "block_3");
// stim4 = make_stimuli(false, main_squares, 'block_4')

// stims = [[stim1, "one fourth"], [stim2, "half"],[stim3, "three fourth"], [stim4]]

stims_modified = [[stim1, "one third"], [stim2, "two third"], [stim3]];

for (i = 0; i < stims_modified.length; i++) {
  timeline.push(main_trial_procedure(stims_modified[i][0]));
  if (stims_modified[i].length == 2) {
    timeline.push(main_between_block(stims_modified[i][1]));
  }
}

timeline.push(main_end_bonus_block);

timeline.push(demographic_survey);

// timeline.push(goodbye_page);
// demographic survey code

var experiment_id = jsPsych.randomization.randomID(8); // Random Experiment ID

jsPsych.data.addProperties({
  experiment_id: "GNG_" + experiment_id,
});

var turkInfo = jsPsych.turk.turkInfo();
jsPsych.data.addProperties({
  assignmentID: turkInfo.assignmentId,
});
jsPsych.data.addProperties({
  mturkID: turkInfo.workerId,
});
jsPsych.data.addProperties({
  hitID: turkInfo.hitId,
});
//
// initialize experiment
jsPsych.init({
  timeline: timeline,
  on_interaction_data_update: on_interaction_data_update,
  show_progress_bar: true,
  exclusions: {
    min_width: 800,
    min_height: 800,
  },
  on_finish: function () {

  },
});

// instruction blcok
