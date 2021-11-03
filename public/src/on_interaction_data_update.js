var count_of_blur = 0;

var goodbye = "<h1 style= 'font-size:100px;'><strong> ⚠️ </strong></h1>" + 
      "<h3 style= 'font-size:xx-large; color:crimson'>Due to changing tab/window, your session has expired!</h3>" +
      "<p style= 'font-size:large;'>Unfortunately, because of this you can't continue the experiment and we would not be able you pay you.</p>" ;


function on_interaction_data_update(data) {
	var trial = jsPsych.currentTrial();
	try {
	trial.data.focus_screen = data.event;
	console.log(data.event);
		
	} catch (error) {
		console.log(error)
	}

	if(data.event == 'blur') {
		if (count_of_blur < 1) {


				if((jsPsych.data.getLastTrialData().values()[0].trial_type != 'external-html')) {

					if(jsPsych.data.getLastTrialData().values().length > 0){

					jsPsych.pauseExperiment();

					var msg_div = document.querySelector('#message-div');
					if (msg_div !== null) {
						msg_div.remove(); 
					}
					// hide the contents of the current trial
					jsPsych.getDisplayElement().style.visibility = 'hidden';
					
					jsPsych.getDisplayElement().insertAdjacentHTML('beforebegin',
						'<div id="message-div" style=" margin: auto; width: 700px; text-align: center;">'+
						'<p style= "font-size:100px;" >&#9888;&#65039;</p>'+
						'<p style=" font-size:x-large;color:crimson"><b>Please note that if you change the tab/window <u style="color:red">AGAIN</u> your session will be expired.</b></p>'+
						'<p>When you click the button below, the experiment will continue.</p>'+
						'<button id="jspsych-focus-btn" class="jspsych-btn">Continue</button></div>');
						count_of_blur = count_of_blur + 1;
					}
					

				}
		}
		else {
			if((jsPsych.data.getLastTrialData().values()[0].trial_type != 'external-html'))
			{
				if(jsPsych.data.getLastTrialData().values().length > 0){
					jsPsych.data.addDataToLastTrial({
						exp_final_status:"not_completed",
					  });
					jsPsych.endExperiment(goodbye);
				}
			}
		}
		
	}

	if(data.event == 'focus') {

		if(document.querySelector('#jspsych-focus-btn') == null){
			return;
		}
		document.querySelector('#jspsych-focus-btn').addEventListener('click', function() {

			var msg_div = document.querySelector('#message-div');
			if (msg_div !== null) {
	// 			// remove the message
				msg_div.remove(); 
	// 			// show the contents of the current trial again
				jsPsych.getDisplayElement().style.visibility = 'visible';
				jsPsych.resumeExperiment();
			}
			
		});
	}
}