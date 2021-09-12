// consent
var consent = {
  type: "external-html",
  url: "../../views/consent.html",
  // url: "https://raw.githubusercontent.com/Sepsad/Orthogonalized-goNoGo-Task/main/public/views/consent.html",
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
