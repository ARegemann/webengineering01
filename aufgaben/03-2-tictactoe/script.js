let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let cells = document.querySelector("#board").children;

function makeMove(index) {
    if (!board[index] && !gameOver) {
        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        console.log(currentPlayer);
        checkWin(index);
        switchPlayer();
    }
}

function checkWin(position) {
    checkRows(position);
    checkColumns(position);
    checkDiagonals(position);
}

function checkColumns(position) {
    position = position % 3;
    if (board[position] === board[position + 3] && board[position] === board[position + 6]) {
        doWin(position, position + 3, position + 6);
        console.log("col");
    }
}

function checkRows(position) {
    position = Math.floor(position / 3) * 3;
    if (board[position] === board[position + 1] && board[position + 1] === board[position + 2]) {
        doWin(position, position + 1, position + 2);
        console.log("row");
    }
}

function checkDiagonals(position) {
    if (!(position % 2)) {
        if (board[0] && board[0] === board[4] && board[0] === board[8]) {
            doWin(0, 4, 8);
            console.log("tlbr");
        } else if (board[2] && board[2] === board[4] && board[4] === board[6]) {
            doWin(2, 4, 6);
            console.log("trbl");
        }
    }
}

function doWin(a, b, c) {
    cells[a].classList.add("winning-cell");
    cells[b].classList.add("winning-cell");
    cells[c].classList.add("winning-cell");
    gameOver = true;
    alert(currentPlayer + " won");
    setTimeout(() => {
        resetGame();
    }, 1000);
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].classList.remove("winning-cell");
    }
    gameOver = false;
    currentPlayer = 'X';
}
