var survey_feedback = {
    type: 'survey-text',
    questions: [{prompt: 'We\'re always trying to improve. Would you mind letting us know if you have any feedback? </br> Click "Submit Answer" to finish the experiment.',
                 value: 'Feedbacks',
                 rows: 20,
                 columns: 100}],
    button_label: 'Submit Answer',
    on_load: function() {
      document.getElementById("jspsych-progressbar-container").style.visibility = "visible";
    },
  };