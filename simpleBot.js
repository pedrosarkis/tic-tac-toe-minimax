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
            makeMove(botMoveAI(), AI);
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

 const checkWin = (player, currentBoard = false) => {
     
    const plays = currentBoard || board;
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

 const checkFreeCells = (currentBoard = false) => {
     debugger;
     const boardToCheck = currentBoard || board;
     return boardToCheck.filter(cell => typeof cell === 'number');
 }

 const generateRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
 }

const botMove = () => {
    const freeCells = checkFreeCells();
    const randomNumber = generateRandomNumber(0, freeCells.length -1);
    return freeCells[randomNumber];
}

const botMoveAI = () => {
    return minimax(board, AI).index;
}

const minimax = (boardState, player) => {
    
    const possibleMoves = checkFreeCells(boardState);
    
    if(checkWin(boardState, HUMAN)) {
        return {score: -100}
    } else if(checkWin(boardState, AI)){
        return {score: 100}
    } else if(possibleMoves.length === 0) {
        return {score: 0}
    }

    const allTestedMoves = [];

    for( let i =0; i < possibleMoves.length; i++){
        const currentMove = {};

        currentMove.index = boardState[possibleMoves[i]];
        boardState[possibleMoves[i]] = player;

        if(player === AI) {
            const result = minimax(boardState, HUMAN);
            currentMove.score = result.score;
        } else {
            const result = minimax(boardState, AI);
            currentMove.score = result.score;
        }

        boardState[possibleMoves[i]] = currentMove.index;
        allTestedMoves.push(currentMove);

    }
    let bestTestPlay = null;

    if(player === AI) {
        let bestScore = -Infinity;
        for(let i =0; i < allTestedMoves.length; i++) {
            if(allTestedMoves[i].score > bestScore) {
                bestScore = allTestedMoves[i].score;
                bestTestPlay = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for(let i =0; i < allTestedMoves.length; i++) {
            if(allTestedMoves[i].score < bestScore) {
                bestScore = allTestedMoves[i].score;
                bestTestPlay = i;
            }
        }
    }

    return allTestedMoves[bestTestPlay];

};

//TODO 
//implement alpha beta pruning 