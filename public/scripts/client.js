/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  loadtweets();
  submitForm();
});


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
    <div class="tweet-content">${obj.content.text}</div>
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

// Generate tweets and append to tweet container
const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    let generatedTweet = createTweetElement(tweet);
    $("#tweets-container").append(generatedTweet);
  }
};

const loadtweets = () => {
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
};

const submitForm = () => {
  $("form").submit(function(e) {
    let text = $("#tweet-text").val();
    if (text === null || text === "") {
      alert("Invalid Inpnut");
    } else if (text.length > 140) {
      alert("Character limit exceeded");
    } else {
      $.post("/tweets", $(this).serialize());
    }
    e.preventDefault();
  });
};

// const validateForm = (form) => {
//   let text = $(form).val();
//   console.log(text);
//   if (text === null || text === "") {
//     console.log("Input Invalid");
//   } else if (text.length > 140) {
//     console.log("Maximum Characters Reached");
//   }
// };







/*

Original Method that I don't want to delete because I think it looked pretty

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