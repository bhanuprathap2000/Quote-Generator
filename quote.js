const quoteContainer=document.getElementById("quote-container");
const quoteText=document.getElementById("quote");
const authorText=document.getElementById("author");
const twitterBtn=document.getElementById("twitter");
const newQuoteBtn=document.getElementById("new-quote");
const loader=document.getElementById("loader");

// Loading spinner

function showLoadSpinner(){

    quoteContainer.hidden=true;
    loader.hidden=false;
}

//remove spinner

function removeLoadSpinner(){

    quoteContainer.hidden=false;
    loader.hidden=true;
}



// Get Quote From API

async function getQuote(){
    showLoadSpinner();
    // To get around the cors error we are using this proxyUrl 
    const proxyUrl="https://mycorsproxy-tu.herokuapp.com/";
     const apiUrl="https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    
    try {

        const resposne=await fetch( proxyUrl +apiUrl);

        const data=await resposne.json();

        if (data.author===""){
            authorText.innerText="Unknown";

        }
        else{
            authorText.innerHTML=data.quoteAuthor;

        }
              
        if(data.quoteText.length>120){
            quoteText.classList.add("long-quote");

        }
        else{
            quoteText.classList.remove("long-quote");


        }
        removeLoadSpinner();
        quoteText.innerHTML=data.quoteText;

        

    }catch (err){
        // getQuote(); //api is poorly implemented hence when we get the error we will call again to the server.

    }



}

function tweetQuote(){

    const quote=quoteText.innerText;
    const author=authorText.innerText;

    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,"_blank");
}

newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

getQuote();