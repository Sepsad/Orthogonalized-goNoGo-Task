/*
todo:
- currently slider criterion only greater than
- interaction currently set only for speficy or followup, not both
 */

jsPsych.plugins["custom-form"] = (function() {

    var plugin = {};
  
    plugin.info = {
      name: "custom-form",
      parameters: {
        questions: {
          type: jsPsych.plugins.parameterType.OBJECT, // BOOL, STRING, INT, FLOAT, FUNCTION, KEYCODE, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
          array: true,
          description: "List of question types/options. See below for options"
        },
        preamble: {
          type: jsPsych.plugins.parameterType.STRING,
          default: null,
          description: "Preamble for the page"
        },
        instructions: {
          type: jsPsych.plugins.parameterType.STRING,
          default: null,
          description: "Further instructions"
        },
        highlight: {
          type: jsPsych.plugins.parameterType.STRING,
          default: 'item',
          description: "Highlight alternate items or alternative groups (marked by question variable: group)"
        },
        submit: {
          type: jsPsych.plugins.parameterType.STRING,
          default: 'Continue',
          description: "Text for 'submit' button"
        },
        select_start: {
          type: jsPsych.plugins.parameterType.STRING,
          default: 'select an option',
          description: "Text for 'submit' button"
        },
        specify_text: {
          type: jsPsych.plugins.parameterType.STRING,
          default: 'Please specify',
          description: "Text for specify reminder"
        },
        mobile: {
          type: jsPsych.plugins.parameterType.BOOL,
          default: false,
          description: "Is device mobile?"
        }
      }
    };
  
    plugin.trial = function(display_element, trial) {
  
      /* question options:
      type: string - question type: slider, select,  checkbox, multiple, text
      optiona: boolean - if true, can skip
      inline: boolean - place question inline with prompt
      options: array of options to display
      values: array of values corresponding to above optionSelected
      is_start: boolean - if true, start of group
      has_followup: array of objects - keys id=id of followup items; criterion=what value will unhide followup;
      is_followup: boolean - if true, is a follow up question, and will only be displayed depending on main question criterion
      group: numeric - used for highlighting
      force_all: boolean - if true (for checkbox type) then all options must be selected
      columns: int - for select answers, how many columns to display the options in
      */
  
      // set up
      var trial_data = {};
      var start_time;
      var display_logic = {};
      var optout_logic = {};
      var slider_movement_tracker = {};
  
      var css = '<style>';
      css += '.form-item {background-color: #f2fcff}';
      css += '.inline-contents > div:not(.reminder) {display: inline-block}';
      css += '.specify {display: inline-block;}';
      css += '.highlight {background-color: #daedf2}';
      css += '.followup {display: inline-block;}';
      css += '.flex {display: flex;}';
      css += '.multiple.answer {border: 1px solid #c7c7c7; border-radius: 5px; padding: 5px 10px;}';
      css += '.multiple.answer.unpadded {padding: 0px;}';
      css += '.multiple.answer:hover {background-color: #e6f2ff;}';
      css += '.multiple.answer.selected {background-color: #6ab0fc; border: 1px solid #0069db;}';
      css += '.multiple.answer.disabled {background-color: #DFDFDF; border: 1px solid #939393;}';
      css += '.inline > .prompt {display: inline-block}';
      css += '.reminder {display: none; font-size: 16px; padding-inline-start: 5px}';
      css += '.reminder.problem {display: inline-block; font-size: 16px; padding-inline-start: 5px}';
      css += '.hidden {display: none;}';
      css += '.problem {color: red;}';
      css += '#submit.disabled {background-color: #DFDFDF; border: 1px solid #939393;}';
      css += '</style>';
  
      var html = '';
      if(trial.preamble){
        html += '<div class="preamble">'+trial.preamble+'</div>';
      }
      if(trial.instructions){
        html += '<div class="instructions">'+trial.instructions+'</div>';
      }
  
      var group = -1;
      trial.questions.forEach(function(question, q_index){
        var question_string;
        // add appropriate padding
        if(question.group || question.group==0){
  
          if(question.group > group){
            group = question.group;
            question.start = true;
          }
          if(trial.questions[q_index+1]){
            if(trial.questions[q_index+1].group > question.group){
              question.end = true;
            }
          } else {
            question.end = true;
          }
        } else {
          question.start = true;
          question.end = true;
        }
  
        if(question.type=='slider'){
          question_string = slider(question, q_index);
        }
        if(question.type=='select'){
          question_string = select(question, q_index);
        }
        if(question.type=='checkbox'){
          question_string = checkbox(question, q_index);
        }
        if(question.type=='multiple'){
          question_string = multiple(question, q_index);
        }
        if(question.type=='text'){
          question_string = text(question, q_index);
        }
        html += question_string;
      });
  
      function text(question_data, q_index){
        var question_id = question_data.id || 'question-'+q_index;
        var prompt = question_data.prompt || '';
        var options = question_data.options || [];
        var values = parseValues(question_data);
        var class_strings = embellishClassString(question_data, q_index);
        var container_class_string = 'text-container ' + class_strings.container;
        var placeholder_string = '';
        if(question_data.placeholder){
          placeholder_string += question_data.placeholder;
        }
        var input_class_string = 'text response answer ' + class_strings.input;
        var html_string = '<div id="question-container-'+question_id+'" class="'+container_class_string+'">';
        html_string += '<div class="prompt">'+prompt+'</div>';
        html_string += '<input type="text" name="'+question_id+'" id="'+question_id+'" class="'+input_class_string+'" placeholder="'+placeholder_string+'" size="24">';
        if(question_data.numeric){
          html_string += '<div id="'+question_id+'-reminder" class="reminder">Number only</div>';
        }
        if(question_data.email){
          html_string += '<div id="'+question_id+'-reminder" class="reminder">enter a valid email address (containing @) OR leave blank</div>';
        }
        html_string += '</div>';
        handleFollowups(question_id, question_data);
        return html_string;
      }
  
      function multiple(question_data, q_index){
        var question_id = question_data.id || 'question-'+q_index;
        var prompt = question_data.prompt || '';
        var options = question_data.options || [];
        var values = parseValues(question_data);
        var disabled = question_data.disable || {};
        var class_strings = embellishClassString(question_data, q_index);
        var container_class_string = 'multiple-container ' + class_strings.container;
  
        var html_string = '<div id="question-container-'+question_id+'" class="'+container_class_string+'">';
        html_string += '<div class="prompt">'+prompt+'</div>';
        var option_string = '';
        var option_width;
        var option_rows = 1;
        var options_num = options.length;
        var wrap_string = '';
        if(options_num>6){
          option_width = 1.0/(0.5*options_num);
          wrap_string = 'flex-wrap: wrap;';
        } else if(options_num>4){
          option_width = 1.0/(options_num+1);
        } else {
          option_width = 1.0/(options_num+2);
        }
  
        html_string += '<div id="'+question_id+'" class="custom-form-multiple flex" style="width:100%; '+wrap_string+' justify-content: space-evenly;">';
        option_width = Math.round(option_width*$(window).width());
        options.forEach(function(option, i){
  
          var option_id = question_id+'-'+i;
          var value_string;
          if(values.length>0 && values[i]){
            value_string = values[i];
          } else {
            option = ''+option;
            value_string = option.replace(/ /g, '_').toLowerCase();
          }
          var option_class_string = 'multiple answer ' + class_strings.input;
          var option_text = option;
          console.log(option, disabled);
          if(disabled[option]){
            option_class_string += 'disabled';
            if(option == 'عربي' || option == 'فارسی'){
              option_text += '<br><span style="font-size:0.8em"> ('+disabled[option]+')</span>';
            } else {
              option_text += '<span style="font-size:0.8em"> ('+disabled[option]+')</span>';
            }
  
          }
          option_string += '<div style="width: '+option_width+'px; text-align: center;" class="'+option_class_string+'" name="'+question_id+'" id="'+option_id+'" value="'+value_string+'">'+option_text+'</div>';
        });
        option_string += '</div>';
  
        handleFollowups(question_id, question_data);
  
        return html_string + option_string + '</div>';
      }
  
      function checkbox(question_data, q_index){
        var question_id = question_data.id || 'question-'+q_index;
        display_logic[question_id] = [];
        var prompt = question_data.prompt || '';
        var options = question_data.options || [];
        var values = parseValues(question_data);
        var class_strings = embellishClassString(question_data, q_index);
        var container_class_string = 'checkbox-container ' + class_strings.container;
  
        var html_string = '<div id="question-container-'+question_id+'" class="'+container_class_string+'">';
        html_string += '<div class="prompt">'+prompt+'</div>';
        html_string += '<div id="'+question_id+'" class="custom-form-checkbox response flex" style="width:100%; flex-wrap: wrap;">';
        var option_string = '';
        var width_string;
        if(question_data.columns){
          width_string = Math.round(100/question_data.columns) + "%";
        } else {
          width_string = "50%";
        }
        options.forEach(function(option, i){
          var option_id = question_id+'-'+i;
          var value_string;
          var option_class_string = 'answer check ' + class_strings.input;
          if(values.length>0 && values[i]){
            value_string = values[i];
          } else {
            option = ''+option;
            value_string = option.replace(/ /g, '_').toLowerCase();
          }
          option_string += '<div id="option-container-'+option_id+'" style="width:'+width_string+'" class="">'+
          '<input type="checkbox" name="'+question_id+'" id="'+option_id+'" value="'+value_string+'" class="'+option_class_string+'">';
          option_string += '<label for="'+option_id+'" class="option label"> '+option+'</label></div>';
        });
  
        if(question_data.specify){
          option_string += '<div id="'+question_id+'-specify" class="response optional hidden">';
          option_string += '<input type="text" name="'+question_id+'-specify" class="answer text specify optional" placeholder="'+trial.specify_text+'">';
          option_string += '<div id="'+question_id+'-specify-reminder" class="reminder">'+trial.specify_text+'</div>';
          option_string += '</div>';
          display_logic[question_id].push({type: 'specify', unhide_on: question_data.specify});
        }
        if(question_data.optout_for){
          optout_logic[question_id] = question_data.optout_for;
        }
        option_string += '</div>';
        html_string += option_string;
  
        handleFollowups(question_id, question_data);
  
        html_string += '</div>';
        return html_string;
      }
  
      function select(question_data, q_index){
        var question_id = question_data.id || 'question-'+q_index;
        display_logic[question_id] = [];
        var prompt = question_data.prompt || '';
        var options = question_data.options || [];
        var values = parseValues(question_data);
        var class_strings = embellishClassString(question_data, q_index);
        var container_class_string = 'select-container ' + class_strings.container;
        var input_class_string = 'answer select response ' + class_strings.input;
  
        var html_string = '<div id="question-container-'+question_id+'" class="'+container_class_string+'">';
        html_string += '<div class="prompt">'+prompt+'</div>';
        html_string += '<select id="'+question_id+'" class="'+input_class_string+'">';
        var option_string = '<option disabled selected value> -- '+trial.select_start+' -- </option>';
        options.forEach(function(option,i){
          var option_id = question_id+'-'+i;
          var value_string;
          if(values.length>0 && values[i]){
            value_string = values[i];
          } else {
            option = ''+option;
            value_string = option.replace(/ /g, '_').toLowerCase();
          }
          option_string += '<option name="'+question_id+'" id="'+option_id+'" value="'+value_string+'" class="select option">'+option+'</option>';
        });
  
        html_string += option_string + '</select>';
  
        if(question_data.specify){
          html_string += '<div id="'+question_id+'-specify" class="response hidden inline">';
          html_string += '<input type="text" name="'+question_id+'-specify" id="'+question_id+'-'+question_data.specify+'" class="specify answer text optional" placeholder="'+trial.specify_text+'">';
          html_string += '<div id="'+question_id+'-specify-reminder" class="reminder">'+trial.specify_text+'</div>';
          html_string += '</div>';
          display_logic[question_id].push({type: 'specify', unhide_on: question_data.specify});
        }
        handleFollowups(question_id, question_data);
        html_string += '</div>';
        return html_string;
      }
  
      function slider(question_data, q_index){
        var question_id = question_data.id || 'question-'+q_index;
        display_logic[question_id] = [];
        slider_movement_tracker[question_id] = false;
        var prompt = question_data.prompt || '';
        var labels = question_data.labels || '';
        var class_strings = embellishClassString(question_data, q_index);
        var container_class_string = 'slider-container ' + class_strings.container;
  
        var width = Math.floor(100/(labels.length+1));
        var html_string = '<div id="question-container-'+question_id+'" class="'+container_class_string+'" style="margin: auto;">';
        html_string += '<div class="prompt">'+prompt+'</div>';
        var input_class_string = 'slider answer ' + class_strings.input;
        html_string += '<input type="range" min="1" max="100" value="50" class="'+input_class_string+'" id="'+question_id+'" style="width: 100%">';
  
        var label_string = '<div class="label-container" style="display: flex; width: 100%; justify-content: space-between; align-items: flex-start">';
        labels.forEach(function(label, i){
          var style_string = 'width: '+width+'%;';
          var label_class_string = 'slider label ';
          if(i==0){
            label_class_string += 'first ';
          }
          else if(i==labels.length-1){
            label_class_string += 'last ';
          } else {
            label_class_string += 'middle ';
          }
          label_string += '<div style="'+style_string+'" class="'+label_class_string+'">'+label+'</div>';
        });
        label_string += '</div>';
  
        handleFollowups(question_id, question_data);
  
        html_string += label_string + '</div>';
        return html_string;
      }
  
      var submit = '<div>'+
                    '<br><button type="button" id="submit">'+trial.submit+'</button>'+
                    '</div>';
  
      display_element.innerHTML = css+html+submit;
  
  /***
  Inputs/interactions
  ***/
  
      $('.slider').on('click touchend', function(e){
        var name = this.id;
        var value = this.value;
        slider_movement_tracker[name] = true;
        display_logic[name].forEach(function(d){
          if(d.type=='followup'){
            if(value > d.criterion){
              // problem: currently only implemented IF GREATER THAN criterion; probably at some point need IF LESS THAN
              $('#question-container-'+d.target).show(400);
            } else {
              $('#question-container-'+d.target).hide(200);
            }
          }
        });
      });
  
      $('select').on('change', function (e) {
        var value = this.value;
        var name = this.id;
        display_logic[name].forEach(function(d){
          // console.log(value, name)
          if(d.type=='specify'){
            if(value == d.unhide_on){
              $("#"+name+'-specify').addClass('specify').removeClass('optional hidden');
              $("input[name="+name+'-specify]').removeClass('optional');
            } else {
              $("#"+name+'-specify').removeClass('specify').addClass('optional hidden');
              $("input[name="+name+'-specify]').addClass('optional');
            }
          }
          if(d.type=='followup'){
            if(d.criterion(value)){
              $('#question-container-'+d.target).show(400);
              $('#'+d.target).removeClass('optional');
            } else {
              $('#question-container-'+d.target).hide(200);
              $('#'+d.target).addClass('optional');
            }
          }
       });
      });
  
      $('input[type="text"]').on('keydown', function(e){
        if(e.keyCode==13){
          this.blur();
        }
      });
  
      $('.multiple.answer').on('click', function(e){
        var option_id = this.id;
        var option_value = $(this).attr('value');
        var name = $(this).attr('name');
        $('.multiple.answer[name='+name+']').each(function(i,d){
          var current_option = $(d);
          var match = current_option.attr('value') == option_value;
          if(match){
            current_option.addClass('selected');
          } else {
            current_option.removeClass('selected');
          }
        });
        // handle disabled options
        if($(this).hasClass('disabled')){
          $('#submit').addClass('disabled');
        } else {
          $('#submit').removeClass('disabled');
        }
        display_logic[name].forEach(function(d){
          // console.log(value, name)
          if(d.type=='followup'){
            if(option_value == d.criterion){
              $('#question-container-'+d.target).show(400);
              $('#'+d.target).removeClass('optional');
            } else {
              $('#question-container-'+d.target).hide(200);
              $('#'+d.target).addClass('optional');
            }
          }
        });
      });
  
      $('input[type=checkbox]').on('change', function(e){
        var clicked_box = this;
        var id = clicked_box.id;
        var value = clicked_box.value;
        var name = clicked_box.name;
        // handle display logic (e.g. followups)
        display_logic[name].forEach(function(d){
          if(d.type=='specify'){
            if(value == d.unhide_on){
              if(clicked_box.checked){
                $("#"+name+'-specify').addClass('specify').removeClass('optional hidden');
                $("input[name="+name+'-specify]').addClass('specify').removeClass('optional');
              } else {
                $("#"+name+'-specify').removeClass('specify').addClass('optional hidden');
                $("input[name="+name+'-specify]').removeClass('specify').addClass('optional hidden');
              }
            }
          }
          if(d.type=='followup'){
            if(value == d.criterion){
              $('#question-container-'+d.target).show(400);
            } else {
              $('#question-container-'+d.target).hide(200);
            }
          }
        });
        // handle other display logic (e.g. optouts);
        if(optout_logic[name]){
          var target = optout_logic[name];
          // check if ANY optouts for the same question are clicked
          var any_optouts_clicked = false;
          $('#'+name+' input[type="checkbox"]').each(function(i,d){
            if(d.checked){
              any_optouts_clicked = true;
            }
          });
          if(any_optouts_clicked){
            $('#question-container-'+target+'>*:not(".prompt")').css({opacity: 1.0}).animate({opacity: 0}, 200).slideUp();
          } else {
            $('#question-container-'+target+'>*').slideDown().css({opacity: 0}).animate({opacity: 1}, 200);
          }
        }
      });
  
      $('#submit').click(function(e){
        if(!$(this).hasClass('disabled')){
          var response_data = getResponses();
          var validated = validateResponses(response_data);
          if(validated.ok){
            endTrial(response_data.responses);
          } else {
            highlightProblems(validated.problems);
          }
        }
      });
  
      /*
      Data handling
      */
  
      function getResponses(){
        var responses = [];
        var requirement_tracker = {};
        $('.answer').each(function(i, answer){
          var answer_obj = $(answer);
          var value = this.value || answer_obj.attr('value'); // latter option e.g. for type=multiple, where value is property of div, not input
          var id = this.id;
          var name = this.name || answer_obj.attr('name');
          var parent = findParent(name, id);
          var selected = answer_obj.hasClass('selected');
          /*
          The difference between 'optional' and 'required' is that a non-optional question will be OK-ed if one option is selected.
          A required question needs to have *all* options selected (e.g. for consent forms).
          Due to this difference, non-optional answers are handled with the requirement_tracker above (since this involves validation across individual answers),
          whereas the later is just handled with validateResponses below (since any individual failure is a problem)
          */
          var required = answer_obj.hasClass('required');
          var optional = answer_obj.hasClass('optional');
          // make a record of non-optional questions, so that if no options are selected, this is noted
          if(!optional && !requirement_tracker[parent] && !required){
            requirement_tracker[parent] = false;
          }
          if(answer_obj.hasClass('select')){
            if(value){
              requirement_tracker[parent] = true;
              responses.push({id: id, name: name, value: value, optional: optional});
            }
          }
          if(answer_obj.hasClass('check')){
            selected = answer_obj.is(':checked');
            if(required){
              responses.push({id: id, name: name, value: value, selected: selected, required: true});
            } else if(selected){
              requirement_tracker[parent] = true;
              responses.push({id: id, name: name, value: value, optional: optional});
            }
          }
          if(answer_obj.hasClass('text')){
            // make a record of non-optional questions, so that if no options are selected, this is noted
            var numeric = answer_obj.hasClass('numeric');
            var email = answer_obj.hasClass('email');
  
            if(value){
              value = JSON.stringify(value.trim());
              requirement_tracker[parent] = true;
              responses.push({id: id, name: name, value: value, optional: optional, numeric: numeric, email: email});
            }
          }
          if(answer_obj.hasClass('multiple') && selected){
            requirement_tracker[parent] = true;
            responses.push({id: id, name: name, value: value, optional: optional});
          }
          if(answer_obj.hasClass('slider')){
            // slider doesn't have distinct name, since there aren't any suboptions to choose among
            var moved = slider_movement_tracker[id];
            if(moved || trial.mobile){
              requirement_tracker[parent] = true;
            }
            responses.push({id: id, value: value, optional: optional, moved: moved});
          }
        });
        var response_data = {responses: responses, requirements: requirement_tracker};
        // console.log(response_data);
        return response_data;
      }
  
      function validateResponses(response_data){
        var validation = {ok: true, problems: []};
        response_data.responses.forEach(function(d,i){
          if(d.required && !d.selected){
            validation.ok = false;
            validation.problems.push({id: 'option-container-'+d.id, problem: 'required'});
          }
          if(d.numeric){
            var is_numeric = checkNumeric(d.value);
            if(!is_numeric){
              validation.ok = false;
              validation.problems.push({id: 'question-container-'+d.id, problem: 'numeric'});
              validation.problems.push({id: d.id+'-reminder', problem: 'numeric'});
            }
          }
          if(d.email){
            var is_email = checkEmail(d.value);
            if(!is_email){
              validation.ok = false;
              validation.problems.push({id: 'question-container-'+d.id, problem: 'email'});
              validation.problems.push({id: d.id+'-reminder', problem: 'numeric'});
            }
          }
        });
        Object.keys(response_data.requirements).forEach(function(question_id,i){
          var satisfied = response_data.requirements[question_id];
          if(!satisfied){
            validation.ok = false;
            var specify_reg = question_id.match(/(.+)-specify/);
            if(specify_reg){
              var parent = specify_reg[1];
              validation.problems.push({id: 'question-container-'+parent, problem: 'nonoptional'});
              validation.problems.push({id: question_id+'-reminder', problem: 'specify'});
            } else {
              validation.problems.push({id: 'question-container-'+question_id, problem: 'nonoptional'});
            }
          }
        });
        // console.log('validation', validation);
        return validation;
      }
  
      function highlightProblems(problems){
        $("html,body").animate({scrollTop: 0}, 100);
        // reset problems
        $('.problem').each(function(i, d){
          $(d).removeClass('problem');
        });
        problems.forEach(function(problem){
          $('#'+problem.id).addClass('problem');
        });
      }
  
      function endTrial(responses){
        var end_time = Date.now();
        var rt = end_time - start_time;
        trial_data.rt = rt;
        trial_data.responses = JSON.stringify(responses);
  
        // kill any remaining setTimeout handlers
        jsPsych.pluginAPI.clearAllTimeouts();
        // kill listeners
        $('#submit').off();
        $('input[type=checkbox]').off();
        $('.multiple.answer').off();
        $('select').off();
        $('.slider').off();
        $('input[type="text"]').off();
  
        // clear screen
        display_element.innerHTML = '';
  
        console.log(trial_data);
        jsPsych.finishTrial(trial_data);
      }
  
  /***
  Helper functions
  ****/
  
      function handleFollowups(question_id, question_data){
        if(!display_logic[question_id]){
          display_logic[question_id] = [];
        }
        if(question_data.has_followup){
          question_data.has_followup.forEach(function(d, i){
            display_logic[question_id].push({type: 'followup', target: d.id, criterion: d.criterion});
          });
        }
      }
  
      function embellishClassString(question_data, q_index){
        var container_string = ' ';
        var input_string = ' ';
        if(question_data.start){
          container_string += 'start ';
        }
        if(question_data.end){
          container_string += 'end ';
        }
        if(question_data.email){
          input_string += 'email ';
        }
        if(question_data.numeric){
          input_string += 'numeric ';
        }
        if(question_data.inline){
          container_string += 'inline-contents ';
        }
        if(question_data.optional){
          input_string += 'optional ';
        }
        if(question_data.is_followup){
          container_string += 'followup hidden ';
          input_string += 'optional ';
        }
        if(question_data.force_all){
          input_string += 'required ';
        }
        if(question_data.unpadded){
          input_string += 'unpadded ';
        }
        if(trial.highlight=='group'){
          if(question_data.group%2==1){
            container_string += 'highlight ';
          }
        } else {
          if(q_index%2==1){
            container_string += 'highlight ';
          }
        }
        container_string += 'form-item ';
        return {container: container_string, input: input_string};
      }
  
      function parseValues(question_data){
        // value need to be strings. Mostly because a value=0 is treated as null by javascript in some cases
        var values = [];
        if(question_data.values){
          question_data.values.forEach(function(d){
            values.push(''+d);
          });
        }
        return values;
      }
  
      function findParent(name, id){
        // if there is an optout or a nameless anwer (e.g. a slider), then this finds which question it is an optout or slider for
        var parent = name;
        if(name){
          var reg = name.match(/(.+)-optout/);
          if(reg){
            parent = reg[1];
          }
        } else {
          parent = id;
        }
        return parent;
      }
  
      function checkNumeric(value){
        value = JSON.parse(value);
        var is_numeric = (/^[0-9]+$/).test(value);
        return is_numeric;
      }
  
      function checkEmail(value){
        value = JSON.parse(value);
        var is_email = (/@/.test(value));
        return is_email;
      }
  
      $( document ).ready(function() {
        start_time = Date.now();
        $("html,body").animate({scrollTop: 0}, 100);
      });
  
    };
  
    return plugin;
  })();