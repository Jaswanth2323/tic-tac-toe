const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const playAgainButton = document.getElementById('play-again-button');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameEnded = true;
            return board[a];
        }
    }

    if (!board.includes('')) {
        gameEnded = true;
        return 'draw';
    }

    return null;
}

function handleCellClick(index) {
    if (board[index] || gameEnded) return;

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer);

    const winner = checkWinner();
    if (winner) {
        if (winner === 'draw') {
            resultMessage.textContent = 'It\'s a draw!';
        } else {
            resultMessage.textContent = `Player ${winner} wins!`;
        }
        resultScreen.style.display = 'flex';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameEnded = false;
    currentPlayer = 'X';
    message.textContent = 'Player X\'s turn';
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    resultScreen.style.display = 'none';
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);
playAgainButton.addEventListener('click', resetGame);

resetGame();
