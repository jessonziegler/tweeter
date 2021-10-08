//The function below makes character counter work and makes number turn red when it gets to 0
$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    const counter = 140 - $(this).val().length;
    const counterElement = $(this).next().children(".counter");
    counterElement.text(counter);
    if (counter < 0) {
      counterElement.addClass("red");
    } else {
      counterElement.removeClass("red");
    }
  });
});
