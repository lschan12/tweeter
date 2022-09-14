/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* eslint-env jquery */
/* eslint-env browser */


$(document).ready(function() {
  loadtweets();
  submitForm();
});

// XSS Prevention
const escapes = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Generate tweet element
const createTweetElement = (obj) => {
  const element = $(`
  <article class="tweet">
    <header>
      <div class="user">
        <img src=${obj.user.avatars}></img>
        <div class="username">${obj.user.name}</div>
      </div>
      <div class="handle">${obj.user.handle}</div>
    </header>
    <div class="tweet-content">${escapes(obj.content.text)}</div>
    <footer>
      <div class="time-stamp">${timeago.format(obj["created_at"])}</div>
      <div class="icons">  
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-repeat"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `);
  return element;
};

// Generate multiple tweets and append to tweet container
const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    let generatedTweet = createTweetElement(tweet);
    $("#tweets-container").prepend(generatedTweet);
  }
};

// Ajax request to get data from /tweets, empty tweets-container and then render
const loadtweets = () => {
  $.get("/tweets", function(data) {
    $("#tweets-container").empty();
    renderTweets(data);
  });
};

// Form Submission validation, reset input field and character counter, and reload the tweets with functions defined above
const submitForm = () => {
  const $errorContainer = $(".error-container");
  $("form").submit(function(e) {
    e.preventDefault();
    $($errorContainer).slideUp();
    let text = $("#tweet-text").val();
    if (text === null || text === "") {
      setTimeout(() => {
        $($errorContainer).slideDown(700);
        $(".error-container div p").text("Invalid Input");
      }, 500);
    } else if (text.length > 140) {
      setTimeout(() => {
        $($errorContainer).slideDown(700);
        $(".error-container div p").text("Character Limit Exceeded");
      }, 500);
    } else {
      $.post("/tweets", $(this).serialize())
        .done(() => {
          this.reset();
          loadtweets();
        });
    }
  });
};

/*

Original Method for createTweetElement() that I don't want to delete because I think it looked pretty

// // Loops through the number of icons we have and create HTML tags for each
// const generateIcons = (list) => {
//   let output = "";
//   for (let i of list) {
//     output += `<i class="fa-solid fa-${i}"></i>`;
//   }
//   return output;
// };
//
// const createTweetElement = (obj) => {
//  let iconList = ["flag", "repeat", "heart"];
//  // Header
//  let avatar = `<img src=${obj.user.avatars}></img>`;
//  let username = `<div class="username">${obj.user.name}</div>`;
//  let user = `<div class="user">${avatar}${username}</div>`;
//  let handle = `<div class="handle">${obj.user.handle}</div>`;
//  const header = `<header>${user}${handle}</header>`;
//  const content = `<div class="tweet-content">${obj.content.text}</div>`;
//  // Footer
//  let timeStamp = `<div class = "time-stamp">${obj["created_at"]}</div>`;
//  let icons = `<div class="icons">${generateIcons(iconList)}</div>`;
//  const footer = `<footer>${timeStamp}${icons}</footer>`;
//  return $(`<article class="tweet">${header}${content}${footer}</article>`);
// };

*/