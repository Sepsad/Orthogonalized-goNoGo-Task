var timeline = [];

// full screen mode 

var experiment_id =  jsPsych.randomization.randomID(8); // Random subject ID
jsPsych.data.addProperties({
  experiment_id: experiment_id
});

// timeline.push(first_welcome_page)

// timeline.push(form_page)

// timeline.push(fullscreen_intro)

// timeline.push(fullscreen)

// timeline.push(instructions)


//  instruction Questions
// timeline.push(instruction_questions);

// instructuon Questions
// timeline.push(instructions_repeat);


// practice code 
console.log(practice_instruction);
timeline.push(practice_instruction);



// practice trial all together

timeline.push(practice_trial_procedure);
timeline.push(practice_trial_end);


// main code
timeline.push(main_start_page);


main_squares = shuffler(['f4_1', 'f4_2', 'f4_3', 'f4_4']);

stim1 = make_stimuli(false, main_squares, 'block_1')
stim2 = make_stimuli(false, main_squares, 'block_2')
stim3 = make_stimuli(false, main_squares, 'block_3')
stim4 = make_stimuli(false, main_squares, 'block_4')


stims = [[stim1, "one fourth"], [stim2, "half"],[stim3, "three fourth"], [stim4]]


for (i = 0; i < stims.length; i++){
  timeline.push(main_trial_procedure(stims[i][0]));
  if (stims[i].length == 2) {
    timeline.push(main_between_block(stims[i][1]))
  }
}

timeline.push(main_end_bonus_block);

// demographic survey code


// initialize experiment
jsPsych.init({
    timeline: timeline,
    on_interaction_data_update: on_interaction_data_update,
    on_finish: function() {     // for testing purposes 
      jsPsych.data.displayData();
      // jsPsych.data.get().localSave('csv','gng_data.csv');
    },
  });

// instruction blcok

