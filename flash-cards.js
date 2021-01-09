console.log("script file linked");

////// DATA FOR CARDS //////
// have an array of data (1/2 the number of cards)
let dataArray = ["red", "yellow", "green", "blue", "purple", "black"];

// duplicate the data so that there are as many data points as cards
// there will be 1/2 as many unique values, meaning every card will have a matching data point
dataArray = dataArray.concat(dataArray);

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
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `Card${i+1}`);
    grid.appendChild(card);
    assignCards(i);
}

// assign the data to the "card" divs
function assignCards(i) {
    document.querySelector(`#Card${i+1}`).innerHTML = dataArray[i];
}




// cardPopulation();
// let cardArray = [];
// function cardPopulation(){
//     for (let i=0; i<numberOfCards; i++){
//         cardArray.push(`Card${i+1}`);
//     }
// }



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