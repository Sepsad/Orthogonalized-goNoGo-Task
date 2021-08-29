var instruction_questions = {
	type:'survey-multi-choice',
	questions: [
		{
			prompt: "What action do you take when you see the circle?",
			options: [
				"I either click a button on the screen or click nothing",
				"I either press the space bar or press nothing.", 
				"I either press the left or right arrow on my keyboard to indicate my choice.", 
				"I either press the left or right arrow on my keyboard to indicate my choice or press nothing."
			]
		},
		{
			prompt: "In the game, how many different images will you see?",
			options: ["1", "2", "3", "4" ]
		}
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