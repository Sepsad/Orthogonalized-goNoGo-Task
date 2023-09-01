var instruction_question_feedback = {
  type: "instructions",
  data: {},
  pages: function () {
    if (score < 3) {
      return [ "<p style='font-size:150px;'>&#9888;&#65039;</p>" +
        "<div class= 'instruction'> نمره شما " +score + "/3 است. به نظر می‌رسد شما کاملا بازی را یاد نگرفته‌اید." +
        // "<p><strong style='color:crimson'>Please note that if you are unable to answer the questions correctly <u style='color:red'>AGAIN</u>, we will not be able to pay you. </strong> </p>" +
        "</div>" + "<p> بر روی 'Next' کلیک‌ کنید تا آموزش را دوباره طی کنید.</p>"

      ];
    } else {
      return ["<h1 class= 'instruction'>عالی! همه پاسخ‌ها درست بودند! </h1> <p>برای ادامه 'Next' را کلیک کنید</p>"];
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
