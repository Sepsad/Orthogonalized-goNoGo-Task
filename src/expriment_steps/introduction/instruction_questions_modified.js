var score = 0;
var comprehensionRounds = [];

var correctAnswers = { Q0: "False", Q1: "True", Q2: "False", Q3: "False" };

var instruction_questions = {
  type: "survey-multi-choice",
  questions: [
    {
      prompt:
        "<p style='text-align: left'>For some images, the best strategy is always to press the right arrow key. For some other images, the best strategy is always to press the left arrow key.</p>",
      options: ["True", "False"],
      horizontal: true,
    },
    {
      prompt:
        "<p style='text-align: left'>I either press the left or right arrow on my keyboard (to indicate my choice) or press nothing.</p>",
      options: ["True", "False"],
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
