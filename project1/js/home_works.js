//gmail
const gmailInput = document.getElementById('gmail_input');
const gmailButton = document.getElementById('gmail_button');
const gmailResult = document.getElementById('gmail_result');

    gmailButton.addEventListener('click', () => {
        const email = gmailInput.value.trim();

        if (isValidGmail(email)) {
            gmailResult.textContent = 'Gmail is valid!';
            gmailResult.style.color = 'green';
        } else {
            gmailResult.textContent = 'Invalid Gmail format';
            gmailResult.style.color = 'red';
        }
    });

const isValidGmail = (email) => {
        const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        return gmailRegex.test(email);
    };

//move block

const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

const moveRight = (position) => {
    if (position < parentBlock.offsetWidth - childBlock.offsetWidth) {
        childBlock.style.left = `${position}px`;
        setTimeout(() => moveRight(position + 5), 10); 
        }
    };

moveRight(0);

//Homework 2 part1
const moveSquare = (positionX, positionY, directionX, directionY) => {
    const step = 2;

    if (directionX === 1 && positionX < parentBlock.offsetWidth - childBlock.offsetWidth) {
        positionX += step;
    } else if (directionX === 1 && positionX >= parentBlock.offsetWidth - childBlock.offsetWidth) {
        directionX = 0;
        directionY = 1;
    } else if (directionY === 1 && positionY < parentBlock.offsetHeight - childBlock.offsetHeight) {
        positionY += step;
    } else if (directionY === 1 && positionY >= parentBlock.offsetHeight - childBlock.offsetHeight) {
        directionX = -1;
        directionY = 0;
    } else if (directionX === -1 && positionX > 0) {
        positionX -= step;
    } else if (directionX === -1 && positionX <= 0) {
        directionX = 0;
        directionY = -1;
    } else if (directionY === -1 && positionY > 0) {
        positionY -= step;
    } else if (directionY === -1 && positionY <= 0) {
        directionX = 1;
        directionY = 0;
    }

    childBlock.style.left = `${positionX}px`;
    childBlock.style.top = `${positionY}px`;
    requestAnimationFrame(() => moveSquare(positionX, positionY, directionX, directionY));
};

moveSquare(0, 0, 1, 0);

//Homework 2 part2
const secondsDisplay = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

let seconds = 0;
let intervalId;
let intervalTime = 1000;
let doubleClick = false; 

const updateDisplay = () => {
    secondsDisplay.textContent = seconds;
};

const startTimer = () => {
    intervalId = setInterval(() => {
        seconds++;
        updateDisplay();
    }, intervalTime);
    startButton.disabled = true;
};

const stopTimer = () => {
    clearInterval(intervalId);
    startButton.disabled = false;
};

const resetTimer = () => {
    stopTimer();
    if (!doubleClick) {
        seconds = 0;
    }
    doubleClick = false;
    updateDisplay();
    intervalTime = 1000;
};

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);


startButton.addEventListener('dblclick', () => {
    doubleClick = true;
    resetTimer();
    startTimer();
    intervalTime += 500;
});



