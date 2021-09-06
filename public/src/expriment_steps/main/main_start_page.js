var main_start_page = {
  type: 'html-button-response',
  stimulus: "<h1 class= 'instruction' style = 'font-size: xx-large' >Let's Play! Are you ready? &#128170;</h1> <p class= 'instruction'> Please note that if you respond randomly, always press, or never press, We will not be able to pay you.</p> <p>Click on start.</p>",
  data: {},
  choices: ['Start'],
  on_load: function() {
		document.getElementById("jspsych-progressbar-container").style.visibility = "visible";
	},
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"main_start",
      exp_part:"main"
    })
  }
}