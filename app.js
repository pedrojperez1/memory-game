let flippedCards = [];
const board = document.querySelector(".grid");
const newGame = document.querySelector("#newgame");
let shuffled_array = shuffle([1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8])
let clicks = 0;
let score = 0;

initializeCards(board, shuffled_array);
if (localStorage.lowscore) {
    const lowscore = localStorage.getItem("lowscore");
    const scoreboard = document.querySelector("#lowscore");
    scoreboard.innerText = lowscore;
} else {
    scoreboard.innerText = "0";
}

board.addEventListener("click", function(e) {
    clicks++;
    if (e.target.classList.contains("box")) {
        flipCard(e.target.children[0]);
        if (flippedCards.length > 1) {
            checkAndFlipBack(flippedCards);
        }
    } else if (e.target.classList.contains("inner")) {
        flipCard(e.target);
    }
    if (score === 8) {
        if (clicks < lowscore) {
            localStorage.setItem("lowscore", clicks);
        }
        if(confirm(`You won with ${clicks} clicks!`)){
            window.location.reload(); 
        }
    }
})

newGame.addEventListener("click", function() {
    flippedCards = [];
    clicks = 0;
    score = 0;
    shuffled_array = shuffle([1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]);
    initializeCards(board, shuffled_array);
})

function checkAndFlipBack(flipped) {
    console.log(`Checking ${flipped[0].innerText} and ${flipped[1].innerText}`);    
    if (flipped[0].innerText === flipped[1].innerText) {
        flipped[0].style.backgroundColor = "rgb(240, 178, 167)";
        flipped[1].style.backgroundColor = "rgb(240, 178, 167)";
        flippedCards = [];
        score++;
        console.log("It's a match!");
    } else {
        setTimeout(function() {
            flipCard(flipped[0]);
            flipCard(flipped[1]);
            flippedCards = [];
        }, 1000)
        console.log("It's not a match!");
    }
}
function flipAllCards(board) {
    for (let row of board.children) {
        for (let card of row.children) {
            card.children[0].classList.add("flipped");
        }
    }
}
function flipCard(card) {
    card.classList.toggle("flipped");
    flippedCards.push(card);
}

function initializeCards(board, array) {
    let i = 0;
    for (let row of board.children) {
        for (let card of row.children) {
            card.children[0].innerText = array[i];
            i++;
        }
    }
    flipAllCards(board);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
