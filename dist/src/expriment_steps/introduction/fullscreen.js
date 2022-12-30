var fullscreen = {
  type: 'fullscreen',
  fullscreen_mode: true,
  data: {},
  on_finish: function(data) {
    jsPsych.data.addDataToLastTrial({
      exp_stage:"fullscreen",
      exp_part: "fullscreen"
    })
  }
};