window.addEventListener("load", loader());

function loader() {
  let load = this.document.getElementById("load-screen");
  let actual = this.document.getElementById("actual-screen");
  this.setTimeout(() => {
    load.style.display = "none";
    actual.style.display = "block";
  }, 400);
}
let colors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#03A9F4",
  "#8BC34A",
  "#4CAF50",
  "#FF5722",
  "#FF9800",
  "#2196F3",
  "#009688",
];

let len_colors = colors.length;

let body = $("body");
let new_quote_btn = $("#new-quote");
let twitter = $("#tweet-quote");
let tumblr = $("#tumblr");
let btn = $(".btn");

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json",
    },
    url: "https://gist.githubusercontent.com/abhijitunavane/91c830408e64d12ca03012641e651fa7/raw/72928129625dc29ad0f97fe19442d14489538af9/quotes.json",
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === "string") {
        quotesData = JSON.parse(jsonQuotes);
      }
    },
  });
}

function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}
function getQuote() {
  let color = colors[Math.floor(Math.random() * len_colors)];

  let newQuote = getRandomQuote();

  body.css("background-color", color);

  let quotes_text_blockquote = document.querySelectorAll(
    "#quotes, #text, .blockquote-footer"
  );
  quotes_text_blockquote.forEach((element) => {
    if (element.getAttribute("id") === "text") {
      element.innerHTML = " " + newQuote.quote;
    } else if (element.tagName === "FOOTER") {
      element.innerHTML = " " + newQuote.author;
    }
    element.style.transition = "color 2s";
    element.style.color = color;
  });

  btn.css({
    "background-color": color,
    "border-color": color,
  });

  twitter.attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
      encodeURIComponent('"' + newQuote.quote + '" \n-' + newQuote.author)
  );

  tumblr.attr(
    "href",
    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=" +
      encodeURIComponent(newQuote.quote) +
      "&content=" +
      encodeURIComponent(newQuote.author) +
      "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
  );
}

$(document).ready(function () {
  $(".btn").mousedown(function (event) {
    // Removes focus of the button.
    event.preventDefault();
  });


  getQuotes().then(() => {
    getQuote();
  });


  new_quote_btn.click(() => {
    getQuote();
  });
});
