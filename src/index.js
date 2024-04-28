
const $state = document.querySelector("#state");
const $board = document.querySelector("#board");
const $startButton = document.querySelector("#start-button");
const $turns = document.querySelector("#turns");
const $img = document.querySelectorAll(".game-image");
let images = ["bootstrap", "node", "react", "sass"];
let turnCounter = 0;
let firstClickedImage = null;
let rightGuesses = 0;

blockUserInput();

$startButton.onclick = function () {
    setDefault();
    setTimeout(
        function () {
            displayRandomImages();
        }, 310
    );
    handleUserInput();
}

function changeState(text) {
    $state.textContent = text;
}

function displayRandomImages() {
    let totalImages = images.concat(images);
    
    //sorts images in a random order
    let randomImages = totalImages.sort(function () {
        return 0.5 - Math.random();
    });
    
    //gives every card a random image by changing its src
    $img.forEach(
        function (img, i) {
            img.src = `img/${randomImages[i]}.png`;
        }
    );
}

function hideImage (image) {
    if (image.classList.contains("shown")){
        image.classList.remove("shown");
        image.classList.add("hidden");
    }
}

function showImage (image) {
    if (image.classList.contains("hidden")) {
        image.classList.remove("hidden");
        image.classList.add("shown");
    }
}

function setDefault () {
    $board.style.opacity = "1";

    //hides all images
    $img.forEach(img => {
        hideImage(img);
    });

    changeState('Click "START" to play!')

    turnCounter = 0;
    displayTurnCounter();

    firstClickedImage = null;
    rightGuesses = 0;
}

function displayTurnCounter () {
    $turns.textContent = turnCounter;
}

function handleUserInput () {
    $board.onclick = function (e) {
        let clickedTarget = e.target;
        if (clickedTarget.classList.contains("game-image")) {
            handleClickedImage(clickedTarget);
        } 
    }
}

function handleClickedImage(clickedImage) {
    showImage(clickedImage);

    if (firstClickedImage === null) {
        firstClickedImage = clickedImage;
        console.log(firstClickedImage);
    } else {
        if (firstClickedImage === clickedImage) {
            return;
        }

        turnCounter++;
        displayTurnCounter();

        if (firstClickedImage.src === clickedImage.src) {
            showImage(firstClickedImage);
            showImage(clickedImage);
            changeState("It's a match!");
            rightGuesses++;
            checkGuesses(rightGuesses);
        } else {
            hideImage(firstClickedImage);
            changeState("Nope...")
            setTimeout(function () {
                hideImage(clickedImage);
            }, 400);
        }
        firstClickedImage = null;
    }
}


function checkGuesses (guesses) {
    if (guesses === 4) {
        winGame();
    }
}

function winGame () {
    changeState("You won! Congrats!");
    blockUserInput();
}

function blockUserInput () {
    $board.onclick = "";
    $board.style.opacity = "0.5";
}
