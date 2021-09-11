var instruction_question_feedback = {
  type: "instructions",
  data: {},
  pages: function () {
    if (score < 4) {
      return [ "<p style='font-size:150px;'>&#9888;&#65039;</p>" +
        "<div class= 'instruction'> You got " +score + "/4 correct. it looks as if you may not fully understand the task." +
        "<p>Please note that if you are unable to answer the questions correctly again, we will not be able to pay you. </p>" +
        "</div>" + "<p> Please click 'Next' to return to the instructions.</p>"

      ];
    } else {
      return ["<h1 class= 'instruction'>Great! You got them all right! </h1> <p>Click 'Next' to proceed.</p>"];
    }
  },
  show_clickable_nav: true,
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
        exp_stage:"instruction_questions_feedback",
        exp_part: "instructions"
    })
}
};
