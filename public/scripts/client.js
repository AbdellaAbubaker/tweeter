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
    <article class="tweet>
    <header>
        <img src="${user.avatars}" />
        <h2>${user.name}</h2>
        <p>${user.handle}</p>
      </header>
      <p>${content.text}</p>
      <footer>
        <p class="tweet-created-at" data-time="${created_at}"></p>
      </footer>
    </article>
  `);
    return $tweet;
}

const renderTweets = function (tweets) {
    tweets.forEach(tweet => {
        const $tweet = createTweetElement(tweet);
        $('#tweets-container').append($tweet);
    });
    $('.tweet-created-at').for(function () {
        var time = $(this).attr('data-time');
        $(this).timeago(time);
    });
}


