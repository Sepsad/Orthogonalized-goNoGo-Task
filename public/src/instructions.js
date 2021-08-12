var instructions_texts = {

welcome_page : "<h2 class= 'instruction' style = 'font-size: xx-large'> <b>let's learn how the game works!</b>  &#127891; </h2><p> Click the <q>Next</q> button to continue.</p>",

second_page : "<div class= 'instruction'> <p>The game consists of individual trials in which you decide whether you do a simple task or not: "+
                "indicate with a button press on which side of the screen you see a black circle. </p>" + 
                "<p>Before the circle appears on the screen you will see one image that tells you</p>"+
                "<ol> <li> if you have to do this button-press or not </li> <li>if you may win or lose money on the trial.</li></ol>  </div>" +

                "<img src='../img/page1.png' width='70%' height='70%'>",
               

third_page : "<div class= 'instruction'> <p>There are 4 of these images. One image will appear at the beginning of each round. </p> "+
             " <p>Depending on what image you see, by trial and error you must find out what is best to do (to press a button or not to press it) when you see the circle. </p>"+
             "<p>By finding out what to do for each image, you will increase your chances of winning and decrease the chance of losing. </p> </div>" + 
"<img src='../img/page2.png' width='70%' height='70%'>",


forth_page : "<div class= 'instruction'><p>Some of the images predict that you will win some money or get nothing.<br>Other images predict that you will lose some money or lose nothing.</p>"+
                "<p> Winning or Losing money is probabilistic, but by figuring out the best strategy for each image, you can optimize the probability getting the better outcome. For example, losing nothing is better than losing some money. </p>"+
                "<p>For some images, the best strategy is to press the button. For some other images, the best strategy is to withhold from responding.</p></div>",


seventh_page : "<p class= 'instruction'> <b>The meaning of each image will be constant throughout the game. <br> However, the game is not easy, so we encourage exploration of all options.</b> </p>",


eighth_1_page : "<div class= 'instruction'><p> On each trial you will see one image. You must not press any button at this point. </p> <p> Here, you must DECIDE if you will press a button or withhold your response in the next stage.</p></div> "+
                " <p> Here is an example of the type of image you will see.</p> <img src='../img/stim/f3_1.png' width='30%' height='30%'>",



eighth_2_page : "<div class= 'instruction'> <p> After a short delay, you will see a circle on one side of the screen. </p> "+
                " <p>Depending on what image you saw earlier, here, you execute your plan by either <u>pressing a button</u> (to indicate the circle side) or <u>withhold your response</u>. </p></div>" + 
                "<img src = '../img/eighth_3_page.png' width='50%' height='50%'>",


eighth_3_page : "<p class= 'instruction'>  After a short delay, you will see one of three outcomes: </p>" +
                '<table style="margin-left:auto;margin-right:auto;table-layout:fixed !important; width:650px;border-spacing:3em;"><tr>' +
                '<td style="font-size:40px;">&#9989;&#128176;&#9989;</td> '+ '<td> Win </td>' +
                '</tr><tr>' +
                '<td style="font-size:40px;">&#10060;&#128184;&#10060;</td>' + '<td> Lose </td>' +
                '</tr><tr>' +
                '<td style="font-size:60px;">&#x2796;</td>' + '<td> Neither win nor lose</td>' +
                '</tr></table>',

   



eighth_4_page :  "<div class= 'instruction'> <p> <b>Remember that, in this task, the outcome is probabilistic.</b></p> "+ 
                 "<p> <b> This means that, sometimes even if you know the best strategy, you may still not win, or you may still end up losing.</b> </p>" +
                " <p>  However, remember that for each image there is one best strategy (either <u>Press a Button</u> or <u>Withhold Response</u>) that is more advantageous than the other. <p></div>",

ninth_page : "<div class= 'instruction'> <p>So for the winning conditions you may either get &#9989;&#128176;&#9989; or &#x2796;</p> "+
             "<p> For the losing condition you may either get &#10060;&#128184;&#10060; or the &#x2796; </p>"+
             "<p> By doing the right thing when the circle appears (either <u>Press a Button</u> or <u>Withhold Response</u>) you can make the most favorable outcome more frequent.  </p></div>" + 
            '<table style="margin-left:auto;margin-right:auto;table-layout:fixed !important; width:650px;border-spacing:3em;"><tr>' +
            '<td>Winning Condition</td> '+ '<td style="font-size:30px;"> &#9989;&#128176;&#9989; or &#x2796;</td>' +
            '</tr><tr>' +
            '<td s>Losing Condtion</td>' + '<td style="font-size:30px;"> &#10060;&#128184;&#10060; or &#x2796;</td>' +
            '</tr></table>',

tenth_page : "<div class= 'instruction'> <p>First, you will do 12 trials of the Practice and you will be informed when a response is correct and when it is incorrect or too late.</p>"+
            "<p>Thereafter you will proceed with the proper game, which is divided in 4 parts. You can take a break for 1 minute between each part.</p>"+
            "<p> Your total winnings will be counted and you will get paid at the end of the experiment with a maximum of X$ and a minimum of Y$.</p> </div>",


};