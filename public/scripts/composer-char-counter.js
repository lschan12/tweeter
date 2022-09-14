/* eslint-env jquery */
/* eslint-env browser */

$(document).ready(function() {
  textCounter();
  backToTop();
  toggleForm();
});

// Function that decrements the counter based on text length in text area
const textCounter = () => {
  $("#tweet-text").keyup(function(e) {
    $(this).height(0);
    $(this).height(this.scrollHeight);
    let charsLeft = 140 - $(this).val().length;
    let counter = $(this).parent().find("output");
    counter.val(charsLeft);
    if (counter.val() <= 0) {
      counter.css({"color": "red"});
    } else {
      counter.css({"color": "black"});
    }
  });
};

// Detect if user is at top of page and display back-to-top button if not
const showButton = () => {
  $(window).scroll(function() {
    if ($(this).scrollTop() !== 0) {
      $("#back-to-top").show(300);
      $("#newTweet").slideUp();
    } else {
      $("#back-to-top").hide("slow");
      $("#newTweet").slideDown();
    }
  });
};

// Back-to-top button to scroll to top of page and focus on form text area
const backToTop = () => {
  $("#back-to-top").hide();
  showButton();
  $("#back-to-top").click(function() {
    $(".new-tweet").slideDown();
    $("html, body").animate({scrollTop: 0}, "slow");
    $("#tweet-text").focus();
    return false;
  });
};

// Form toggle button in the nav if user is at top of page that shows or hides the form
const toggleForm = () => {
  $("#newTweet").click(function() {
    $(".new-tweet").slideToggle(600);
    $("#tweet-text").focus();
  });
};

