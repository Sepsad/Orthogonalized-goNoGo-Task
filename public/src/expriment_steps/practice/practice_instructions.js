var practice_instructions_texts = {
	welcome_page : 
		"<h1 class= 'instruction' style = 'font-size: xx-large' >Let's Practice! &#128170;</h1> <p>Click the <q>Next</q> button to continue.</p>",

	first_page : 
		"<p class= 'instruction'> Here are images you will see during the practice.<br> Note that you will get the outcome by taking the best strategy. </p>" +
		"<table style='margin-left:auto;margin-right:auto;table-layout:fixed !important; width:500px;border-spacing:1em;'><tr>" +
		"<td> Image </td> '+ '<td> Best Strategy</td>' + '<td> Outcome</td>" +
		"</tr><tr>" +
		"<td> <img src = '../img/stim/f1_1.png' width='40%' height='40%'> </td>" +
		"<td> <img src = '../img/doing.png' width='50%' height='50%'></td>" +
		"<td style='font-size:15px;'> &#9989;&#128176;&#9989; or &#x2796;</td>" +
		"</tr><tr>" +
		"<td> <img src = '../img/stim/f1_2.png' width='40%' height='40%'></td>" +
		"<td> <img src = '../img/holding.png' width='50%' height='50%'></td>" +
		"<td style='font-size:15px;'> &#9989;&#128176;&#9989; or &#x2796;</td>" +
		"</tr><tr>" +
		"<td > <img src = '../img/stim/f1_3.png' width='40%' height='40%'> </td>" +
		"<td> <img src = '../img/doing.png' width='50%' height='50%'></td>" +
		"<td style='font-size:15px;'> &#10060;&#128184;&#10060; or &#x2796;</td>" +
		"</tr><tr>" +
		"<td > <img src = '../img/stim/f1_4.png' width='40%' height='40%'> </td>" + 
		"<td> <img src = '../img/holding.png' width='50%' height='50%'></td>" +
		"<td style='font-size:15px;'> &#10060;&#128184;&#10060; or &#x2796;</td>" +
		"</tr></table>",

	first_prime_page : 
		"<p class= 'instruction'> <b>You will see different images during the actual game. </b> <br> Please note that if you respond randomly, always press, or never press, We will not be able to pay you.</p>",

	second_page: 
		"<h1 class= 'instruction' style = 'font-size: xx-large' >Are you ready? &#128170;</h1> <p>Click the <q>Next</q> button to begin practice.</p>"
  
}

var practice_instruction = {
	type: 'instructions',
	pages: [
		practice_instructions_texts.welcome_page,
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