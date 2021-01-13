# Project-1---Game
Game for Project 1
Objective Level 1:
    a.) Creat a 4x3 grid with pre-defined text strings in each grid location
the ability to click on grid locations to reveal the text string at each location.
    b.) provide an indication of when 2 selected items match.
        - achieved by comparing the assigned class of the two selected elements.
    c.) provide an indication of when 2 selected items do not match.
        - done to provide feedback to user and to take the two matching cards out of play.
    d.) provide an indication of when all matches have been found.
        - done to provide feedback to user and to rest play to next turn.

Objective Level 2:
    a.) create a counter of total matches.
        - keeps track of the total number of matches found, which can also be used to determine if the game has concluded.
    b.) create a counter of total turns.
        - allows user to see how many turns they have taken at any given point in the game.
    c.) write better CSS to represent the flash cards.
        - replaced simple box layout with a common image on the back of each card.
    d.) create a reset button.
        - allows the user to reset the game at any point and continue playing without having to resfresh the page.

Objective Level 3:
    a.) replace text strings with images.
        - replaced text strings on card face with images from an array.
    b.) randomize image placement.
        - created randomized card layout so that the game is different every time
        - https://flaviocopes.com/how-to-shuffle-array-javascript/
    c.) iclude CSS animations to show cards being flipped
        - required a re-write of code to include more div levely/layers, same logic was used to control game function.
        - used https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_flip_card as template.