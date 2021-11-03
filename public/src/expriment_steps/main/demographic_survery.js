var demographic_survey = {
  type: 'survey-html-form',
  preamble: "<h2>Demographic Questions</h2>",
  html:
  // Genre
  '<p align="left">(1) What is your gender? <input type="radio" id="male"'+
  'name="gender" value="male"checked label for="male" required>male </label>'+
  '<input type="radio" id="female"'+
  'name="gender" value="female"checked label for="female" required>female </label>'+
  '<input type="radio" id="other"'+
  'name="gender" value="other"checked label for="other" required>other</label></p>'+
  // Date de naissance
  '<p align="left"><label for="ddn">(2) How old are you? </label><input type="number" id="age" name="age"'+
  'value="" min="18" max="80" required</p>'+
  // Niveau étude
  "<p align='left'>(3) Education Level: "+
  '<label for="eduLevel"></label>'+
  '<select name="eduLevel" id="academic_select required>"'+
  '<option value = "">Choose</option>'+
  '<option value = "lessHigh"> Less Than High School</option>'+
  '<option value = "High">High School Graduate</option>'+
  '<option value = "Associate">Associate Degree</option>'+
  '<option value = "Bachelor">Bachelor\'s Degree</option>'+
  '<option value = "Master">Master\'s Degree</option>'+
  '<option value = "Doctoral">Doctoral Degree</option></select></p>'+
// feedback
  "<p align='center'>" +
  '<label for="feedback">We\'re always trying to improve. Please let us know if you have any comments. </label>' +
  '<br><br><input type="text" id="feedback" name="feedback" style="height:200px;width:600px;" > </p>' +
  '<p>Click "Submit Answer" to finish the experiment.</p>'
  ,


  // Type études
  // "<p align='left'>(4) Votre domaine d'études : "+
  // '<label for="department"></label>'+
  // '<select name="department" id="deparment>"'+
  // '<option value = "">Choisissez parmi les propositions suivantes</option>'+
  // '<option value = "ALL"> Arts, Lettres et Langues</option>'+
  // '<option value = "DEG">Droit, Économie, Gestion</option>'+
  // '<option value = "STS">Science et Technologie</option>'+
  // '<option value = "STAPS">STAPS</option>'+
  // '<option value = "Autre">Autre</option></select></p>'
  // Antécédents
  // '<p align="left">(5) Présentez-vous des antécédents psychiatriques ou neurologiques ?'+
  // '<i>(ex. : dépression, trouble bipolaire, traumatisme cranien, AVC, etc.)</i>'+
  // '<input type="radio" id="oui"'+
  // 'name="atcd" value="oui"checked label for="oui">oui</label>'+
  // '<input type="radio" id="non"'+
  // 'name="atcd" value="non"checked label for="non">non</label></p>'+
  // Si oui
  // '<p align="left">(6) Suivez-vous un traitement médicamenteux qui pourrait avoir'+
  // 'un impact sur votre état de vigilance <i>(anti-dépresseur, anxiolytique, etc.)</i> ? '+
  // '<p><img src="medicament_vigilance.png" align="left"></p>'+
  // '<p align="left"><input type="radio" id="non"'+
  // 'name="medoc" value="non"checked label for="non">Non</label></p>'+
  // '<p align="left"><input type="radio" id="oui_nv1"'+
  // 'name="medoc" value="oui_nv1"checked label for="oui_nv1">Oui, niveau 1</label></p>'+
  // '<p align="left"><input type="radio" id="oui_nv2"'+
  // 'name="medoc" value="oui_nv2"checked label for="oui_nv1">Oui, niveau 2</label></p>'+
  // '<p align="left"><input type="radio" id="oui_nv3"'+
  // 'name="medoc" value="oui_nv3"checked label for="oui_nv1">Oui, niveau 3</label></p>'
  button_label: 'Submit Answer',

  on_finish: function (data) {
      // console.log(data)
      completion_code = jsPsych.data.get().last(1).values()[0].experiment_id;

      jsPsych.data.addDataToLastTrial({
        exp_final_status:"fully_completed",
      });


      var goodbye_message = "<h1><strong> Thank you very much for participating in this game!</strong></h1>" + 
      "<p>You have now completed the first round of the study.</p>" +
      // "<p>You have now completed the study.</p>" +
      "<h3><strong>Your completion code is: <font color='red'>"+ completion_code +"</font></strong></h3>" +
      "<p>Please copy and paste this into the MTurk window to claim payment.</p>" +
      "<p> We will remind you (via email) in 2 weeks to participate in the second round of the study.</p>" +
      "<p>Also, you will be able to find the second round of the experiment where you found this experiment.</p>" +
      "<p>If you have any questions about Go-NoGo Game, please mail Sepehr at <a href='Sepehrsdp@gmail.com' target = '_top'>sepehrsdp@gmail.com</a></p>"
      jsPsych.endExperiment(goodbye_message);
  }
  };