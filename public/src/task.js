stimuli_duration = 1000
feedback_duration = 2000 

var stimulus = [ 'f1_1', 'f1_2', 'f1_3', 'f1_4', 'f2_1',  'f2_2',
                  'f2_3',  'f2_4',  'f3_1', 'f3_2', 'f3_3',  'f3_4', 
                   'f4_1', 'f4_2',  'f4_3',  'f4_4', 'fsamp_1']


circle_side_dict = { 'right' : 'j', 'left': 'f', null : null }
squares0 = ['f1_1', 'f1_2', 'f1_3', 'f1_4']

win_feedback = "img/feedback/win.jpg" 
lose_feedback = "img/feedback/lose.jpg"
neutral_feedback = "img/feedback/neutral.jpg"

prob_outcome = 80   // keep it a whole number
reps_in_trial = 12  //reps_in_trial * 4 = actual number of reps in the trial/practice block (i.e. 15*4 = 60 )
reps_in_exp = 20    // reps_in_exp * 4 = actual number of reps in the experimental blocks
bonus_percent = 20/(reps_in_exp*2*4) 
fixed_bonus = 0     // 0
error_rate_cap = 0.7 // if error rate is higher than error_rate_cap*100 percent, a suspicion flag is triggered


var timeline = [];

// full screen mode


var first_welcome_page ={
  type: 'html-keyboard-response',
  stimulus: "<img src='img/welcome.gif' style='height: 200px; '></img> <h1>Welcome to Go- NoGO Experiment</h1> <p>Press any key to continue</p",
  on_finish: function() {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"first_welcome",
    })
  }
}


timeline.push(first_welcome_page)


// timeline.push(first_welcome_page);
// var subjectId_page = {
//     type: 'survey-text',
//     questions: [
//       {prompt: 'Enter your Participant ID', columns: 50, required: true, name: 'phoneNumber'}
//     ]
//   };

//   timeline.push(subjectId_page)


var fullscreen_intro = {
    type: 'instructions',
    pages: [ 
        "<p>On the next screen you will be asked to put your browser in full screen mode.</p>" +
        "<p>After entering full screen mode it is very important that you do not exit, switch tabs, minimize, or adjust the browser for the remainder of the game.</p>" +
        "<p>Doing so changes the display of the game and the game does not pause once started.</p>" +
        "<p>We can detect if you exit fullscreen, minimize the window, or switch to another tab, and we reserve the right to withold bonus/payment if this is indicated.</p>",
        ],
        show_clickable_nav: true,

    on_finish: function(data) {
        jsPsych.data.addDataToLastTrial({
            exp_stage:"fullscreen",
            // primary_key:data.trial_index,
            exp_part: "fullscreen"
        })
    }
};

timeline.push(fullscreen_intro)


var fullscreen = {
  type: 'fullscreen',
  fullscreen_mode: true,
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"fullscreen",
      // primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index,
      exp_part: "fullscreen"
    })
  }
};
timeline.push(fullscreen)


// var instructions = {
//   type: 'instructions',
//   pages: [instructions_texts.welcome_page, 
//           instructions_texts.second_page,
//           instructions_texts.third_page,
//           instructions_texts.forth_page,
//           instructions_texts.fifth_page,
//           instructions_texts.sixth_page,
//           instructions_texts.seventh_page,
//           instructions_texts.eighth_page,
//           // instructions_texts.question_page
//         ],
//   show_clickable_nav: true,
//   on_finish: function(data) {
//     jsPsych.data.addDataToLastTrial({
//       exp_stage:"instructions",
//       // primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index,
//       exp_part: "instructions"
//       })
//     }
//   }
// timeline.push(instructions)


//  instruction Questions

// var instruction_questions = {
//   type:'survey-multi-choice',
//   questions: [
//     {prompt: "What action do you take for this task",
//       options: ["I either click a button on the screen or wait (click nothing)", "I either press the space bar or wait (press nothing)", "I either press the left or right arrows on my keyboard to indicate my choice", "I either press the up arrow on my keyboard or wait (press nothing)"]},
//     {prompt: "In a single <i>round</i>, how many different colors of images will you see?",
//       options: ["1", "2", "3", "4" ]}
//     ],
//   required: true,
//   on_finish: function(data) {
//     jsPsych.data.addDataToLastTrial({
//       exp_stage:"instruction_questions",
//       primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index,
//       exp_part: "instructions"
//     })
//   }
// };

// timeline.push(instruction_questions);





// practice task

var instruction_before_practice = {
  type: 'instructions',
  pages:     ['<table style="margin-left:auto;margin-right:auto;table-layout:fixed !important; width:900px;"><tr>' +

  '<td><img src="img/f1_1.jpg" style="width: 200px;"></td>' +
  '<td><img src="img/f1_2.jpg" style="height: 200px; "></td>' +
  '<td><img src="img/f1_3.jpg" style="height: 200px; "></td>' +
  '<td><img src="img/f1_4.jpg" style="height: 200px; "></td>' +
  '</tr><tr>' +
  '<td>go2win</td><td>noGo2win</td><td>go2avoidPun</td><td>noGo2avoidPun</td>'+
  '</tr><tr>'+
  '<td><img src="img/giphy.gif" style="height: 200px; "></td><td>Withhold!</td><td><img src="img/giphy.gif" style="height: 200px; "></td><td>Withhold!</td>' +
  '</tr><tr>' +
  '</tr></table>',

  '<table style="margin-left:auto;margin-right:auto;table-layout:fixed !important; width:900px;"><tr>' +
  '<td><img src="img/Target_images/left_stimuli_0.jpg" style="width: 350px;"></td>' +
  '<td><img src="img/Target_images/right_stimuli_0.jpg" style="width: 350px; "></td>' +
  '</tr><tr>' +
  '<td>Press "F" key when circle appears left</td><td>Press "J" key when circle appears right</td>'+
  '</tr></table>'+
  '<p class="center-content">Please press "Next" to begin the practice.</p>'
],
  show_clickable_nav: true,
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"instructions",
      // primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index,
      exp_part: "instructions"
      })
    }

  }

timeline.push(instruction_before_practice);

var start_trial = {
  type: 'html-keyboard-response',
  stimulus: '<p>Practice Trial.</p> <p>Press any key to continue.</p>',
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"practice_start",
      // primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index,s
      exp_part:"practice"
    })
  }
}
timeline.push(start_trial);

var practice_fixation_before_trial = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  data: {
    correct_choice: jsPsych.timelineVariable('correct_choice'),
    color: jsPsych.timelineVariable('color'),
    cond: jsPsych.timelineVariable('cond'),
    cond_name: jsPsych.timelineVariable('cond_name'),
    exp_part: jsPsych.timelineVariable('exp_part'),
    block: jsPsych.timelineVariable('block'),
  },
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement([750, 900, 1050, 1200, 1350, 1500], 1)[0];
  },
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"practice_iti_before_trial",
      // primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index
    })
  }
};



// fixation pause
var practice_fixation = {
      type: 'html-keyboard-response',
      stimulus: '<div style="font-size:60px;">+</div>',
      choices: jsPsych.NO_KEYS,
      data: {
        correct_choice: jsPsych.timelineVariable('correct_choice'),
        color: jsPsych.timelineVariable('color'),
        cond: jsPsych.timelineVariable('cond'),
        cond_name: jsPsych.timelineVariable('cond_name'),
        exp_part: jsPsych.timelineVariable('exp_part'),
        block: jsPsych.timelineVariable('block')

      },
      trial_duration: function(){
        return jsPsych.randomization.sampleWithoutReplacement([750, 900, 1050, 1200, 1350, 1500, 1650, 1900], 1)[0];
      },
      on_finish: function(data) {
        jsPsych.data.addDataToLastTrial({
          exp_stage:"practice_iti",
          // primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index
        })
      }
    };


  //stimulus
var practice_stimulus = {
    type: 'image-keyboard-response',
    stimulus : jsPsych.timelineVariable('stimulus'),
    choices: jsPsych.NO_KEYS,
    data: {
              correct_choice: jsPsych.timelineVariable('correct_choice'),
              color: jsPsych.timelineVariable('color'),
              cond: jsPsych.timelineVariable('cond'),
              cond_name: jsPsych.timelineVariable('cond_name'),
              exp_part: jsPsych.timelineVariable('exp_part'),
              block: jsPsych.timelineVariable('block')

    }
    ,
    trial_duration : stimuli_duration,
    on_finish: function(data) {

      jsPsych.data.addDataToLastTrial({
        exp_stage:"practice_iti",
      })
    }
  };

// target detection task
var practice_choice = {
  type: 'image-keyboard-response',
  stimulus : function() {
    if(jsPsych.timelineVariable('correct_choice') == 'left'){
      return create_target('left')
    }
    else if (jsPsych.timelineVariable('correct_choice') == 'right')
    {
      return create_target('right')
    }
    else{
      return create_target(shuffler(['right','left'])[0])
    }
  },
  choices : ['j', 'f'],
  trial_duration: 4000,
  data : {
    correct_choice: jsPsych.timelineVariable('correct_choice'),
    color: jsPsych.timelineVariable('color'),
    cond: jsPsych.timelineVariable('cond'),
    cond_name: jsPsych.timelineVariable('cond_name'),
    exp_part: jsPsych.timelineVariable('exp_part'),
    block: jsPsych.timelineVariable('block')
},



  on_finish: function(data) {


    console.log(circle_side_dict[data.correct_choice])
    console.log(data.response)
    // console.log("-----------")
    


    if ((data.response == 'j') || (data.response == 'f')) {
      data.choice = "go"
    } else if (data.response == null) {
      data.choice = "nogo"
    } else {
      data.choice = "invalidgo"
    }
        // correct label & bonus pt allocation
    data.correct = (data.response == circle_side_dict[data.correct_choice]);
    var practice_correct = jsPsych.data.get().filter({correct: true, block: 'block_p'}).count()
    var all_correct = jsPsych.data.get().filter({correct: true}).count()
    data.curr_bonus = (all_correct - practice_correct)*bonus_percent
    data.trial_bonus = data.correct * bonus_percent
    // feedback determination
    
    random = Math.floor(Math.random()*100)
    //  to win conditions
    if ((data.cond == 1 || data.cond == 2) && data.correct == true) { // if it's go-to-win or no-go-to-win and they made correct choice
      if (random <= prob_outcome) { // if they fall in the 80% they get a reward
        data.outcome = 'win'
        data.feedback_points = 1
        data.probFall = prob_outcome //random number fell within the probability outcome
        data.fbExpected = true  //fbExpected means that they'll get the reward/punishment feedback that fits the expectation
      }
      else if (random> prob_outcome) {
        data.outcome = 'neutral' // if they fall in the 20% they get neutral
        data.feedback_points = 0
        data.probFall = 100 - prob_outcome
        data.fbExpected = false
      }
    }
    else if ((data.cond == 1 || data.cond == 2) && data.correct == false) {
      if (random <= prob_outcome) {
        data.outcome = 'neutral'
        data.feedback_points = 0
        data.probFall = prob_outcome
        data.fbExpected = true
      }
      else if (random> prob_outcome) {
        data.outcome = 'win' // if they fall in the 20% they get reward
        data.feedback_points = 1
        data.probFall = 100 - prob_outcome
        data.fbExpected = false
      }
    }
  
    // to avoid punish conditions
    if ((data.cond == 3 || data.cond == 4) && data.correct == true) { // if it's go-to-avoidPun or no-go-to-avoidPun and they made correct choice
      if (random <= prob_outcome) { // if they fall in the 80% they get a neutral
        data.outcome = 'neutral'
        data.feedback_points = 0
        data.probFall = prob_outcome
        data.fbExpected = true
      }
      else if (random> prob_outcome) {
        data.outcome = 'lose' // if they fall in the 20% they get punishment
        data.feedback_points = -1
        data.probFall = 100 - prob_outcome
        data.fbExpected = false
      }
    } 
    
    else if ((data.cond == 3 || data.cond == 4) && data.correct == false) { // if it's go-to-avoidPun or no-go-to-avoidPun and they made INcorrect choice
      if (random <= prob_outcome) { // if they fall in the 80% they get a punishment
        data.outcome = 'lose'
        data.feedback_points = -1
        data.probFall = prob_outcome
        data.fbExpected = true
      }
      else if (random> prob_outcome) {
        data.outcome = 'neutral' // if they fall in the 20% they get neutral
        data.feedback_points = 0
        data.probFall = 100 - prob_outcome
        data.fbExpected = false
      }
    }


    practice_agg_fb_pts = jsPsych.data.get().filter({block: "block_p"}).select('feedback_points').sum()
    data.agg_fb_pts = jsPsych.data.get().select('feedback_points').sum() - practice_agg_fb_pts

    jsPsych.data.addDataToLastTrial({
      exp_stage:"practice_choice",
      // primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index
    })
  }
}

// fixation pause
var practice_fixation_after_choice = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  data: {
    correct_choice: jsPsych.timelineVariable('correct_choice'),
    color: jsPsych.timelineVariable('color'),
    cond: jsPsych.timelineVariable('cond'),
    cond_name: jsPsych.timelineVariable('cond_name'),
    exp_part: jsPsych.timelineVariable('exp_part'),
    block: jsPsych.timelineVariable('block'),
  },
  trial_duration: 1000,
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"practice_iti_after_choice",
      // primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index
    })
  }
};


var practice_feedback = {
  type: "image-keyboard-response",
  choices: jsPsych.NO_KEYS,
  trial_duration: feedback_duration,
  data : {
    correct_choice: circle_side_dict[jsPsych.timelineVariable('correct_choice')],
    color: jsPsych.timelineVariable('color'),
    cond: jsPsych.timelineVariable('cond'),
    cond_name: jsPsych.timelineVariable('cond_name'),
    exp_part: jsPsych.timelineVariable('exp_part'),
    block: jsPsych.timelineVariable('block')
},
  stimulus: function(){
    // console.log(jsPsych.data.get().last(4).values()[2].correct_choice)
    // console.log(jsPsych.data.get().last(4).values()[2].cond_name)
    // console.log("---------------")
    var outcome = jsPsych.data.get().last(4).values()[2].outcome;
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
      // primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index
    })
  }
}




squares0 = ['f1_1', 'f1_2', 'f1_3', 'f1_4']
stim0 = make_stimuli(true, (squares0), 'block_p')
// practice trial all together
var trial_procedure = {
  timeline: [practice_fixation_before_trial, practice_stimulus, practice_fixation, practice_choice, practice_fixation_after_choice, practice_feedback],
  timeline_variables: stim0,
  // repetitions: reps_in_trial,
  repetitions: 5,
  randomize_order: true
}
timeline.push(trial_procedure);




jsPsych.init({
    timeline: timeline,
    on_finish: function() {     // for testing purposes 
      jsPsych.data.displayData('csv');
      jsPsych.data.get().localSave('csv','gng_data.csv');
    },
  });

// instruction blcok








