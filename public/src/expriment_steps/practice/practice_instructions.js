var practice_instructions_texts = {
	zeroth_page:
	"<div class= 'instruction'> <p>From here on in, you will do 12 trials of the Practice and you will be informed when a response is correct and when it is incorrect or too late.</p>"+
"<p>Thereafter you will proceed with the proper game, which is divided in 3 parts. You can take a break for 1 minute between each part.</p>"+
"<p> Your total winnings will be counted and you will get paid at the end of the experiment with a minimum of 5$.</p> </div>",
	welcome_page : 
		"<h1 class= 'instruction' style = 'font-size: xx-large' >Let's Practice! &#128170;</h1> <p>Click the <q>Next</q> button to continue.</p>",

	first_page : 
		"<p class= 'instruction'> Here are <u>images</u> you will see during the practice.<br> Note that you will get the <u>outcome</u> by taking the <u>best strategy</u>. </p>" +
		"<table style='margin-left:auto;margin-right:auto;table-layout:fixed !important; width:50% ;border-spacing:1em;'><tr>" +
		"<td> Image </td> "+ "<td> Best strategy <br> of image</td>" + "<td> Outcome by taking <br> best strategy</td>" +
		"</tr><tr>" +
		"<td> <img src = '../img/stim/f1_1.png' width='80' height='80'> </td>" +
		"<td> <img src = '../img/doing.png' width='100' height='80'></td>" +
		"<td style='font-size:15px;'> &#9989;&#128176;&#9989; or &#x2796;</td>" +
		"</tr><tr>" +
		"<td> <img src = '../img/stim/f1_2.png' width='80' height='80'></td>" +
		"<td> <img src = '../img/holding.png' width='100' height='80'></td>" +
		"<td style='font-size:15px;'> &#9989;&#128176;&#9989; or &#x2796;</td>" +
		"</tr><tr>" +
		"<td > <img src = '../img/stim/f1_3.png' width='80' height='80'> </td>" +
		"<td> <img src = '../img/doing.png' width='100' height='80'></td>" +
		"<td style='font-size:15px;'> &#10060;&#128184;&#10060; or &#x2796;</td>" +
		"</tr><tr>" +
		"<td > <img src = '../img/stim/f1_4.png' width='80' height='80'> </td>" + 
		"<td> <img src = '../img/holding.png' width='100' height='80'></td>" +
		"<td style='font-size:15px;'> &#10060;&#128184;&#10060; or &#x2796;</td>" +
		"</tr></table>",


	first_prime_page : 
		"<p style='font-size:60px'> &#10071; </p>" + 
		"<p class= 'instruction'> <b>You will see different images during the actual game. </b> </p>",
	first_zegond_page: "<p style='font-size:60px'> &#10071; </p>" + 
	"<p class= 'instruction'>Please note that if you respond <b>randomly, always press, or never press,</b> We will not be able to pay you.</p>",

	second_page: 
		"<h1 class= 'instruction' style = 'font-size: xx-large' >Are you ready? &#128170;</h1>  <p>Click the <q>Next</q> button to begin practice.</p>"
  
}

var practice_instruction = {
	type: 'instructions',
	pages: [
		practice_instructions_texts.zeroth_page,
		practice_instructions_texts.welcome_page,
		practice_instructions_texts.first_page,
		practice_instructions_texts.first_prime_page,
		practice_instructions_texts.first_zegond_page,
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