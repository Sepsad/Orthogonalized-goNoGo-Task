var first_welcome_page ={
	type: 'html-button-response',
	stimulus: "<img src='../img/welcome.gif' style='height: 200px; '></img> "+
	"<h1  dir='rtl'>به بازی  Go/NoGO خوش آمدید.</h1> <p  dir='rtl'>هرکدام از شما   <u>۴۰۰ تومان + جایزه تلاش</u> برای انجام این بازی خواهید گرفت.</p> <p  dir='rtl'> این بازی حدود ۲۵ دقیقه طول خواهد کشید.  <br>هر موقع آماده بودید START را فشار دهید</p>",
	choices: ['START'],
	data: {},
	on_load: function() {
		document.getElementById("jspsych-progressbar-container").style.visibility = "hidden";
	},
	on_finish: function() {
		jsPsych.data.addDataToLastTrial({
		exp_stage:"first_welcome",
		})
	},
	// on_start: function() {
	// 	// preloadImages(images);
	// 	// return
	// }
}