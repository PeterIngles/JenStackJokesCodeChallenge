console.log('client.js sourced');

$( document ).ready( onReady );

let jokes

function onReady() {
    console.log('client-side loaded!');

    // Retrieve history on page load
    getJokes()

    // click listeners
    $('#addJokeButton').on('click', addJoke)
}

function getJokes(){
    // GET request to retrieve jokes
    // Call render to refresh DOM
    $.ajax({
        method: "GET",
        url: "/jokes"
    }).then((response) => {
        console.log("getJokes response:",response)
        render(response)
    }).catch((error) => {
        alert("Error sending GET request /math")
    })
    
}

function addJoke(){
    console.log('inside get jokes')

    let whoseJoke = $('#whoseJokeIn').val()
    let jokeQuestion = $('#questionIn').val()
    let punchLine = $('#punchlineIn').val()

    let dataToSend = {
        whoseJoke,
        jokeQuestion,
        punchLine,
    }
    // Store whoseJoke, question and punchline in dataToSend
    // Ajax POST request
    // GET to retrieve latest history
    // Rerender
    $.ajax({
        method: "POST",
        url: '/jokes',
        data: dataToSend
    }).then((response) => {
        console.log("Post was succesfull")
        getJokes()
    }).catch((error) => {
        alert("Error sending POST request /math")
    })
}

function render(jokes) {
    console.log("In render")
    // Will clear DOM container for jokes
    // Append new jokes to the DOM
    $('#outputDiv').empty()
    for (let joke of jokes) {
        console.log('joke is:', joke.whoseJoke)
        $('#outputDiv').append(`
        <li>${joke.whoseJoke},  ${joke.jokeQuestion}  ${joke.punchLine}</li>`)
    }
}