stimuli_duration = 1000;
fixation_before_feedback_duration = 1000;
feedback_duration = 1000 ;
target_detection_task_duration = 1500;

error_rate_cap = 0.8

const images_preload = ['../img/welcome.gif', 
                "../img/stim/f1_1.png","../img/stim/f1_2.png", "../img/stim/f1_3.png","../img/stim/f1_4.png",
                '../img/page1.png', '../img/page2.png', '../img/stim/f3_1.png', '../img/eighth_3_page.png',
                "../img/doing.png", "../img/holding.png",
                // "../img/stim/f4_1.png","../img/stim/f4_2.png", "../img/stim/f4_3.png","../img/stim/f4_4.png",
                "../img/stim/f2_1.png","../img/stim/f2_2.png", "../img/stim/f2_3.png","../img/stim/f2_4.png",

              ];

var preload = {
  type: 'preload',
  // auto_preload: true 
  images: images_preload,
}



var main_stimulus = {
    type: 'image-keyboard-response',
    stimulus : jsPsych.timelineVariable('stimulus'),
    choices: jsPsych.NO_KEYS,
    data: jsPsych.timelineVariable('data'),
    trial_duration : stimuli_duration,
    on_finish: function(data) {

      jsPsych.data.addDataToLastTrial({
        exp_stage:"main_stimulus",
      })
    }
};

// fixation pause
var main_fixation_before_target_detection = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  data: jsPsych.timelineVariable('data'),
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement([750, 900, 1050, 1200, 1350, 1500, 1650, 1800, 1950], 1)[0];
  },
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"main_iti_before_target_detection"
    })
  }
};



// target detection
var main_target_detection_task = {
  type: 'circle-keyboard-response',
  choices: ['ArrowLeft', 'ArrowRight'],
  data: jsPsych.timelineVariable('data'),
  trial_duration: target_detection_task_duration,

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
      exp_stage: "main_target_detection"
    })
  }
}



// fixation pause
var main_fixation_before_feedback = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  data: jsPsych.timelineVariable('data'),
  trial_duration: fixation_before_feedback_duration,
  on_finish: function() {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"main_iti_before_feedback",
    })
  }
};


var main_feedback = {
  type: "html-keyboard-response",
  choices: jsPsych.NO_KEYS,
  trial_duration: feedback_duration,
  data : jsPsych.timelineVariable('data'),
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
      exp_stage:"main_feedback",
    })
  }
}



var main_fixation_before_stimulus = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  data: jsPsych.timelineVariable('data'),
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement([750, 900, 1050, 1200, 1350, 1500], 1)[0];
  },
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"main_fix_before_stimulius",
    })
  }
};










