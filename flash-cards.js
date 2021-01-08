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

console.log("script file linked");

////// GRID CREATION //////
// setting number of rows and columns (programmer input)
let columnInput = 4;
let rowInput = 3;

//converting rows and coluns to a string to add to template columns/rows CSS properties
let columnString = ""
let rowString = ""
for (i=0; i<columnInput; i++) {
    columnString += "auto ";
}
for (i=0; i<rowInput; i++) {
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
for (i=0; i<numberOfCards; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `Card${i+1}`);
    grid.appendChild(card);
}


// grid.setAttribute("grid-template-columns", "auto")

// const div1 = document.querySelector("#id1");
// const div2 = document.querySelector("#id2");
// const div3 = document.querySelector("#id3");
// const div4 = document.querySelector("#id4");

// div1.setAttribute("grid-column-start", "1");
// div1.setAttribute("grid-column-end", "1");
// div2.setAttribute("grid-column-start", "1");
// div2.setAttribute("grid-column-end", "1");
// div3.setAttribute("grid-column-start", "2");
// div3.setAttribute("grid-column-end", "2");
// div4.setAttribute("grid-column-start", "1");
// div4.setAttribute("grid-column-end", "1");