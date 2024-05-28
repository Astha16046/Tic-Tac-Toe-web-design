const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const message = document.querySelector('.message');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        message.textContent = `Player ${currentPlayer} Wins!`;
    } else if (board.every(cell => cell !== '')) {
        gameActive = false;
        message.textContent = 'Draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            aiMove();
        }
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => (cell.textContent = ''));
    message.textContent = '';
}

function aiMove() {
    let availableMoves = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    setTimeout(() => {
        board[move] = currentPlayer;
        cells[move].textContent = currentPlayer;

        if (checkWin()) {
            gameActive = false;
            message.textContent = `Player ${currentPlayer} Wins!`;
        } else if (board.every(cell => cell !== '')) {
            gameActive = false;
            message.textContent = 'Draw!';
        } else {
            currentPlayer = 'X';
        }
    }, 500);
}
