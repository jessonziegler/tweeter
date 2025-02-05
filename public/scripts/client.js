// The function below will load the tweets
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
  $(".error").hide();

  // The function below will render the tweets
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  };

  // The function below will create the new tweets by pulling from database
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

  // The fuction below will make tweet submit button work and handle error messages functionality
  $form.on("submit", function (event) {
    $(".error").slideUp();
    event.preventDefault();
    let counter = $("#tweet-text").val().length;
    if (counter <= 0) {
      $(".errormessage").text("Please Type Something");
      $(".error").slideDown().fadeOut(8000);
    } else if (counter > 140) {
      $(".errormessage").text("Please Use 140 Characters Or Less");
      $(".error").slideDown().fadeOut(8000);
    } else {
      $(".error").slideUp();
      console.log("form was submitted");

      const serializedData = $(this).serialize();

      $.post("/tweets", serializedData, (response) => {
        loadTweets();
        $("#tweet-text").val("");
        $(".counter").text(140);
      });
    }
  });
});
