/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(() => {
  const loadTweets = () => {
    console.log("loading tweets");
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        tweets.reverse();
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`there was an error: ${err}`);
      },
    });
  };

  loadTweets();

  const renderTweets = function (tweets) {
    $("#tweets-container").empty();

    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  };

  const createTweetElement = function (tweetObject) {
    const tweet = `<article class="previous-Tweet">
                  <header>
                    <div class="image">
                      <img src="https://i.imgur.com/73hZDYK.png%22%3E" />
                      <span>${tweetObject.user.name}</span>
                    </div>
                    <div class="random-Name">
                      <span><strong>${tweetObject.user.handle}</strong></span>
                    </div>
                  </header>

                  <div class="tweet">
                    <p>${tweetObject.content.text}</p>
                  </div>

                  <footer>
                  <p>${timeago.format(tweetObject.created_at)}</p>
                    <div class="tweeticon">
                      <i class="fas fa-flag" id="firstone"></i>
                      <i class="fas fa-retweet" id="secondone"></i>
                      <i class="fas fa-heart" id="thirdone"></i>
                    </div>
                  </footer>
                </article>`;
    return tweet;
  };

  const $form = $("#newTweetForm");
  $form.on("submit", function (event) {
    event.preventDefault();
    let counter = $("#tweet-text").val().length;
    if (counter <= 0) {
      alert("You need To Write Characters to tweet");
    } else if (counter > 140) {
      alert("Too Many Characters");
    } else {
      console.log("form was submitted");

      const serializedData = $(this).serialize();

      $.post("/tweets", serializedData, (response) => {
        loadTweets();
        $("#tweet-text").val("");
      });
    }
  });
});
