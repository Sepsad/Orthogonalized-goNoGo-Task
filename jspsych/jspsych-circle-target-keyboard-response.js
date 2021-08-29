/**
 * jspsych-canvas-keyboard-response
 * Sepehr Saeedpour (modified from Josh de Leeuw)
 *
 * a jsPsych plugin for displaying a circle detection task and getting a keyboard response
 *
 *
 **/


 jsPsych.plugins["circle-keyboard-response"] = (function () {

    var plugin = {};
  
    plugin.info = {
      name: 'circle-keyboard-response',
      description: '',
      parameters: {
        circle_size: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Ball Size',
          default: 40,
          description: 'Size of random circle'
        }
        ,
        choices: {
          type: jsPsych.plugins.parameterType.KEY,
          array: true,
          pretty_name: 'Choices',
          default: jsPsych.ALL_KEYS,
          description: 'The keys the subject is allowed to press to respond to the stimulus.'
        },
        prompt: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Prompt',
          default: null,
          description: 'Any content here will be displayed below the stimulus.'
        },
        stimulus_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Stimulus duration',
          default: null,
          description: 'How long to hide the stimulus.'
        },
        trial_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Trial duration',
          default: null,
          description: 'How long to show trial before it ends.'
        },
        response_ends_trial: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Response ends trial',
          default: true,
          description: 'If true, trial will end when subject makes a response.'
        },
        canvas_size: {
          type: jsPsych.plugins.parameterType.INT,
          array: true,
          pretty_name: 'Canvas size',
          default: [300, 500],
          description: 'Array containing the height (first value) and width (second value) of the canvas element.'
        }
  
      }
    }
  
    plugin.trial = function (display_element, trial) {
  
      var new_html = '<div id="xdd">' + '<canvas id="jspsych-circle-stimulus" height="' + trial.canvas_size[0] + '" width="' + trial.canvas_size[1] + '"></canvas>' + '</div>';
      // add prompt
      if (trial.prompt !== null) {
        new_html += trial.prompt;
      }
  
      // draw
      display_element.innerHTML = new_html;

      // draw circle
      let c = document.getElementById("jspsych-circle-stimulus")
      var context = c.getContext('2d');
      const side = jsPsych.randomization.sampleWithoutReplacement(['arrowleft','arrowright'], 1)
      var centerX = 0
      if(side == 'arrowleft'){
        centerX = Math.round(Math.random()*150) + 50;
      }
      else if (side == 'arrowright'){
        centerX = Math.round(Math.random()*150) + 300;
      }      
      const centerY = Math.round(Math.random()*200) + 50;
      const radius = trial.circle_size;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'black';
      context.fill();

      // store response
      var response = {
        rt: null,
        key: null
      };
  
      // function to end trial when it is time
      var end_trial = function () {
  
        // kill any remaining setTimeout handlers
        jsPsych.pluginAPI.clearAllTimeouts();
  
        // kill keyboard listeners
        if (typeof keyboardListener !== 'undefined') {
          jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        }
  
        // gather the data to store for the trial
        var trial_data = {
          rt: response.rt,
          response: response.key,
          side: side[0],
          x_circle: centerX - trial.canvas_size[1]/2 ,
          y_circle: centerY - trial.canvas_size[0]/2 
        };
  
        // clear the display
        display_element.innerHTML = '';
  
        // move on to the next trial
        jsPsych.finishTrial(trial_data);
      };
  
      // function to handle responses by the subject
      var after_response = function (info) {
  
        // after a valid response, the stimulus will have the CSS class 'responded'
        // which can be used to provide visual feedback that a response was recorded
        display_element.querySelector('#jspsych-circle-stimulus').className += ' responded';
  
        // only record the first response
        if (response.key == null) {
          response = info;
        }
  
        if (trial.response_ends_trial) {
          end_trial();
        }
      };
  
      // start the response listener
      if (trial.choices != jsPsych.NO_KEYS) {
        var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: trial.choices,
          rt_method: 'performance',
          persist: false,
          allow_held_key: false
        });
      }
  
      // hide stimulus if stimulus_duration is set
      if (trial.stimulus_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function () {
          display_element.querySelector('#jspsych-circle-stimulus').style.visibility = 'hidden';
        }, trial.stimulus_duration);
      }
  
      // end trial if trial_duration is set
      if (trial.trial_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function () {
          end_trial();
        }, trial.trial_duration);
      }
  
    };
  
    return plugin;
  })();
  