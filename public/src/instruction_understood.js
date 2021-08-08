var instructions = {
    type: 'instructions',
    pages: [instructions_texts.welcome_page, 
            instructions_texts.second_page,
            instructions_texts.third_page,
            instructions_texts.forth_page,
            // instructions_texts.fifth_page,
            // instructions_texts.sixth_page,
            instructions_texts.seventh_page,
            instructions_texts.eighth_1_page,
            instructions_texts.eighth_2_page,
            instructions_texts.eighth_3_page,
            instructions_texts.eighth_4_page,
            instructions_texts.ninth_page,
            instructions_texts.tenth_page
            // instructions_texts.question_page
          ],
    show_clickable_nav: true,
    show_page_number: true,
    data: {},
    on_finish: function(data) {
      jsPsych.data.addDataToLastTrial({
        exp_stage:"instructions",
        // primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index,
        exp_part: "instructions"
        })
      }
}

var instruction_questions = {
    type:'survey-multi-choice',
    questions: [
      {prompt: "What action do you take for this task",
        options: ["I either click a button on the screen or wait (click nothing)", "I either press the space bar or wait (press nothing)", "I either press the right arrows on my keyboard or wait (press nothing)", "I either press the left or right arrow on my keyboard to indicate my choice or wait (press nothing)"]},
      {prompt: "In the game, how many different images will you see?",
        options: ["1", "2", "3", "4" ]}
      ],
    required: true,
    data: {},
    on_finish: function(data) {
      jsPsych.data.addDataToLastTrial({
        exp_stage:"instruction_questions",
        exp_part: "instructions"
      })
    }
  };

  

var redo_instructions = {
    type: 'instructions',
    pages: [
        '<p style= "font-size:150px;" >&#9888;&#65039;</p>'+
      "<p class= 'instruction'> Hmm...Based on one or more of your answers to the previous questions, it looks as if you may not fully understand the task. " +
      " If you are unable to answer the questions correctly again, we reserve the right to withold your bonus, and you may be asked to leave the study </p>" +
      "<p> Please click 'Next' to return to the instructions. </p>"

    ],
    show_clickable_nav: true,
    data: {},
    on_finish: function(data) {
      jsPsych.data.addDataToLastTrial({
        exp_stage:"instruction_fail",
        exp_part: "instructions"
      })
    },
};

var instructions_understood = {
    timeline: [redo_instructions, instructions, instruction_questions],
    conditional_function:   function() {
        var dat = jsPsych.data.getLastTrialData().values()[0];
        var answer1 = (dat.response).Q0;
        var answer2 = (dat.response).Q1;
        if(answer1.includes('left or right') == true && answer2.includes('4') == true) {
            return false;
        } else {
            return true;
        }
      },
  };
