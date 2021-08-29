var instructions_repeat = {
	timeline: [question_fail, instructions, instruction_questions],
	conditional_function: function() {
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