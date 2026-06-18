async function getQuote() {

    try {

        const response = await fetch(
            "https://dummyjson.com/quotes/random"
        );

        const data = await response.json();

        document.getElementById("quote").innerText =
            `"${data.quote}"`;

        document.getElementById("author").innerText =
            "- " + data.author;

    }
    catch (error) {

        console.error(error);

        alert("Unable to fetch quote");
    }
}

function copyQuote(){

    const quote =
    document.getElementById(
    "quote").innerText;

    navigator.clipboard
    .writeText(quote);

    alert("Quote Copied!");
}

function shareQuote(){

    const quote =
    document.getElementById(
    "quote").innerText;

    const url =
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`;

    window.open(url,"_blank");
}