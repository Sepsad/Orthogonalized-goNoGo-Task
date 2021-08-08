stimuli_duration = 1000
feedback_duration = 2000 






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

// fixation pause
var practice_fixation_before_target_detection = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  data: jsPsych.timelineVariable('data'),
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement([750, 900, 1050, 1200, 1350, 1500, 1650, 1900], 1)[0];
  },
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"practice_iti_before_target_detection"
    })
  }
};



// target detection
var practice_target_detection_task = {
  type: 'circle-keyboard-response',
  choices: ['ArrowLeft', 'ArrowRight'],
  data: jsPsych.timelineVariable('data'),
  trial_duration: 1500,

  on_finish: function(data){

    data.choice = '';
    if(data.response == 'arrowleft' || data.response == 'arrowright') {
      data.choice = 'go';
    } else if (data.response == null) {
      data.choice = 'nogo';
    } else {
      data.choice = 'invalid';
    }

    if(data.cond_action == 'go'){
      data.correct = (data.response == data.side)
    } else if (data.cond_action == 'nogo') {
      data.correct = (data.response == null)
    }

    var practice_correct = jsPsych.data.get().filter({correct: true, block: 'block_p'}).count();
    var all_correct = jsPsych.data.get().filter({correct: true}).count();
    data.curr_bonus = (all_correct - practice_correct)*bonus_percent;
    data.trial_bonus = data.correct * bonus_percent;

    [outcome, feedback_points, prob_fall, expected_feedback] = give_reward(data.cond_outcome, data.correct, prob_outcome); 
    data.outcome = outcome;
    data.feedback_points = feedback_points;
    data.prob_fall = prob_fall;
    data.expected_feedback = expected_feedback;

    practice_agg_fb_pts = jsPsych.data.get().filter({block: "block_p"}).select('feedback_points').sum()
    data.agg_fb_pts = jsPsych.data.get().select('feedback_points').sum() - practice_agg_fb_pts

    jsPsych.data.addDataToLastTrial({
      exp_stage: "practice_target_detection"
    })
  }
}



// fixation pause
var practice_fixation_before_feedback = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  data: jsPsych.timelineVariable('data'),
  trial_duration: 1000,
  on_finish: function() {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"practice_iti_before_feedback",
    })
  }
};


var practice_feedback = {
  type: "html-keyboard-response",
  choices: jsPsych.NO_KEYS,
  trial_duration: feedback_duration,
  data: jsPsych.timelineVariable('data'),
  stimulus: function(){
    var outcome = jsPsych.data.get().last(2).values()[0].outcome;
    console.log(outcome)
    if (outcome === 'win'){
      return win_feedback
    } else if (outcome === 'lose'){
      return lose_feedback
    }
    else {
      return neutral_feedback
    }
  },
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"practice_feedback",
    })
  }
}



var practice_fixation_before_stimulus = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  data: jsPsych.timelineVariable('data'),
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement([750, 900, 1050, 1200, 1350, 1500], 1)[0];
  },
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"practice_fix_before_stimulius",
    })
  }
};



var end_practice_trial = {
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



