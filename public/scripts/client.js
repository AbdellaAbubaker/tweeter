/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = function (tweet) {
  const {
    user,
    content,
    created_at
  } = tweet;
  const $tweet = $(`
    <article class="tweet">
    <header>
      <div class="user-info">
        <div class="avatar-container">
          <img src="${user.avatars}" />
        </div>
        <div class="name-container">
          <h2>${$("<div>").text(user.name).html()}</h2>
        </div>
      </div>
      <div class="handle-container">
        <p>${$("<div>").text(user.handle).html()}</p>
      </div> 
    </header>
    <div class="content-container">
      <p>${$("<div>").text(content.text).html()}</p>
    </div>
    <div class="time-ago">
      <p>${$("<div>").text(timeago.format(created_at)).html()}</p>
    </div>
    
    
    <div class="icon-container">
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
      <i class="far fa-envelope"></i>
    </div>
  </article>

    `);
  return $tweet;
};



const renderTweets = function (tweets) {
  $('.tweets-container').empty();
  tweets.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').prepend($tweet);
  });
};

const loadTweets = function () {
  $.ajax('/tweets', {
    method: 'GET',
    dataType: 'JSON',
    success: renderTweets
  });
};

$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();

    const textarea = $("#tweet-text");
    const content = textarea.val();
    if (!content || content.trim() === "") {
      showError("Please enter a tweet");
      return;
    }

    if (content.length > 140) {
      showError("Tweet content is too long. Maximum allowed is 140 characters.");
      return;
    }
    clearError();

    var formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: formData,
      success: function (data) {
        $("#tweet-text").val("");
        $(".counter").text("140");
        clearError();
        loadTweets();
       
      },
      error: function (xhr, status, error) {
        showError("An error occurred while submitting the tweet. Please try again later.");
      }
      
    });
  });

  loadTweets();
  $(".write-tweet").click(function () {
    $(".new-tweet").slideDown()
  })
  $("#tweet-text").on('input', function () {
    const remainningChars = 140 - $(this).val().length;
    if (remainningChars >= 0) {
      clearError();
    }
  })

});



function showError(message) {
  const $errorContainer = $(".error-container");
  $errorContainer.text(message);
  $errorContainer.slideDown(); // Show the error container with sliding animation
}

function clearError() {
  const $errorContainer = $(".error-container");
  $errorContainer.text("");
  $errorContainer.hide(); // Hide the error container
}

$("#arrow-animation").click(function () {
  console.log("clicked")
  $(this).effect("highlight", {}, 3000);

});



// Debugging tips
// 1. Targeting right element 
// 2. Make sure there are typo 
// 3. Following fibction , check what calls first up the function chain 
// 4. To see if thee script was running/imported correctly 
// 5. If the ajax call was being called correctly 
//  6. Check the netweok tab in dev tools to make sure that /tweets is being called 