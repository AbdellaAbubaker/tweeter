/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweet) {
    const { user, content, created_at } = tweet;
    const $tweet = $(`
      <article class="tweet">
        <header>
          <img src="${user.avatars}" />
          <h2>${$("<div>").text(user.name).html()}</h2>
          <p>${$("<div>").text(user.handle).html()}</p>
          <p>${$("<div>").text(content.text).html()}</p>
        </header>
        <p class="tweet-created-at" data-time="${timeago.format(created_at)}"></p>
        <div>
          <i class="fas fa-retweet"></i>
          <i class="far fa-heart"></i>
          <i class="far fa-envelope"></i>
        </div>
      </article>
    `);
    return $tweet;
  };
  
  const renderTweets = function (tweets) {
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').prepend($tweet);
    });
  };
  
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET', dataType: 'JSON', success: renderTweets });
  };
  
  $(document).ready(function () {
    $("form").submit(function (event) {
      event.preventDefault();
  
      const textarea = $("#tweet-text");
      const content = textarea.val();
      if (!content || content.trim() === "") {
        alert("Please enter a tweet");
        return;
      }
  
      if (content.length > 140) {
        alert("Tweet content is too long. Maximum allowed is 140 characters.");
        return;
      }
      alert("Tweet submitted successfully");
  
      var formData = $(this).serialize();
  
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
        success: function (data) {
          loadTweets();
        }
      });
    });
  
    loadTweets();
  });
  


 
// 1. Targeting right element 
// 2. Make sure there are typo 
// 3. Following fibction , check what calls first up the function chain 
// 4. To see if thee script was running/imported correctly 
// 5. If the ajax call was being called correctly 
//  6. Check the netweok tab in dev tools to make sure that /tweets is being called 