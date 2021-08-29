squares0 = ['f1_1', 'f1_2', 'f1_3', 'f1_4']

win_feedback = "<p style='font-size:150px;'>&#9989;&#128176;&#9989;</p>"
lose_feedback = "<p style='font-size:150px;'>&#10060;&#128184;&#10060;</p>"
neutral_feedback = "<p style='font-size:200px;'>&#x2796;</p>"


prob_outcome = 80   // keep it a whole number
reps_in_trial = 3  //reps_in_trial * 4 = actual number of reps in the trial/practice block (i.e. 15*4 = 60 )
reps_in_exp = 10    // reps_in_exp * 4 = actual number of reps in the experimental blocks
bonus_percent = 20/(reps_in_exp*2*4) 
fixed_bonus = 0     // 0

const images = ['../img/welcome.gif', 
                "../img/stim/f1_1.png","../img/stim/f1_2.png", "../img/stim/f1_3.png","../img/stim/f1_4.png",
                '../img/page1.png', '../img/page2.png', '../img/stim/f3_1.png', '../img/eighth_3_page.png',
                "../img/doing.png", "../img/holding.png",
                "../img/stim/f4_1.png","../img/stim/f4_2.png", "../img/stim/f4_3.png","../img/stim/f4_4.png"
              ];