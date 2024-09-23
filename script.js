let randomNumber;
let attempts = 0;
let highScore = Infinity;

function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('result').innerText = '';
    document.getElementById('resetButton').classList.add('hidden');
    document.getElementById('guessInput').value = '';
    document.getElementById('guessButton').disabled = false; // Enable button
}

document.getElementById('guessButton').addEventListener('click', function() {
    const guessInput = document.getElementById('guessInput').value;
    const guess = Number(guessInput);
    attempts++;

    const resultElement = document.getElementById('result');
    const guessButton = document.getElementById('guessButton');

    // Input validation
    if (guess < 1 || guess > 100) {
        resultElement.innerText = 'Please enter a number between 1 and 100.';
        resultElement.classList.add('error');
        return;
    } else {
        resultElement.classList.remove('error');
    }

    if (guess === randomNumber) {
        resultElement.innerText = `Congratulations! You've guessed the number in ${attempts} attempts.`;
        document.getElementById('resetButton').classList.remove('hidden');
        guessButton.disabled = true; // Disable button after winning

        // Update high score
        if (attempts < highScore) {
            highScore = attempts;
            document.getElementById('highScoreValue').innerText = attempts;
        }
    } else {
        resultElement.innerText = guess < randomNumber ? 'Too low! Try again.' : 'Too high! Try again.';
        resultElement.style.color = 'red'; // Change text color to red
        guessButton.classList.add('incorrect');

        // Reset text color after 1 second
        setTimeout(() => {
            resultElement.style.color = 'white';
        }, 1000);

        setTimeout(() => {
            guessButton.classList.remove('incorrect');
        }, 500); // Reset button color after half a second
    }
});

document.getElementById('resetButton').addEventListener('click', startGame);

// Start the game when the page loads
startGame();
