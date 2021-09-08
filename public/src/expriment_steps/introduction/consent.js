// consent
var consent = {
  type: "external-html",
  url: "../../views/consent.html",
  //   check_fn: function () {
  //     return true;
  //   },
  cont_btn: "consent",
  on_load: function () {
    document.getElementById("jspsych-progressbar-container").style.visibility =
      "visible";
  },
};
