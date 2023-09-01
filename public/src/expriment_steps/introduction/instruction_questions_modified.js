var score = 0;
var comprehensionRounds = [];

var correctAnswers = { Q0: "False", Q1: "درست", Q2: "False", Q3: "False" };

var instruction_questions = {
  type: "survey-multi-choice",
  questions: [
    {
      prompt:
        "<p style='text-align: left'>برای برخی از تصاویر، بهترین استراتژی همیشه فشار دادن کلید J است. برای برخی از تصاویر دیگر، بهترین استراتژی همیشه فشار دادن کلید F است.</p>",
      options: ["درست", "غلط"],
      horizontal: true,
    },
    {
      prompt:
        "<p style='text-align: left'>برای نشان دادن انتخابم دکمه‌های F  یا J را روی صفحه کلید فشار می دهم یا چیزی را فشار نمی دهم.</p>",
      options: ["درست", "غلط"],
      horizontal: true,
    },
    // {
    //   prompt:
    //     "<p style='text-align: left'>The game contains two different images.</p>",
    //   options: ["True", "False"],
    //   horizontal: true,
    // },
  ],
  required: true,
  data: {},
  on_load: function () {
    document.getElementById("jspsych-progressbar-container").style.visibility =
      "visible";
  },
  data: {},
  on_finish: function (data) {
	score = 0;
    var responses = data.response;
    var comprehensionTracker = [0, 0, 0, 0];
    var questionCounter = 0;

	for( const Q in correctAnswers) {
	
		if(correctAnswers[Q] == responses[Q]){
			score += 1;
			comprehensionTracker[questionCounter] = 1;
		}
		questionCounter += 1;
	}

    comprehensionRounds.push(comprehensionTracker);

	console.log(score);

    jsPsych.data.addDataToLastTrial({
      exp_stage: "instruction_questions",
      exp_part: "instructions",
      quiz_score: score,
    });
  },
};
