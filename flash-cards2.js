console.log("script file 2 linked");

// Create image array that will be used for cards

    // creating initial image array for cards
    let dataArray = ["images/ace_of_clubs.svg", "images/ace_of_spades.svg", "images/ace_of_diamonds.svg", "images/ace_of_hearts.svg", "images/king_of_clubs.svg", "images/king_of_spades.svg"];
    // doubling array length and creating duplicate values so every image has a matching image
    dataArray = dataArray.concat(dataArray);
    // randomizing the image order -- https://flaviocopes.com/how-to-shuffle-array-javascript/
    dataArray = dataArray.sort(() => Math.random() - 0.5);


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