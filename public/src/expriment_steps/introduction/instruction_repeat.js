var repeat_counts = 0;



// var instructions_texts = {
// 	welcome_page : 
// 		"<h2 class= 'instruction' style = 'font-size: xx-large'> <b>let's learn how the game works!</b>  &#127891; </h2><p> Click the <q>Next</q> button to continue.</p>",
  
// 	second_page : 
// 		"<div class= 'instruction'> <p>The game consists of individual trials in which you decide whether you do a simple task or not: "+
//     "indicate with a button press on which side of the screen you see a black circle. </p>" + 
//     "<p>Before the circle appears on the screen you will see one image that tells you</p>"+
//     "<ol> <li> if you have to do this button-press or not </li> <li>if you may win or lose money on the trial.</li></ol>  </div>" 
// 	// + "<img src='../img/page1.png' width='70%' height='70%'>"
// 	,
                 
// 	sixth_page : 
// 		"<div class= 'instruction'> <p>There are 4 types of images. One of them will appear at the beginning of each trial.</p> "+
// 		" <p>Depending on what image you see, by trial and error you must find out what is best to do (<u>to press a button</u> or <u>not to press it</u>) when you see the circle. </p>"+
// 		"<p>By finding out what to do for each image, you will increase your chance of winning and decrease the chance of losing. </p> </div>" + 
//   	"<img src='../img/page2.png' width='70%' height='70%'>",
  
// 	seventh_page : 
// 		"<div class= 'instruction'><p>Some of the images predict that you will <u>win</u> some money or <u>get nothing</u>.<br>Other images predict that you will <u>lose</u> some money or <u>lose nothing</u>.</p>"+
// 		"<p> Winning or Losing money is probabilistic, but by figuring out the best strategy for each image, you can optimize the probability of getting the better outcome. For example, losing nothing is better than losing some money. </p>"+
// 		"<p>For some images, the best strategy is to <u>press the button</u>. For some other images, the best strategy is to <u>withhold from responding</u>.</p></div>",
  
// 	ninth_page : 
// 		"<div class= 'instruction' style= 'text-align: center'><p><b>The meaning of each image will be constant throughout the game. </b></p> " +
// 		"<p> <b>However, the game is not easy, so we encourage exploration of all options.</b></p> </div>",
// 	ninth_p_page : 
// 	"<div class= 'instruction' style= 'text-align: center'><p><b>Please note that there is <u>no relation</u>  between the location of  circles and images.</b></p> </div>",
  
// 	third_page : 
// 		"<div class= 'instruction'><p> At the beginning of each trial you will see one image. You must not press any button at this point. </p> <p> Here, you must <u>DECIDE</u> if you will <u>press a button</u> or <u>withhold your response</u> in the next stage.</p></div> "+
//     " <p> Here is an example of the type of image you will see.</p> <img src='../img/stim/f3_1.png' width='30%' height='30%'>",
  
// 	forth_page : 
// 		"<div class= 'instruction'> <p> After a short delay, you will see a circle on one side of the red rectangle is on the center of the screen.</p> "+
//     "<p>Depending on what image you saw earlier, here, you execute your plan by either <u>pressing a button</u> (to indicate the circle side) or <u>withhold your response</u>. </p></div>" + 
//     "<img src = '../img/eighth_3_page.png' width='30%' height='30%'>",
  
// 	fifth_page : 
// 	"<p class= 'instruction'>  After a short delay, you will see one of three outcomes </p>" +
		
// 	"<table style='margin-left:auto;margin-right:auto;table-layout:fixed !important; width:650px;border-spacing:3em;'><tr>" +
// 	"<td style='font-size:40px;'>&#9989;&#128176;&#9989;</td> "+"<td> Win </td>" +
// 	"</tr><tr>" +
// 	"<td style='font-size:40px;'>&#10060;&#128184;&#10060;</td>"+"<td> Lose </td>" +
// 	"</tr><tr>" +
// 	"<td style='font-size:60px;'>&#x2796;</td>"+"<td> Neither win nor lose</td>" +
// 	"</tr></table>",
  
// 	tenth_page :  
// 		"<div class= 'instruction'> <p> <b>Remember that, in this task, the outcome is probabilistic.</b></p> "+ 
//     "<p> <b> This means that, sometimes even if you know the best strategy, you may still not win, or you may still end up losing.</b> </p>" +
//     "<p>  However, remember that for each image there is one best strategy (either <u>Press a Button</u> or <u>Withhold Response</u>) that is more advantageous than the other. <p></div>",
  
// 	eighth_page : 
// 		"<div class= 'instruction'> <p>So for the winning conditions you may either get &#9989;&#128176;&#9989; or &#x2796;</p> "+
//     "<p> For the losing condition you may either get &#x2796; or &#10060;&#128184;&#10060; </p>"+
//     "<p> By doing the right thing when the circle appears (either <u>Press a Button</u> or <u>Withhold Response</u>) you can make the most favorable outcome more frequent.  </p></div>" + 
//     "<table style='margin-left:auto;margin-right:auto;table-layout:fixed !important; width:650px;border-spacing:3em;'><tr>" +
//     "<td>Winning Condition</td> "+ "<td style='font-size:30px;'> &#9989;&#128176;&#9989; or &#x2796;</td>" +
//     "</tr><tr>" +
//     "<td s>Losing Condtion</td>" + "<td style='font-size:30px;'>&#x2796; or &#10060;&#128184;&#10060;</td>" +
//     "</tr></table>",
// 	eleventh_page : "<p class= 'instruction' >Now, we are going to check whether you've understood the previous instructions by asking some True/False questions." +
// 	 "</p>" +
// 	 "<p> Click 'Next' to begin the test.</p>"

// };
	

// var instructions = {
// 	type: 'instructions',
// 	pages: [
// 		instructions_texts.welcome_page, 
// 		instructions_texts.second_page,
// 		instructions_texts.third_page,
// 		instructions_texts.forth_page,
// 		instructions_texts.fifth_page,
// 		instructions_texts.sixth_page,
// 		instructions_texts.seventh_page,
// 		instructions_texts.eighth_page,
// 		instructions_texts.ninth_page,
// 		instructions_texts.ninth_p_page,
// 		instructions_texts.tenth_page,
// 		instructions_texts.eleventh_page
// 	],
// 	show_clickable_nav: true,
// 	show_page_number: true,
// 	show_progress_bar: false,
// 	data: {},
// 	on_load: function() {
// 		document.getElementById("jspsych-progressbar-container").style.visibility = "visible";
// 	},
// 	on_finish: function(data) {
// 		jsPsych.data.addDataToLastTrial({
			
// 			exp_stage:"instructions",
// 			exp_part: "instructions"
// 		})
// 	}
// }

var score = 0;
var comprehensionRounds = [];

var correctAnswers = { Q0: "غلط", Q1: "درست", Q2: "غلط" };

var instruction_questions = {
  type: "survey-multi-choice",
  questions: [
		{
		  prompt:
			"<p style='text-align: right' dir='rtl'>برای برخی از تصاویر، بهترین استراتژی همیشه فشار دادن کلید J است. برای برخی از تصاویر دیگر، بهترین استراتژی همیشه فشار دادن کلید F است.</p>",
		  options: ["درست", "غلط"],
		  horizontal: true,
		},
		{
		  prompt:
			"<p style='text-align: right' dir='rtl'>برای نشان دادن انتخابم دکمه‌های F  یا J را روی صفحه کلید فشار می دهم یا چیزی را فشار نمی دهم.</p>",
		  options: ["درست", "غلط"],
		  horizontal: true,
		},

	
    // {
    //   prompt:
    //     "<p style='text-align: left'>for each condition, I will get either ✅💰✅ or ❌💸❌.</p>",
    //   options: ["True", "False"],
    //   horizontal: true,
    // },
    {
      prompt:
        "<p style='text-align: right' dir='rtl'>بازی شامل فقط دو تصویر متفاوت است.</p>",
      options: ["درست", "غلط"],
      horizontal: true,
    },
  ],
  required: true,
  data: {},
  on_load: function () {
    document.getElementById("jspsych-progressbar-container").style.visibility =
      "visible";
  },
  data: {},
  on_finish: function (data) {

	if(is_expired_by_changing_tab){
		return;
	}
	score = 0;
    var responses = data.response;
    var comprehensionTracker = [0, 0, 0];
    var questionCounter = 0;

	for( const Q in correctAnswers) {
	
		if(correctAnswers[Q] == responses[Q]){
			score += 1;
			comprehensionTracker[questionCounter] = 1;
		}
		questionCounter += 1;
	}

    comprehensionRounds.push(comprehensionTracker);

	console.log("your score is: ",score);

	if ((score < 3) & (repeat_counts > 0) ) {
		jsPsych.data.addDataToLastTrial({
			exp_final_status:"not_completed_by_failing_quiz",
		  });
	// 	var goodbye_fail_quiz = "<h1 style= 'font-size:100px;'><strong> ⚠️ </strong></h1>" + 
    //   "<h3 style= 'font-size:xx-large; color:crimson'>Due to not passing the quiz, your session has expired!</h3>" +
    //   "<p style= 'font-size:large;'>Unfortunately, because of this you can't continue the experiment and we would not be able you pay you.</p>" ;
	// 	jsPsych.endExperiment(goodbye_fail_quiz);
	jsPsych.endExperiment();
	}

    jsPsych.data.addDataToLastTrial({
      exp_stage: "instruction_questions",
      exp_part: "instructions",
      quiz_score: score,
    });
  },
};


var instruction_question_feedback = {
	type: "instructions",
	data: {},
	pages: function () {
		if (score < 3) {
			return [ "<p style='font-size:150px;'>&#9888;&#65039;</p>" +
			  "<div class= 'instruction' dir='rtl'> نمره شما " +score + "/3 است. به نظر می‌رسد شما کاملا بازی را یاد نگرفته‌اید." +
			  // "<p><strong style='color:crimson'>Please note that if you are unable to answer the questions correctly <u style='color:red'>AGAIN</u>, we will not be able to pay you. </strong> </p>" +
			  "</div>" + "<p dir='rtl'> بر روی 'Next' کلیک‌ کنید تا آموزش را دوباره طی کنید.</p>"
	  
			];
		  } else {
			return ["<h1 class= 'instruction' dir='rtl'>عالی! همه پاسخ‌ها درست بودند! </h1> <p>برای ادامه 'Next' را کلیک کنید</p>"];
		  }
	},
	show_clickable_nav: true,
	on_finish: function(data) {
		

	  jsPsych.data.addDataToLastTrial({
		  exp_stage:"instruction_questions_feedback",
		  exp_part: "instructions"
	  })
  }
  };
  

var instructions_repeat = {
	timeline: [instructions, instruction_questions, instruction_question_feedback],
	data: {},
	conditional_function: function() {
		if(score == 3) {
			return false;
		} else {
			repeat_counts = repeat_counts +1;
			return true;
		}

	},
	// loop_function: function() {
	// 	if(score == 3) {
	// 		return false;
	// 	} else {
	// 		repeat_counts = repeat_counts +1;
	// 		console.log('repeat count:', repeat_counts);
	// 		jsPsych.endExperiment(goodbye_fail_quiz);
	// 		// return true;
			
	// 	}
	// },
};