let board;
const HUMAN = '0';
const AI = 'x';
const cells = Array.from(document.getElementsByClassName('cell'));

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    [0, 4, 8],
    [2, 4, 6]
  ];


const onTurnClick = (e) => {
    const {id} = e.target;
    if(!isNaN(board[id])) {
        makeMove(id, HUMAN);
        const humanWon = checkWin(HUMAN);
        if(checkFreeCells().length && !humanWon) {
            makeMove(botMove(), AI);
        } 
    }
}

const startGame = () => {
    board = Array.from(Array(9).keys());
    cells.forEach((cell, index) => {
        cell.innerText = '';
        cell.style.removeProperty('background-color');
        cell.addEventListener('click', onTurnClick, false)
    })
}

startGame();


const makeMove = (id, player) => {
    board[id] = player;
    document.getElementById(id).innerText = player;
    checkWin(player);
}

 const checkWin = (player) => {
    const plays = board;
    let winner = false;
    for (let i = 0; i < winningCombination.length; i++) {
       const hasWinner = winningCombination[i].every(combination => plays[combination] === player);
       if(hasWinner) {
           winner = true;
           cells.forEach(cell => {
               cell.removeEventListener('click', onTurnClick, false);
           })
           break;
       }
    }
    return winner;
 }

 const checkTie = (player) => {
     const allMovesPlayed = board.filter(cell => typeof cell === 'number').length === 0;
     return allMovesPlayed && !checkWin(player);
 }

 const checkFreeCells = () => {
     return board.filter(cell => typeof cell === 'number');
 }

 const generateRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
 }

const botMove = () => {
    const freeCells = checkFreeCells();
    const randomNumber = generateRandomNumber(0, freeCells.length -1);
    return freeCells[randomNumber];
}

const minimax = (boardState, player) => {
    // logica recursiva do minimax primeiro
    //dps implementar o pruning
    let bestMove = {};

    return bestMove;

};

//TODO 
//implement my own minimax algorithm 
//implement alpha beta pruning 