var before_instruction_text = {

    first: "<p class= 'before_instruction'> We are going to do a game that involves images to learn what is the best strategy for them. </p>",
    second: "<p class= 'before_instruction'> We will begin with some detailed instructions about the game. After that, your understanding of the game will be tested, and You must get <b>all</b> the comprehension questions right. </p>",
    third: "<p class= 'before_instruction'> If you get any wrong, we'll go through the instructions and test your understanding again until you get all the test questions correct. </p>",
    forth: "<p class= 'before_instruction'> Now, we will start going through the instructions.  </p>"
}

var before_instructions = {
	type: 'instructions',
	pages: [
		before_instruction_text.first, 
		before_instruction_text.second,
		before_instruction_text.third,
		before_instruction_text.forth,
	],
	show_clickable_nav: true,
	data: {},
	on_load: function() {
		document.getElementById("jspsych-progressbar-container").style.visibility = "visible";
	},
	on_finish: function(data) {
		jsPsych.data.addDataToLastTrial({
			
			exp_stage:"before_instructions",
			exp_part: "before_instructions"
		})
	}
}
