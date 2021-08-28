const cellElements = document.querySelectorAll('[data-cell]');
const cross_class = 'cross';
const circle_class = 'circle';
const board = document.getElementById('board');
const restartButton = document.getElementById('restart');
const winning_message_element = document.getElementById('result');
const winning_message_text_element = document.querySelector('[data-result-text]')
const winning_combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
let circleTurn;
startGame();
restartButton.addEventListener('click', startGame);
function startGame() {
    circleTurn = false;//to ensure initial hover
    cellElements.forEach(cell => {
        /**undoinng all things so that the game restarts again */
        cell.classList.remove(cross_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })// to ensure that once called it is not fired again i.e to ensure that a particular cell is clicked only once
    });
    hoverclass();
    //undoing all thing so  that once we get the result and restart button is clicked the  board sets again
    winning_message_element.classList.remove('show');
}
function handleClick(event) {
    //console.log('clicked');
    const cell = event.target;
    const current_class = circleTurn ? circle_class : cross_class;
    placeMark(cell, current_class);
    if (checkWin(current_class)) {
        // console.log("Winner");
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        switchTurns();
        hoverclass();// imp to  do it after switchTurn function sp that it hovers to current class
    }


}
function endGame(draw) {
    if (draw) {
        winning_message_text_element.innerText = 'Draw!!';

    }
    else {
        winning_message_text_element.innerText = `${circleTurn ? "O" : "X"} Wins!!`;
    }
    winning_message_element.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {// to check if every cell is //destructing cell element into array
        return cell.classList.contains(cross_class) || cell.classList.contains(circle_class)
    })
}
function placeMark(cell, current_class) {
    cell.classList.add(current_class)
}
function switchTurns() {
    circleTurn = !circleTurn;
}
function hoverclass() {
    board.classList.remove(cross_class);
    board.classList.remove(circle_class);
    if (circleTurn) {
        board.classList.add(circle_class);
    }
    else board.classList.add(cross_class);

}
function checkWin(current_class) {
    return winning_combination.some(combination => {// to check if some of the  winning combination is met
        return combination.every(index => {// to loop over all the indexes of  the combination
            return cellElements[index].classList.contains(current_class);// to check if all the three  cell contain the same class
        })
    })
}