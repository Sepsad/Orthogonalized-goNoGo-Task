var timeline = [];

// full screen mode

// timeline.push(consent);
timeline.push(consent_first_page);
timeline.push(consent_second_page);



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
    min_width: 600,
    min_height: 600,
  },
  on_finish: function () {
    

    exp_status = jsPsych.data.getLastTrialData().values()[0].exp_final_status;
    

    if( exp_status == "fully_completed"){

      completion_code = jsPsych.data.get().last(1).values()[0].experiment_id;
      var goodbye_message = "<h1><strong> Thank you very much for participating in this game!</strong></h1>" + 
      "<p>You have now completed the first round of the study.</p>" +
      // "<p>You have now completed the study.</p>" +
      "<h3><strong>Your completion code is: <font color='red'>"+ completion_code +"</font></strong></h3>" +
      "<p>Please copy and paste this into the MTurk window to claim payment.</p>" +
      "<p> We will remind you (via email) in 2 weeks to participate in the second round of the study.</p>" +
      "<p>Also, you will be able to find the second round of the experiment where you found this experiment.</p>" +
      "<p>If you have any questions about Go-NoGo Game, please mail Sepehr at <a href='Sepehrsdp@gmail.com' target = '_top'>sepehrsdp@gmail.com</a></p>";

      jsPsych.getDisplayElement().innerHTML = goodbye_message;
    }
    else if(exp_status == 'not_completed_by_failing_quiz') {
      console.log("vared if fail shod")
      var goodbye_message = "<h1 style= 'font-size:100px;'><strong> ⚠️ </strong></h1>" + 
      "<h3 style= 'font-size:xx-large; color:crimson'>Due to not passing the quiz, your session has expired!</h3>" +
      "<p style= 'font-size:large;'>Unfortunately, because of this you can't continue the experiment and we would not be able you pay you.</p>" ;
		jsPsych.getDisplayElement().innerHTML = goodbye_message;

    }
    // else if(exp_status == 'not_completed_by_changing_tab'){
    if(is_expired_by_changing_tab){
      console.log("vared if change tab shod")
      var goodbye_message = "<h1 style= 'font-size:100px;'><strong> ⚠️ </strong></h1>" + 
      "<h3 style= 'font-size:xx-large; color:crimson'>Due to changing tab/window, your session has expired!</h3>" +
      "<p style= 'font-size:large;'>Unfortunately, because of this you can't continue the experiment and we would not be able you pay you.</p>" ;

      jsPsych.getDisplayElement().innerHTML = goodbye_message;

    }
  },
});

// instruction blcok
