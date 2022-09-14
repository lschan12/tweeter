$(document).ready(function() {
  textCounter();
  backToTop();
});

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
