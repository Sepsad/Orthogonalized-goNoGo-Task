function on_interaction_data_update(data) {
	var trial = jsPsych.currentTrial();
	trial.data.focus_screen = data.event;
	console.log(trial.data)
	// trial.data.event = data.event;
	console.log(data.event);

	if(data.event == 'fullscreenexit' || data.event == 'blur') {
		jsPsych.pauseExperiment();

		var msg_div = document.querySelector('#message-div');
		if (msg_div !== null) {
			msg_div.remove(); 
		}
		// hide the contents of the current trial
		jsPsych.getDisplayElement().style.visibility = 'hidden';

		

		// add a div that contains a message and button to re-enter fullscreen
		if(data.event == 'fullscreenexit'){
			jsPsych.getDisplayElement().insertAdjacentHTML('beforebegin',
			'<div id="message-div" style="margin: auto; width: 100%; text-align: center;">'+
			'<p style= "font-size:150px;" >&#9888;&#65039;</p>'+
			'<p>Please remain in fullscreen mode during the task.</p>'+
			'<p>When you click the button below, you will enter fullscreen mode.</p>'+
			'<button id="jspsych-fullscreen-btn" class="jspsych-btn">Fullscreen</button></div>');

			document.querySelector('#jspsych-fullscreen-btn').addEventListener('click', function() {
				var element = document.documentElement;
				if (element.requestFullscreen) {
					element.requestFullscreen();
				} else if (element.mozRequestFullScreen) {
					element.mozRequestFullScreen();
				} else if (element.webkitRequestFullscreen) {
					element.webkitRequestFullscreen();
				} else if (element.msRequestFullscreen) {
					element.msRequestFullscreen();
				}
			});
		}

		if(data.event == 'blur') {
			jsPsych.getDisplayElement().insertAdjacentHTML('beforebegin',
			'<div id="message-div" style="margin: auto; width: 100%; text-align: center;">'+
			'<p style= "font-size:150px;" >&#9888;&#65039;</p>'+
			'<p>Please remain in this window during the task.</p>'+
			'<p>When you click the button below, the experiment will continue.</p>'+
			'<button id="jspsych-focus-btn" class="jspsych-btn">Continue</button></div>');

		}
	}
	if(data.event == 'fullscreenenter' ) {        
		// when entering fullscreen, check to see if the participant is re-entering fullscreen, 
		// i.e. the 'please enter fullscreen' message is on the page
		var msg_div = document.querySelector('#message-div');
		if (msg_div !== null) {
			// remove the message
			msg_div.remove(); 
			// show the contents of the current trial again
			jsPsych.getDisplayElement().style.visibility = 'visible';
			jsPsych.resumeExperiment();
		}
	}
	if(data.event == 'focus') {

		if(document.querySelector('#jspsych-focus-btn') == null){
			return;
		}

		document.querySelector('#jspsych-focus-btn').addEventListener('click', function() {

			var msg_div = document.querySelector('#message-div');
			if (msg_div !== null) {
				// remove the message
				msg_div.remove(); 
				// show the contents of the current trial again
				jsPsych.getDisplayElement().style.visibility = 'visible';
				
				jsPsych.resumeExperiment();
			}
			var element = document.documentElement;
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen();
			} else if (element.msRequestFullscreen) {
				element.msRequestFullscreen();
			}
		});
	}
}