// consent
var consent = {
  type: "external-html",
  url: "../../views/consent_first_page.html",
  // url: "https://raw.githubusercontent.com/Sepsad/Orthogonalized-goNoGo-Task/main/public/views/consent_for_pilot.html",
  //   check_fn: function () {
  //     return true;
  //   },
  cont_btn: "consent",
  data: {},
  on_load: function () {
    document.getElementById("jspsych-progressbar-container").style.visibility =
      "visible";
  },
};

var consent_first_page = {
  type: "external-html",
  // url: "../../views/consent_first_page.html",
  url: "https://raw.githubusercontent.com/Sepsad/Orthogonalized-goNoGo-Task/main/public/views/consent_first_page.html",
  //   check_fn: function () {
  //     return true;
  //   },
  cont_btn: "next",
  data: {},
  on_load: function () {
    document.getElementById("jspsych-progressbar-container").style.visibility =
      "visible";
  },
};

var consent_second_page = {
  type: "external-html",
  // url: "../../views/consent_second_page.html",
  url: "https://raw.githubusercontent.com/Sepsad/Orthogonalized-goNoGo-Task/main/public/views/consent_second_page.html",
  //   check_fn: function () {
  //     return true;
  //   },
  cont_btn: "consent",
  data: {},
  on_load: function () {
    document.getElementById("jspsych-progressbar-container").style.visibility =
      "visible";
  },
};

