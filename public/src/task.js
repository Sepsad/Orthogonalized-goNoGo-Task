stimuli_duration = 1000
feedback_duration = 2000 



squares0 = ['f1_1', 'f1_2', 'f1_3', 'f1_4']




win_feedback = "<p style='font-size:150px;'>&#9989;&#128176;&#9989;</p>"
lose_feedback = "<p style='font-size:150px;'>&#10060;&#128184;&#10060;</p>"
neutral_feedback = "<p style='font-size:200px;'>&#x2796;</p>"


prob_outcome = 80   // keep it a whole number
reps_in_trial = 3  //reps_in_trial * 4 = actual number of reps in the trial/practice block (i.e. 15*4 = 60 )
reps_in_exp = 10    // reps_in_exp * 4 = actual number of reps in the experimental blocks
bonus_percent = 20/(reps_in_exp*2*4) 
fixed_bonus = 0     // 0

const images = ['../img/welcome.gif', 
                "../img/stim/f1_1.png","../img/stim/f1_2.png", "../img/stim/f1_3.png","../img/stim/f1_4.png",
                '../img/page1.png', '../img/page2.png', '../img/stim/f3_1.png', '../img/eighth_3_page.png',
                "../img/doing.png", "../img/holding.png",
                "../img/stim/f4_1.png","../img/stim/f4_2.png", "../img/stim/f4_3.png","../img/stim/f4_4.png"
              ];

var timeline = [];

// full screen mode 



var first_welcome_page ={
  type: 'html-button-response',
  stimulus: "<img src='../img/welcome.gif' style='height: 200px; '></img> <h1>Welcome to Go- NoGO Game</h1> <p> This game will take approximately 25 minutes to complete <br>Click on START when you are ready!</p>",
  choices: ['START'],
  data: {},
  on_finish: function() {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"first_welcome",
    })
  },
  on_start: function() {

    preloadImages(images);
  }
  
}

timeline.push(first_welcome_page)


var subjectId_page = {
    type: 'survey-text'
    ,
    data: {},
    questions: [
      {prompt: "Please enter your Email (we'd use that as your username.)", columns: 50, required: true, name: 'email'},
      {prompt: 'Please enter your phone number so we could inform you of the next experiment', columns: 50, required: true, name: 'phoneNumber'},
      ],
    preamble: "<h1>Hello</h1>"
  };

  timeline.push(subjectId_page)


var fullscreen_intro = {
    type: 'instructions',
    pages: [ 
        "<p class= 'instruction'>On the next screen you will be asked to put your browser in full screen mode." +
        "<br><br>After entering full screen mode it is very important that you do not exit, switch tabs, minimize, or adjust the browser for the remainder of the game." +
        // "Doing so changes the display of the game and the game does not pause once started." +
        "<br><br><b>Any of these will disturb the experiment and if the experiment is interrupted, we will not be able to pay you.</b></p>",
        ],
    show_clickable_nav: true,
    data: {},

    on_finish: function(data) {
        jsPsych.data.addDataToLastTrial({
            exp_stage:"fullscreen",
            // primary_key:data.trial_index,
            exp_part: "fullscreen"
        })
    }
};

timeline.push(fullscreen_intro)



var fullscreen = {
  type: 'fullscreen',
  fullscreen_mode: true,
  data: {},
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"fullscreen",
      // primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index,
      exp_part: "fullscreen"
    })
  }
};
timeline.push(fullscreen)



timeline.push(instructions)


//  instruction Questions
timeline.push(instruction_questions);

// instructuon Questions
timeline.push(instructions_understood);






// practice code 

var practice_instructions_texts = {

  welcome_page : "<h1 class= 'instruction' style = 'font-size: xx-large' >Let's Practice! &#128170;</h1> <p>Click the <q>Next</q> button to continue.</p>",

  first_page : "<p class= 'instruction'> Here are some example images you will see during the practice. </p>" +
  '<table style="margin-left:auto;margin-right:auto;table-layout:fixed !important; width:500px;border-spacing:1em;"><tr>' +
  '<td> Image </td> '+ '<td> Best Strategy</td>' + '<td> Outcome</td>' +
  '</tr><tr>' +
  '<td> <img src = "../img/stim/f1_1.png" width="40%" height="40%"> </td> '+ '<td> <img src = "../img/doing.png" width="50%" height="50%"></td>' + '<td style="font-size:15px;"> &#9989;&#128176;&#9989; or &#x2796;</td>' +
  '</tr><tr>' +
  '<td> <img src = "../img/stim/f1_2.png" width="40%" height="40%"></td>' + '<td> <img src = "../img/holding.png" width="50%" height="50%"></td>' + '<td style="font-size:15px;"> &#9989;&#128176;&#9989; or &#x2796;</td>' +
  '</tr><tr>' +
  '<td > <img src = "../img/stim/f1_3.png" width="40%" height="40%"> </td>' + '<td> <img src = "../img/doing.png" width="50%" height="50%"></td>' + '<td style="font-size:15px;"> &#10060;&#128184;&#10060; or &#x2796;</td>' +
  '</tr><tr>' +
  '<td > <img src = "../img/stim/f1_4.png" width="40%" height="40%"> </td>' + '<td> <img src = "../img/holding.png" width="50%" height="50%"></td>' + '<td style="font-size:15px;"> &#10060;&#128184;&#10060; or &#x2796;</td>' +
  '</tr></table>',


  first_prime_page : "<p class= 'instruction'> <b>You will see different images during the actual game. </b> <br> Please note that if you respond randomly, always press, or never press, We will not be able to pay you.</p>",

  second_page: "<h1 class= 'instruction' style = 'font-size: xx-large' >Are you ready? &#128170;</h1> <p>Click the <q>Next</q> button to begin practice.</p>"

}

var start_trial = {
  type: 'instructions',
  pages: [practice_instructions_texts.welcome_page,
          practice_instructions_texts.first_page,
          practice_instructions_texts.first_prime_page,
          practice_instructions_texts.second_page,
        ],
  show_clickable_nav: true,
  show_page_number: true,
  data: {},
  on_finish: function() {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"practice_start",
      // primary_key: subjectId + '_' + weekId + '_' + expId + '_' + data.trial_index,
      exp_part: "practice"
      })
    }
}

timeline.push(start_trial);


//stimulus
squares0 = ['f1_1', 'f1_2', 'f1_3', 'f1_4']
stim0 = make_stimuli(true, (squares0), 'block_p')


// practice trial all together
var practice_trial_procedure = {
  timeline: [practice_stimulus, practice_fixation_before_target_detection,
              practice_target_detection_task, practice_fixation_before_feedback,
              practice_feedback, practice_fixation_before_stimulus],

  timeline_variables: stim0,
  repetitions: reps_in_trial,
  randomize_order: true
}
timeline.push(practice_trial_procedure);


timeline.push(end_practice_trial);


// main code
timeline.push(start_main);


main_squares = shuffler(['f4_1', 'f4_2', 'f4_3', 'f4_4']);

stim1 = make_stimuli(false, main_squares, 'block_1')
stim2 = make_stimuli(false, main_squares, 'block_2')
stim3 = make_stimuli(false, main_squares, 'block_3')
stim4 = make_stimuli(false, main_squares, 'block_4')


stims = [[stim1, "one fourth"], [stim2, "half"],[stim3, "three fourth"], [stim4]]


for (i = 0; i < stims.length; i++){
  num = i+1
  var main_trial_procedure = {
    timeline: [main_stimulus, main_fixation_before_target_detection, 
                main_target_detection_task, main_fixation_before_feedback,
                main_feedback, main_fixation_before_stimulus],
  
    timeline_variables: stims[i][0],
    repetitions: reps_in_exp,
    randomize_order: true
  }

  timeline.push(main_trial_procedure)
  if (stims[i].length == 2){
    timeline.push(between_block(stims[i][1]))
  }
}

timeline.push(end_main_bonus_block);

// demographic survey code






// initialize experiment
jsPsych.init({
    timeline: timeline,
    on_interaction_data_update: function (data) {
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
    },
    on_finish: function() {     // for testing purposes 
      jsPsych.data.displayData();
      // jsPsych.data.get().localSave('csv','gng_data.csv');
    },
  });

// instruction blcok








