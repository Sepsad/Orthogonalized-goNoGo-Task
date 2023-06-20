var main_start_page = {
  type: 'html-button-response',
  stimulus: "<h1 class= 'instruction' style = 'font-size: xx-large' dir='rtl'>آماده شروع بازی اصلی  هستید؟ &#128170;</h1> <p class= 'instruction' dir='rtl'> لطفا توجه داشته باشید اگر <b>  بازی را کاملا به صورت تصادفی پاسخ دهید و قوائد بازی پیروی نکنید، </b> ما قادر به پرداخت نخواهیم بود.</p> <p dir='rtl'></p>روی start کلیک کنید.</p>",
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