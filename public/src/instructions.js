prob_outcome = 80   // keep it a whole number
reps_in_trial = 3  //reps_in_trial * 4 = actual number of reps in the trial/practice block (i.e. 15*4 = 60 )
reps_in_exp = 10    // reps_in_exp * 4 = actual number of reps in the experimental blocks
bonus_percent = 20/(reps_in_exp*2*4) 
fixed_bonus = 0     // 0
error_rate_cap = 0.7 // if error rate is higher than error_rate_cap*100 percent, a suspicion flag is triggered


var instructions_texts = {

welcome_page : "<h2 class= 'instruction'> <b>let's learn how the game works!</b>  &#127891; </h2><p> Click the <q>Next</q> button to continue.</p>",

second_page : "<p class= 'instruction'> The game consists of individual trials in which you have to decide whether you do a simple detection task: indicate with a button press in which side of the screen you see a circle."+
                " Before the circles appear on the screen you will see one image that tells you if you have to do this button press or not and if you may win or lose money on the trial.</p>" +
                "<img src='../img/page1.png' width='60%' height='60%'>",
               

third_page : "<p class= 'instruction'> There are 4 of these images and by trial and error you must find out which is the best strategy (to press the button or not to press the button) when you see the circle in order to win as much money as you can and avoid losing as much money as you can.</p>" + 
"<img src='../img/page2.png' width='40%' height='40%'>",


forth_page : "<p class= 'instruction'>Some of the images predict that you will win money. Whether you win or not is probabilistic, but by figuring out the best strategy you can optimize the probability of winning $1."+
                            " The same applies for the images that predict losses. Whether you lose or not is probabilistic, but by figuring out the best strategy you can minimize the probability of losing $1."+
                            "<br> For each image the best strategy may be to do the task but it may also be to hold your response. </p>",

// fifth_page : '<table style="margin-left:auto;margin-right:auto;table-layout:fixed !important; width:650px;"><tr>' +
// '<td><img src="img/go-nogo/stim/fsamp_1.png" style="width: 200px;"></td>' +
// '</tr><tr>' +
// '<td>Sample Image</td>' +
// '</tr></table>',

// sixth_page :             "<p align='left'> Each time you see a image, you should decide whether to press the spacebar or not before the image disappears.</p>"+
// "<p align='left'> Once the time is up, you will see whether you won points, lost points, or if nothing happened (neutral). This will be indicated by the images below.</p>" +
// // win/lose/maintain feedback images
// '<table style="margin-left:auto;margin-right:auto;table-layout:fixed !important; width:650px;"><tr>' +
// '<td><img src=' + win_fb + ' style="width: 200px;"></td>' +
// '<td><img src=' + neutral_fb + ' style="height: 200px; "></td>' +
// '<td><img src=' + lose_fb + ' style="height: 200px; "></td>' +
// '</tr><tr>' +
// '<td>Win Points</td><td>Neutral</td><td>Lose Points</td>' +
// '</tr></table>',

seventh_page : "<p class= 'instruction'> <b>The meaning of each image will be held constant throughout the task. However, the task is not easy, so I encourage exploration of all options.</b> </p>",
// "<p align='left'>  <b> Some colors may be used twice in different rounds. The colors are randomly selected for each round and the color of a image in one round has no effect on it's answer in another round. </b></p>" +
// "<p align='left'>  Each round will consist of " + reps_in_exp*4 + " plays. </p> "

eighth_1_page : "<p class= 'instruction'> On each trial you will see one image. You must not press any button at this point.</p> <p> Here is an example of the type of image you will see.</p> <img src='../img/stim/f3_1.png' width='30%' height='30%'>",


// " After a short delay you will see the circle and then you must do the detection task (indicate in which side of the screen the circle is)."+
// " After a short delay, you will see an upper arrow meaning that you win £1, a lower arrow meaning that you lose £1, and an horizontal bar meaning that you neither lose nor win."+
// " <b>Critically, in this task you may not win even after doing a correct response and you may lose even after doing a correct response.</b>"+
// " However, for each image there is one strategy more advantageous than the other.  </p>",

eighth_2_page : "<p class= 'instruction'> After a short delay you will see the circle and then you must do the detection task (indicate in which side of the screen the circle is) or holding your response.</p>" + 
                "<img src = '../img/eighth_3_page.png' width='30%' height='30%'>",


eighth_3_page : "<p class= 'instruction'>  After a short delay, you will see &#9989;&#128176;&#9989; meaning that you win 1$, &#10060;&#128184;&#10060; meaning that you lose 1$, and &#x2796; meaning that you neither lose nor win.</p>" +
                '<table style="margin-left:auto;margin-right:auto;table-layout:fixed !important; width:650px;border-spacing:3em;"><tr>' +
                '<td style="font-size:40px;">&#9989;&#128176;&#9989;</td> '+ '<td> Win 1$</td>' +
                '</tr><tr>' +
                '<td style="font-size:40px;">&#10060;&#128184;&#10060;</td>' + '<td> Lose 1$</td>' +
                '</tr><tr>' +
                '<td style="font-size:60px;">&#x2796;</td>' + '<td> Neither lose nor win.</td>' +
                '</tr></table>',
                // '<table style="margin-left:auto;margin-right:auto;table-layout:fixed; width:500px;border-spacing:3em;">' +
   



eighth_4_page :  "<p class= 'instruction'><b>Critically, in this task you may not win even after doing a correct response and you may lose even after doing a correct response.</b> <br>  However, for each image there is one strategy (do the task or holding your response) more advantageous than the other.</p>",

ninth_page : "<p class= 'instruction'>So for the winning conditions you may either get &#9989;&#128176;&#9989; or &#x2796; . For the losing condition you may either get &#10060;&#128184;&#10060; or the &#x2796;."+
            " By doing the right thing when the <b>circle</b> appears (do the task or holding your response) you can make the most favorable outcome more frequent.  </p>" + 
            '<table style="margin-left:auto;margin-right:auto;table-layout:fixed !important; width:650px;border-spacing:3em;"><tr>' +
            '<td>Winning Condition</td> '+ '<td style="font-size:30px;"> &#9989;&#128176;&#9989; or &#x2796;</td>' +
            '</tr><tr>' +
            '<td s>Losing Condtion</td>' + '<td style="font-size:30px;"> &#10060;&#128184;&#10060; or &#x2796;</td>' +
            '</tr></table>',

tenth_page : "<p class= 'instruction'>First, you will do 12 trials of the detection task and you will be informed when a response is correct and when it is incorrect or too late."+
            "<br><br> Thereafter you will proceed with the proper task, which is divided in 4 parts.  You can take a break for 1 minute between each part."+
            "<br><br> All what you win will be counted and you will get paid cash at the end of the experiment with a maximum of X$ and a minimum of Y$.</p>",


// question_page : "<p align='left'> Next, you will answer some questions about this task and then do a practice trial to gain familiarity with the task. </p>" +
// "<p>Press the <q>Next</q> button to answer the instruction comprehension questions.</p>"

};



var practice_instructions_texts = {

    welcome_page : "<h1 class= 'instruction' >Let's Practice! &#128170;</h1> <p>Click the <q>Next</q> button to continue.</p>",

    first_page : "<p class= 'instruction'> Here are some example images you will see during the practice. </p>" +
    '<table style="margin-left:auto;margin-right:auto;table-layout:fixed !important; width:500px;border-spacing:1em;"><tr>' +
    '<td> Image </td> '+ '<td> Best Strategy</td>' +
    '</tr><tr>' +
    '<td> <img src = "../img/stim/f1_1.png" width="40%" height="40%"> </td> '+ '<td> <img src = "../img/doing.png" width="40%" height="40%"></td>' +
    '</tr><tr>' +
    '<td> <img src = "../img/stim/f1_2.png" width="40%" height="40%"></td>' + '<td> <img src = "../img/holding.png" width="40%" height="40%"></td>' +
    '</tr><tr>' +
    '<td > <img src = "../img/stim/f1_3.png" width="40%" height="40%"> </td>' + '<td> <img src = "../img/doing.png" width="40%" height="40%"></td>' +
    '</tr><tr>' +
    '<td > <img src = "../img/stim/f1_4.png" width="40%" height="40%"> </td>' + '<td> <img src = "../img/holding.png" width="40%" height="40%"></td>' +
    '</tr></table>',


    first_prime_page : "<p class= 'instruction'> <b>You will see different images during the actual game. </b> <br> Please note that if you respond randomly, always press, or never press, we reserve the right to withold your bonus.</p>",

    second_page: "<h1 class= 'instruction' >Are you ready? &#128170;</h1> <p>Click the <q>Next</q> button to begin practice.</p>"

}