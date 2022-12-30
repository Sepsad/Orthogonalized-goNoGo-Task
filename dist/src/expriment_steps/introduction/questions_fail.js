var question_fail = {
	type: 'instructions',
	pages: [
		"<p style='font-size:150px;'>&#9888;&#65039;</p>"+
		"<div class= 'instruction'> <p> Hmm...Based on one or more of your answers to the previous questions, it looks as if you may not fully understand the task. </p> " +
		"<p> If you are unable to answer the questions correctly again, we will not be able to pay you. </p>" +
		"<p> Please click 'Next' to return to the instructions. </div>"
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