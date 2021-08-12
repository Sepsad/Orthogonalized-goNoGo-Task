stimuli_duration = 1000;
fixation_before_feedback_duration = 1000;
feedback_duration = 1000 ;
target_detection_task_duration = 1500;

error_rate_cap = 0.8

var start_main = 
{
  type: 'html-button-response',
  stimulus: "<h1 class= 'instruction' style = 'font-size: xx-large' >Let's Play! Are you ready? &#128170;</h1> <p class= 'instruction'> Please note that if you respond randomly, always press, or never press, We will not be able to pay you.</p> <p>Click on start.</p>",
  data: {},
  choices: ['Start'],
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"main_start",
      exp_part:"main"
    })
  }
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






function between_block(percent) {
    return {
      type: 'html-keyboard-response',
      stimulus: function() {
        // var bonus = jsPsych.data.get().last(2).values()[0].curr_bonus;
        // var rounded_bonus = Math.round(bonus)

        return ["<p class= 'instruction'> You have completed " + percent + " of the task" + 
        //  "and earned <b>"+ rounded_bonus + "</b> bonus points in total!</p>"+
                "<br>Feel free to take a few seconds to break. This will time out after 1 minute.</p>"+
                "<p>Click any key to continue.</p>"];
      },
      data: {},
      trial_duration: 60000,
      response_ends_trial: true,
      on_finish: function(data) {
      var curr_block = jsPsych.data.get().last(2).values()[0].block;
      data.num_gos = jsPsych.data.get().filter({choice: 'go' , exp_stage: 'main_target_detection', block: curr_block}).count()
      data.num_nogos = jsPsych.data.get().filter({choice: 'nogo', exp_stage: 'main_target_detection', block: curr_block}).count()
      // data.num_nogos = (2*reps_in_exp)- data.num_gos

      num_trials = jsPsych.data.get().filter({exp_stage: 'main_target_detection', block: curr_block}).count()

      ttl_correct = jsPsych.data.get().filter({exp_stage: 'main_target_detection', correct: true, block: curr_block}).count()
      error_rate = 1 - (ttl_correct/num_trials)
      data.error_block = error_rate

      num_trials = jsPsych.data.get().filter({exp_stage: 'main_target_detection', block: curr_block}).count()

      if (data.num_gos == num_trials){
          data.suspicious_type = 'all_one'
          data.suspicious = true
      }
      else if (data.num_gos == 0){
          data.suspicious_type = 'time_outs'
          data.suspicious = true
      }
      else if (error_rate >= error_rate_cap){
          data.suspicious_type = 'error_rate'
          data.suspicious = true
      }
      else{
          data.suspicious = false
      }
      data.block = curr_block // defines as this block after the filtering to determine num gos
      data.exp_part = 'main'

      jsPsych.data.addDataToLastTrial({
        exp_stage:"between_block",
      })
    }
  }
};


var end_main_bonus_block = {
    type: 'instructions',
    data: {},
    pages: function() {
      var bonus = jsPsych.data.get().last(4).values()[0].curr_bonus
      var rounded_bonus = Math.round(bonus)
      if (rounded_bonus < fixed_bonus){
        rounded_bonus = fixed_bonus
      }

      return ['<p class= "instruction">This marks the end of the experiment.' +
              '<br>You earned <b>' + rounded_bonus + ' bonus points </b>!' +
              '<br>Thank you so much for your participation.</p>' +
              '<p>Click <q>Next</q> to finish the experiment</p>'];
    },
    show_clickable_nav: true,
    on_finish: function(data) {
      var curr_block = jsPsych.data.get().last(4).values()[0].block;
      data.num_gos = jsPsych.data.get().filter({choice: 'go', exp_stage: 'main_target_detection', block: curr_block}).count()
      data.num_nogos = jsPsych.data.get().filter({choide: 'nogo', exp_stage: 'main_target_detection', block: curr_block}).count()
      // data.num_nogos = (2*reps_in_exp)- data.num_gos

      num_trials = jsPsych.data.get().filter({exp_stage: 'main_target_detection', block: curr_block}).count()
      ttl_correct = jsPsych.data.get().filter({exp_stage: 'main_target_detection', correct: true, block: curr_block}).count()
      error_rate = 1 - (ttl_correct/num_trials)
      data.error_block = error_rate


      if (data.num_gos == num_trials){
          data.suspicious_type = 'all_one'
          data.suspicious = true
      }
      else if (data.num_gos == 0){
          data.suspicious_type = 'time_outs'
          data.suspicious = true
      }
      else if (error_rate >= error_rate_cap){
          data.suspicious_type = 'error_rate'
          data.suspicious = true
      }
      else{
          data.suspicious = false
      }
      data.block = curr_block // defines as this block after the filtering to determine num gos
      data.exp_part = 'main'

    jsPsych.data.addDataToLastTrial({
      exp_stage:"end_main_bonus",

    })
  }
  };
