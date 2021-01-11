console.log("script file linked");

////// DATA FOR CARDS //////
// have an array of data (1/2 the number of cards)
let dataArray = ["red", "yellow", "green", "blue", "purple", "black"];

// duplicate the data so that there are as many data points as cards
// there will be 1/2 as many unique values, meaning every card will have a matching data point
dataArray = dataArray.concat(dataArray);

// randomize the dataArray -- https://flaviocopes.com/how-to-shuffle-array-javascript/
dataArray = dataArray.sort(() => Math.random() - 0.5);

////// BOARD CREATION //////
// setting number of rows and columns (programmer input)
let columnInput = 4;
let rowInput = 3;

//converting rows and coluns to a string to add to template columns/rows CSS properties
let columnString = ""
let rowString = ""
for (let i=0; i<columnInput; i++) {
    columnString += "auto ";
}
for (let i=0; i<rowInput; i++) {
    rowString += "auto ";
}
const columnSetting = columnString.slice(0, columnString.length-1);
const rowSetting = rowString.slice(0, columnString.length-1);

// setting appropriate number of grid columns and rows in CSS
// also changing other grid properties in CSS
const grid = document.querySelector(".grid");
grid.style.backgroundColor = "gray";
grid.style.gridTemplateColumns = columnSetting; // https://www.w3schools.com/cssref/tryit.asp?filename=trycss_js_grid-template-columns
grid.style.gridTemplateRows = rowSetting;
grid.style.gridGap = "10px 10px"; // https://www.w3schools.com/cssref/tryit.asp?filename=trycss_js_grid-gap


// create "cards"
let numberOfCards = columnInput * rowInput;
for (let i=0; i<numberOfCards; i++) {
    let gridLocation = document.createElement("div"); 
    let card = document.createElement("a"); 
    gridLocation.classList.add("gridLocation");
    card.classList.add("card");
    gridLocation.setAttribute("id", `gridLocation${i+1}`);
    card.setAttribute("id", `card${i+1}`);
    grid.appendChild(gridLocation); // creates grid locations (or "slots") within the grid
    gridLocation.appendChild(card); // creates cards that go into grid locations
    assignCards(i);
}

// assign the data to the "card" divs
function assignCards(i) {
    document.querySelector(`#card${i+1}`).innerHTML = dataArray[i];
}

// add event listener to cards

let flipCount = 0;

// add an event listener to every card
for (let i = 0; i < numberOfCards; i++) {
    const resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click", function (e) {
    reset();
    })
    // reset function
    const reset = function() {
        console.log("reset clicked");
        for (let i = 0; i < numberOfCards; i++) {
            document.querySelector(`#gridLocation${i+1}`).classList.remove("flippedCard", "matchedCards")
            document.querySelector(`#card${i+1}`).classList.remove("visibleCard", "matchedCards")
            document.querySelector(`#gridLocation${i+1}`).classList.add("gridLocation");
            document.querySelector(`#card${i+1}`).classList.add("card");
            totalMatchedCards = 0;
            turnCount = 0
            document.querySelector("#matchCounter").innerHTML = "";
            document.querySelector("#turnCounter").innerHTML = "";
            document.querySelector("#gameGreeting").innterHTML = "Click cards. Find matches. Profit.";
            console.log(i);
        }
    }

    const oneCard = document.querySelector(`#gridLocation${i+1}`);
    const oneCard2 = document.querySelector(`#card${i+1}`);
    oneCard.addEventListener("click", function(){
        // updates the flipCount only if the card has not already been flipped
        if (oneCard.classList.value == "gridLocation" && flipCount < 2) {
            oneCard.classList.replace("gridLocation", "flippedCard");
            oneCard2.classList.replace("card", "visibleCard");
            flipCount++;
            // waits for click anywhere on the page before running flipCheck            
            if (flipCount == 2) {
                let holdClick = 0;
                console.log("flipcheck");
                document.body.addEventListener("click", function(e) {
                    holdClick++;
                    if (holdClick == 2){
                        console.log(holdClick);
                        flipCheck();
                    }
                })
            }
        }
    })
}

// create array of cards to compare
let cardCompare = [];


// resets flipCount to zero, populates selected cards to cardCompare, then compares the values of the cards
function flipCheck () {
    if (flipCount == 2) {
        flipCount = 0;
        console.log("reset cards");
        // populates selected cards to cardCompare by seeing which cards have the flippedCard class
        for (let i = 0; i < numberOfCards; i++) {
            const oneCard = document.querySelector(`#gridLocation${i+1}`);
            if (oneCard.classList.value == "flippedCard" && cardCompare[0] == null) {
                cardCompare.push(i);
                console.log(cardCompare);                 
            } else if (oneCard.classList.value == "flippedCard" && cardCompare[0] >= 0) {
                cardCompare.push(i);
                console.log(cardCompare);
            }
        }
        // if cards match, class will changed to matchedCards, else the cards will be returned to gridLocation class (flipped back over)
        if (document.querySelector(`#card${cardCompare[0]+1}`).innerHTML == document.querySelector(`#card${cardCompare[1]+1}`).innerHTML) {
            console.log(document.querySelector(`#card${cardCompare[0]+1}`).innerHTML);
            console.log(document.querySelector(`#card${cardCompare[1]+1}`).innerHTML);
            console.log("match");
            document.querySelector(`#gridLocation${cardCompare[0]+1}`).classList.replace("flippedCard", "matchedCards");
            document.querySelector(`#gridLocation${cardCompare[1]+1}`).classList.replace("flippedCard", "matchedCards");
            document.querySelector(`#card${cardCompare[0]+1}`).classList.replace("visibleCard", "matchedCards");
            document.querySelector(`#card${cardCompare[1]+1}`).classList.replace("visibleCard", "matchedCards");
            cardCompare = [];
            matchMessage();
            

        } else {
            document.querySelector(`#gridLocation${cardCompare[0]+1}`).classList.replace("flippedCard", "gridLocation");
            document.querySelector(`#gridLocation${cardCompare[1]+1}`).classList.replace("flippedCard", "gridLocation");
            document.querySelector(`#card${cardCompare[0]+1}`).classList.replace("visibleCard", "card");
            document.querySelector(`#card${cardCompare[1]+1}`).classList.replace("visibleCard", "card");        
            cardCompare = [];
            noMatchMessage();
        } 
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

let totalMatchedCards = 0;
let turnCount = 0;
///// why is the timer inconsistent? /////
const matchMessage = function () {
    turnCount++;
    document.querySelector("h1").innerHTML = "You got a match!! Keep going!";
    for (let i = 0; i < numberOfCards; i++) {
        if (document.querySelector(`#card${i+1}`).classList.value == "matchedCards") {
            totalMatchedCards++;
            console.log(totalMatchedCards);
            document.querySelector("#matchCounter").innerHTML = `Matches found: ${totalMatchedCards/2} out of ${numberOfCards/2}`
            document.querySelector("#turnCounter").innerHTML = `Turns taken: ${turnCount}`
            if (totalMatchedCards == numberOfCards) {
                console.log("game over, man!");
                // sleep(500);
                document.querySelector("h1").innerHTML = "YOU WIN!";
                document.querySelector("h2").innerHTML = "(hit \"reset\" to play again)";
            }
        }
    }
    totalMatchedCards = 0;
}

const noMatchMessage = function () {
    document.querySelector("h1").innerHTML = "No match. Try Again.";
    turnCount++;
    document.querySelector("#turnCounter").innerHTML = `Turns taken: ${turnCount}`
}

const clearMessage = function() {
    sleep(2000);
    document.querySelector("h1").innerHTML = "Top again.";
}
// PSEUDOCODE - BRONZE
// create a 4 x 3 grid
// populate each grid location with string data
// make each grid location clickable
// make clicking a grid location "reveal" that location
// create an event that "hides" the revealed locations
// allow for only 2 locations to be revealed before they must be hidden again
// compare values of revlealed locations
// if revealed locations match, hide them and remove them from play
// continue until all matches have been found