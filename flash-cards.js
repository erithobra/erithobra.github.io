console.log("script file linked");

////// DATA FOR CARDS //////
// have an array of data (1/2 the number of cards)
let dataArray = ["images/ace_of_clubs.svg", "images/ace_of_spades.svg", "images/ace_of_diamonds.svg", "images/ace_of_hearts.svg", "images/king_of_clubs.svg", "images/king_of_spades.svg"];

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
grid.style.gridTemplateColumns = columnSetting; // https://www.w3schools.com/cssref/tryit.asp?filename=trycss_js_grid-template-columns
grid.style.gridTemplateRows = rowSetting;
grid.style.gridGap = "10px 10px"; // https://www.w3schools.com/cssref/tryit.asp?filename=trycss_js_grid-gap


// create "cards"
let numberOfCards = columnInput * rowInput;
for (let i=0; i<numberOfCards; i++) {
    let gridLocation = document.createElement("div");
    let card = document.createElement("img");
    let cardBack = document.createElement("img");
    card.classList.add("card");
    cardBack.classList.add("gridLocation");
    gridLocation.setAttribute("id", `gridLocation${i+1}`);
    card.setAttribute("id", `card${i+1}`);
    cardBack.setAttribute("src", "images/card-back2.png");
    cardBack.setAttribute("id", `cardBack${i+1}`)
    grid.appendChild(gridLocation); // creates grid locations (or "slots") within the grid
    gridLocation.appendChild(card); // creates cards that go into grid locations
    gridLocation.appendChild(cardBack);
    assignCards(i);
}

// assign the data to the "card" divs
function assignCards(i) {
    document.querySelector(`#card${i+1}`).setAttribute("src", `${dataArray[i]}`);
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
        totalMatchedCards = 0;
        turnCount = 0;
        holdClick =0;
        flipCount = 0;
        document.querySelector("#matchCounter").innerHTML = "";
        document.querySelector("#turnCounter").innerHTML = "";
        document.querySelector("#gameGreeting").innerHTML = "Click cards. Find matches. Profit.";
        document.querySelector("h2").innerHTML = "";
        dataArray = dataArray.sort(() => Math.random() - 0.5);
        for (let i = 0; i < numberOfCards; i++) {
            document.querySelector(`#card${i+1}`).classList.remove("visibleCard", "invisibleCard", "card")
            document.querySelector(`#cardBack${i+1}`).classList.remove("matchedCardBack", "gridLocation", "invisibleGridLocation");
            document.querySelector(`#card${i+1}`).classList.add("card");
            document.querySelector(`#cardBack${i+1}`).classList.add("gridLocation");
            assignCards(i);
        }
    }

    const oneCard = document.querySelector(`#gridLocation${i+1}`);
    const oneCard2 = document.querySelector(`#card${i+1}`);
    const oneCard3 = document.querySelector(`#cardBack${i+1}`)

    oneCard.addEventListener("click", function(){
        // updates the flipCount only if the card has not already been flipped
        if (oneCard3.classList.value == "gridLocation" && flipCount < 2) {
            oneCard.classList.replace("gridLocation", "flippedCard");
            oneCard2.classList.replace("card", "visibleCard");
            oneCard3.classList.replace("gridLocation", "invisibleGridLocation")
            flipCount++;
            // waits for click anywhere on the page before running flipCheck            
            if (flipCount == 2) {
                let holdClick = 0;
                document.body.addEventListener("click", function(e) {
                    holdClick++;
                    if (holdClick == 2){
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
        // populates selected cards to cardCompare by seeing which cards have the flippedCard class
        for (let i = 0; i < numberOfCards; i++) {
            const oneCard3 = document.querySelector(`#cardBack${i+1}`);
            if (oneCard3.classList.value == "invisibleGridLocation" && cardCompare[0] == null) {
                cardCompare.push(i);
            } else if (oneCard3.classList.value == "invisibleGridLocation" && cardCompare[0] >= 0) {
                cardCompare.push(i);
            }
        }
        // if cards match, class will changed to matchedCards, else the cards will be returned to gridLocation class (flipped back over)
        if (document.querySelector(`#card${cardCompare[0]+1}`).getAttribute("src") == document.querySelector(`#card${cardCompare[1]+1}`).getAttribute("src")) {
            document.querySelector(`#cardBack${cardCompare[0]+1}`).classList.replace("invisibleGridLocation", "matchedCardBack");
            document.querySelector(`#cardBack${cardCompare[1]+1}`).classList.replace("invisibleGridLocation", "matchedCardBack");
            document.querySelector(`#card${cardCompare[0]+1}`).classList.replace("visibleCard", "invisibleCard");
            document.querySelector(`#card${cardCompare[1]+1}`).classList.replace("visibleCard", "invisibleCard");
            cardCompare = [];
            matchMessage();

        } else {
            document.querySelector(`#cardBack${cardCompare[0]+1}`).classList.replace("invisibleGridLocation", "gridLocation");
            document.querySelector(`#cardBack${cardCompare[1]+1}`).classList.replace("invisibleGridLocation", "gridLocation");
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
        if (document.querySelector(`#card${i+1}`).classList.value == "invisibleCard") {
            totalMatchedCards++;
            document.querySelector("#matchCounter").innerHTML = `Matches found: ${totalMatchedCards/2} out of ${numberOfCards/2}`
            document.querySelector("#turnCounter").innerHTML = `Turns taken: ${turnCount}`
            if (totalMatchedCards == numberOfCards) {
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