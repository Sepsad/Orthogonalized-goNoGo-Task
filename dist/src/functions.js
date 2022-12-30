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


  
function make_stimuli(trial, stim, block_num) {  // generates the stimuli from the square images
  var stimulus = [
    {
      stimulus: './img/stim/' + stim[0] + '.png',
      data: {color: stim[0], cond: 1, cond_action: 'go', cond_outcome: 'win',  exp_part: 'main', block: block_num}
    },
    {
      stimulus: './img/stim/' + stim[1] + '.png',
      data: {color: stim[1], cond: 2, cond_action: 'nogo', cond_outcome: 'win'  ,exp_part: 'main', block: block_num}
    },
    {
      stimulus: './img/stim/' + stim[2] + '.png',
      data: {color: stim[2], cond: 3, cond_action: 'go', cond_outcome: 'avoidPun' ,exp_part: 'main', block: block_num}
    },
    {
      stimulus: './img/stim/' + stim[3] + '.png', 
      data: {color: stim[3], cond: 4, cond_action: 'nogo', cond_outcome: 'avoidPun' ,exp_part: 'main', block: block_num}
    }
  ]
  if (trial === true){
    stimulus[0].data.exp_part = stimulus[1].data.exp_part = stimulus[2].data.exp_part = stimulus[3].data.exp_part = 'practice'
  }
  return stimulus
};


function give_reward(condition, result, prob_fall) {

  random = Math.floor(Math.random()*100)

  //  win conditions
  if (condition == 'win') {
    if(result == true) {
      if (random <= prob_fall) {
        return ['win', 1, prob_fall, true] 
        }
      else {
        return ['neutral', 0, 100-prob_fall, false] 
      }
    }
    else if (result == false){
      if(random <= prob_fall){
        return ['neutral', 0, prob_fall, true]
      }
      else{
        return ['win', 1, 100-prob_fall, false]
      }
    }
  }
  // avoid punishment condition
  else if (condition == 'avoidPun') {
    if(result == true){
      if(random <= prob_fall){
        return ['neutral', 0, prob_fall, true]
      }
      else {
        return ['lose', -1, 100-prob_fall,false]
      }
    }
    else if (result == false)
    {
      if(random <= prob_fall){
        return ['lose', -1, prob_fall, true]
      }
      else {
        return ['neutral', 0, 100-prob_fall,false]
      }
    }
  }
};



function preloadImages(array) {
  if (!preloadImages.list) {
      preloadImages.list = [];
  }
  var list = preloadImages.list;
  for (var i = 0; i < array.length; i++) {
      
      var img = new Image();
      img.onload = function() {
          var index = list.indexOf(this);
          if (index !== -1) {
              // remove image from the array once it's loaded
              // for memory consumption reasons
              list.splice(index, 1);
          }
      }
      list.push(img);
      img.src = array[i];
      console.log(img);
  }
}
