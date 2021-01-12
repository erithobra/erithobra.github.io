console.log("script file 2 linked");

// Create image array that will be used for cards

    // creating initial image array for cards
    let dataArray = ["images/ace_of_clubs.svg", "images/ace_of_spades.svg", "images/ace_of_diamonds.svg", "images/ace_of_hearts.svg", "images/king_of_clubs.svg", "images/king_of_spades.svg"];
    // doubling array length and creating duplicate values so every image has a matching image
    dataArray = dataArray.concat(dataArray);
    // randomizing the image order -- https://flaviocopes.com/how-to-shuffle-array-javascript/
    //dataArray = dataArray.sort(() => Math.random() - 0.5);


// Board settings
// manual input of settings at this time
let columnInput = 4;
let rowInput = 3;

// convert rows and columns to strings so that that they can be added to CSS properties
let columnString = "";
let rowString = "";
for (let i = 0; i < columnInput; i++) {
    columnString += "auto ";
}
for (let i=0; i<rowInput; i++) {
    rowString += "auto ";
}
columnString = columnString.slice(0, columnString.length-1);
rowString = rowString.slice(0, columnString.length-1);

const grid = document.querySelector("container");
grid.style.gridTemplateColumns = columnString;
grid.style.gridTemplateRows = rowString;

// create board and cards
let numberOfCards = columnInput * rowInput;
for (let i=1; i <= numberOfCards; i++) {
    // shortcuts to create new elements
    let flipCard = document.createElement("div");
    let flipCardInner = document.createElement("div");
    let flipCardBack = document.createElement("div");
    let cardBack = document.createElement("img");
    let flipCardFront = document.createElement("div");
    let cardFront = document.createElement("img");
    
    // add classes needed for CSS animation
    flipCard.classList.add("flip-card");
    flipCardInner.classList.add("flip-card-inner");
    flipCardBack.classList.add("flip-card-back");
    flipCardFront.classList.add("flip-card-front");
    
    // add IDs so that cards can be targeted individually
    flipCard.setAttribute("id", `flipCard${i}`);
    flipCardInner.setAttribute("id", `flipCardInner${i}`);
    flipCardFront.setAttribute("id", `flipCardFront${i}`);
    cardFront.setAttribute("id", `cardFront${i}`);
    flipCardBack.setAttribute("id", `flipCardBack${i}`);
    cardBack.setAttribute("id", `cardBack${i}`);
    
    // create the elements
    grid.appendChild(flipCard);
    flipCard.appendChild(flipCardInner);
    flipCardInner.appendChild(flipCardFront);
    flipCardFront.appendChild(cardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCardBack.appendChild(cardBack);
    
    // assign images to cards
    assignCards(i)
}

// assign images to cards
function assignCards(i) {
    document.querySelector(`#cardBack${i}`).setAttribute("src", "images/card-back2.png");
    document.querySelector(`#cardFront${i}`).setAttribute("src", `${dataArray[i-1]}`);
}

let flipCount = 0;
for (let i=1; i <= numberOfCards; i++) {
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
        //dataArray = dataArray.sort(() => Math.random() - 0.5);
        for (let i = 1; i <= numberOfCards; i++) {
            let cardFront = document.querySelector(`#flipCardFront${i}`);
            let cardInner = document.querySelector(`#flipCardInner${i}`);
            cardFront.classList.replace("invisible", "flip-card-front");
            cardInner.classList.replace("invisible", "flip-card-inner");
            cardInner.style.transform = "rotateY(0deg)";
            assignCards(i);
        }
    }

    const cardClick = document.querySelector(`#cardBack${i}`);
    cardClick.addEventListener("click", function(e){
        if (flipCount < 2){
            document.querySelector(`#flipCardInner${i}`).style.transform = "rotateY(180deg)";
            flipCount++;
            console.log("flipCount :" + flipCount);
            if (flipCount == 2) {
                let holdClick=0;
                document.body.addEventListener("click", function(e) {
                    holdClick++;
                    console.log("holdClick: " + holdClick);
                    if (holdClick == 2) {
                        matchCheck();
                    }
                })
            }
        }
    })
}


let cardCompare = [];

function matchCheck() {
    if (flipCount == 2) {
        flipCount = 0;
        for (let i = 1; i <= numberOfCards; i++) {
            const clickedCard = document.querySelector(`#flipCardInner${i}`).style.transform;
            if (clickedCard == "rotateY(180deg)" && cardCompare[0] == null) {
                cardCompare.push(i);
            } else if (clickedCard == "rotateY(180deg)" && cardCompare[0] >= 0){
                cardCompare.push(i);
            }
        }
        // if cards match then change class to matchedCards
        let cardOne = document.querySelector(`#cardFront${cardCompare[0]}`).src;
        let cardTwo = document.querySelector(`#cardFront${cardCompare[1]}`).src;
        let cardOneFront = document.querySelector(`#flipCardFront${cardCompare[0]}`);
        let cardTwoFront = document.querySelector(`#flipCardFront${cardCompare[1]}`);
        let cardOneInner = document.querySelector(`#flipCardInner${cardCompare[0]}`);
        let cardTwoInner = document.querySelector(`#flipCardInner${cardCompare[1]}`);
        console.log("before check: " + cardCompare);
        if (cardOne == cardTwo) {
            cardOneFront.classList.replace("flip-card-front", "invisible");
            cardTwoFront.classList.replace("flip-card-front", "invisible");
            cardOneInner.classList.replace("flip-card-inner", "invisible");
            cardTwoInner.classList.replace("flip-card-inner", "invisible");
            cardOneInner.style.transform = "rotateY(0deg)";
            cardTwoInner.style.transform = "rotateY(0deg)";            
            cardCompare = [];
            console.log("after check: " + cardCompare);
            matchMessage();
        } else {
            cardOneInner.style.transform = "rotateY(0deg)";
            cardTwoInner.style.transform = "rotateY(0deg)";
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

const matchMessage = function() {
    turnCount++;
    document.querySelector("h1").innerHTML = "You got a match! Keep going!";
    for (let i = 1; i <= numberOfCards; i++) {
        if (document.querySelector(`#flipCardFront${i}`).classList.value == "invisible") {
            totalMatchedCards++;
            document.querySelector("#matchCounter").innerHTML = `Matches found: ${totalMatchedCards/2} out of ${numberOfCards/2}`;
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