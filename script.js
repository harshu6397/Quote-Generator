// Get Quotes from APi

// Quotes Array
let parsedData = []

// Show new Quote
function newQuote() {
    // Pick a random Quote from the array
    let random = Math.floor(Math.random() * parsedData.length);
    const quote = parsedData[random];
    console.log(quote);
    let quoteText = quote.content;
    let quoteAuthor = quote.author;

    // Check whether the quote has length greater than 50 characters
    if (quoteText.length > 100) {
        document.getElementById("quote-text").classList.add("long-quote");
    }
    else {
        document.getElementById("quote-text").classList.remove("long-quote");
    }

    // Display the Quote
    let quoteTextHTML = `<i class="fas fa-quote-left"></i>
                         <span id="quote">${quoteText}</span>`;
    let quoteAuthorHTML = `<span id="author">   &#8722; ${quoteAuthor === null ? "Unknown" : quoteAuthor}</span>`;
    document.getElementById("quote-text").innerHTML = quoteTextHTML;
    document.getElementById("quote-author").innerHTML = quoteAuthorHTML;
}

// Show loading
function showLoading() {
    document.getElementById("quote-container").hidden = true;
    document.getElementById("loader").hidden = false;
}

// Loading Complete
function CompleteLoading() {
    document.getElementById("quote-container").hidden = false;
    document.getElementById("loader").hidden = true;
}

// Fetch the data from the API
async function getQuotes() {
    // const url = "https://type.fit/api/quotes";
    const url = `https://quotable.io/quotes?limit=150&page=${Math.floor(Math.random() * (Math.ceil(2043/150)))}`;
    try {
        showLoading();
        const data = await fetch(url);
        parsedData = await data.json();
        parsedData = parsedData['results'];
        CompleteLoading();
        newQuote();
    }
    catch (error) {
        // alert("Error: " + error);
        console.log(error)
    }
}

// Get Quotes on Load
getQuotes();

let newQuoteButton = document.getElementById("new-quote");
newQuoteButton.addEventListener("click", newQuote);

// Tweet the Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${document.getElementById("quote").textContent} - ${document.getElementById('author').textContent}`;
    window.open(twitterUrl, "_blank")
}

let tweetBtn = document.getElementById("twitter");
tweetBtn.addEventListener("click", tweetQuote);
