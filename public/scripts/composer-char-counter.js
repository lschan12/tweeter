$(document).ready(function() {
  $("#tweet-text").keyup(function(e) {
    let charsLeft = 140 - $(this).val().length;
    let counter = $(this).parent().find("output");
    counter.val(charsLeft);
    if (counter.val() <= 0) {
      counter.css({"color": "red"});
    } else {
      counter.css({"color": "black"});
    }
  });
});

