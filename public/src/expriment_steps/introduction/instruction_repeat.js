var instructions_repeat = {
	timeline: [instructions, instruction_questions, instruction_question_feedback],
	conditional_function: function() {
		if(score == 4) {
			return false;
		} else {
			return true;
		}

	},
	loop_function: function() {
		if(score == 4) {
			return false;
		} else {
			return true;
		}
	},
};