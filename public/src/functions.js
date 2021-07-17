// experiment helper functions

function shuffler(listy){
    for(var i = 0; i < listy.length; i++){	// support function, shuffles a list
       var swpIdx = i + Math.floor(Math.random() * listy.length - i);
       var tmp = listy[i];
       listy[i] = listy[swpIdx];
       listy[swpIdx] = tmp;
     }
     return listy;
   }


function create_target(side) {
  index = Math.floor(Math.random()*9)

  target = "img/Target_images/" + side + "_stimuli_" + index + ".jpg"
  return target

}
  
function make_stimuli(trial, stim, block_num) {  // generates the stimuli from the square images
     if (trial === true){
       stimulus = [
           {stimulus: 'img/stim/' + stim[0] + '.png', correct_choice: shuffler(['right', 'left'])[0] ,color: stim[0], cond: 1, cond_name: 'go2win',  exp_part: 'practice', block: block_num},
           {stimulus: 'img/stim/' + stim[1] + '.png', correct_choice: null ,color: stim[1], cond: 2, cond_name: 'noGo2win',  exp_part: 'practice', block: block_num},
           {stimulus: 'img/stim/' + stim[2] + '.png', correct_choice: shuffler(['right', 'left'])[0] ,color: stim[2], cond: 3, cond_name: 'go2avoidPun',  exp_part: 'practice', block: block_num},
           {stimulus: 'img/stim/' + stim[3] + '.png', correct_choice: null ,color: stim[3], cond: 4, cond_name: 'noGo2avoidPun',  exp_part: 'practice', block: block_num}
          ];
     }
     else{
       stimulus = [
        {stimulus: 'img/stim/' + stim[0] + '.png', correct_choice: shuffler(['right', 'left']) ,color: stim[0], cond: 1, cond_name: 'go2win',  exp_part: 'main', block: block_num         },
        {stimulus: 'img/stim/' + stim[1] + '.png', correct_choice: null ,color: stim[1], cond: 2, cond_name: 'noGo2win',  exp_part: 'main', block: block_num},
        {stimulus: 'img/stim/' + stim[2] + '.png', correct_choice: shuffler(['right', 'left']) ,color: stim[2], cond: 3, cond_name: 'go2avoidPun',  exp_part: 'main', block: block_num},
        {stimulus: 'img/stim/' + stim[3] + '.png', correct_choice: null ,color: stim[3], cond: 4, cond_name: 'noGo2avoidPun',  exp_part: 'main', block: block_num}
       ];
     }
     return stimulus
   };
