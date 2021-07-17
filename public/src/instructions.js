

var instructions_texts = {

welcome_page : '<p>Welcome to the <b>Go or Withold Game</b>!</p> <p>This task will take approximately 20 minutes to complete. </p> <p> Click the <q>Next</q> button to continue.</p>',

second_page :   "<p align='left'> For each round of this experiment, you will be shown <b>four different abstract images, one at a time</b>.</p>"+
                "<p align='left'> When you see a image you will need to quickly make a decision to either press the spacebar or take no action.</p>"+
                "<p align='left'> Your goal is to learn which images you should press spacebar for and which images you should not press anything for by paying attention to when you gain and lose points.</p>",

third_page :             "<p align='left'> Again, <b>your goal is to learn which images you should press the space bar on your keyboard for, and which images you should not press anything for by paying attention to when you gain points(win), lose points(lose), or receive no points(neutral).</b></p>" +
"<p align='left'> During each round there will be four different types of images: </p>" +
"<p align='left'> <b>Go-to-Win</b>: in this condiiton you will want to press the spacebar to win points </p>" +
"<p align='left'> <b>No-Go-to-Win</b>: in this condition you will want to 'withold' (not press anything at all) to win points </p>" +
"<p align='left'> <b>Go-to-Avoid-Loss</b>: in this condition you will want to press the spacebar to avoid losing points  </p>" +
"<p align='left'> <b>No-Go-to-Avoid-Loss</b>: in this condition you will want to 'withold' (not press anything at all) to avoid losing points",


forth_page :             "<p align='left'> It is important to note that to make this game more challenging, the image types will give you the expected outcome most, <i> but not all </i> of the time, </p>" +
"<p align='left'> Remember, there are four conditions: Go-to-Win, No-Go-to-Win, Go-to-Avoid-Loss, No-Go-to-Avoid-Loss. </p>" +
"<p align='left'> <b>For the Go-to-Win and No-Go-to-Win you will either receive points (win) or no points (neutral). </b></p>" +
"<p align='left'> <b>For the Go-to-Avoid-Loss, No-Go-to-Avoid-Loss you will either receive no points (neutral) or you will lose points. </b></p>" +
"<p align='left'> For example, if you correctly press the spacebar for a Go-to-Win image, you have a high probability of winning points, but you might also get no points. </p>" +
"<p align='left'> or if you correctly did not press the spacebar for a No-Go-to-Avoid-Loss image, you have a high probability of getting a neutral feedback, but you might also lose points. </p>",

fifth_page :             '<table style="margin-left:auto;margin-right:auto;table-layout:fixed !important; width:650px;"><tr>' +
'<td><img src="img/go-nogo/stim/fsamp_1.png" style="width: 200px;"></td>' +
'</tr><tr>' +
'<td>Sample Image</td>' +
'</tr></table>',

sixth_page :             "<p align='left'> Each time you see a image, you should decide whether to press the spacebar or not before the image disappears.</p>"+
"<p align='left'> Once the time is up, you will see whether you won points, lost points, or if nothing happened (neutral). This will be indicated by the images below.</p>" +
// win/lose/maintain feedback images
'<table style="margin-left:auto;margin-right:auto;table-layout:fixed !important; width:650px;"><tr>' +
'<td><img src=' + win_fb + ' style="width: 200px;"></td>' +
'<td><img src=' + neutral_fb + ' style="height: 200px; "></td>' +
'<td><img src=' + lose_fb + ' style="height: 200px; "></td>' +
'</tr><tr>' +
'<td>Win Points</td><td>Neutral</td><td>Lose Points</td>' +
'</tr></table>',

seventh_page :             "<p align='left'>  You will complete 3 rounds, each round has a different set of images with correct/incorrect answers.</b> </p>" +
// "<p align='left'>  <b> Some colors may be used twice in different rounds. The colors are randomly selected for each round and the color of a image in one round has no effect on it's answer in another round. </b></p>" +
"<p align='left'>  Each round will consist of " + reps_in_exp*4 + " plays. </p> ",

eighth_page : "<p align='left'> Please try your best to learn the images and perform this task. The points you acquire in this task are proportional to the real cash bonus you will receive for the session.</p>" +
"<p align='left'> Please note that if you respond randomly, always press, or never press, we reserve the right to withold your bonus. </p>",

question_page : "<p align='left'> Next, you will answer some questions about this task and then do a practice trial to gain familiarity with the task. </p>" +
"<p>Press the <q>Next</q> button to answer the instruction comprehension questions.</p>"

};