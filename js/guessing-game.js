function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function shuffle (arr) {
  let m = arr.length, temp, i;
  // while there are still elements to shuffle
  while (m) {
    i = Math.floor(Math.random() * m--);

    // swap with current element
    // temp becomes last num in arr
    temp = arr[m];
    // arr[m] becomes random num
    arr[m] = arr[i];
    // random num becomes temp
    arr[i] = temp;
  }
  return arr
}

class Game {
  constructor(playersGuess, pastGuesses, winningNumber) {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber)
  }
  isLower() {
    return this.playersGuess < this.winningNumber;
  }
  playersGuessSubmission(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
      throw 'That is an invalid guess.'
    } else {
      let num = parseInt(guess)
      this.playersGuess = num;
      return this.checkGuess();
    }
  }
  checkGuess() {
    let feedback = '';

    if (this.playersGuess === this.winningNumber) {
      // TODO: when the winning number is found, it replaces the previous position in the UI box
      feedback = `You Win! The number was ${this.winningNumber} 🥳`;
    }
    else if (this.pastGuesses.includes(this.playersGuess)) {
      // document.getElementById('input').style.borderColor = '#A02E3E';
      feedback = 'You have already guessed that number.'
    }
    else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length >= 5) {
        feedback = `You Lose. The number was ${this.winningNumber} 😢`;
      }
      else {
        if (this.difference() < 10) {
          if (this.isLower()) {
            feedback = "Guess Higher! You're burning up! 🔥";
          } else {
            feedback = "Guess Lower! You're burning up! 🔥";
          }
        }
        else if (this.difference() < 25) {
          if (this.isLower()) {
            feedback = "Guess Higher! You're lukewarm. 🥵";
          } else {
            feedback = "Guess Lower! You're lukewarm. 🥵";
          }
        }
        else if (this.difference() < 50) {
          if (this.isLower()) {
            feedback = "Guess Higher! You're a bit chilly. 🥶";
          } else {
            feedback = "Guess Lower! You're a bit chilly. 🥶";
          }
        }
        else if (this.difference() < 100) {
          if (this.isLower()) {
            feedback = "Guess Higher! You're ice cold! 🧊";
          } else {
            feedback = "Guess Lower! You're ice cold! 🧊";
          }
        }
      }
    }
    document.querySelector('#guess-feedback > h4').innerHTML = feedback
    document.querySelector(`#previous-guesses li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess
    return feedback
  } 
  provideHint() {
    let newArr = new Array(this.winningNumber, generateWinningNumber(), generateWinningNumber())
    let hint = shuffle(newArr);
    return hint;
  }
}


const playGame = () => {
  const game = new Game;

  // TODO: function to disable submit & hint button when game is won/lost


  // TODO: function to update message based on input



  // Clear input value when submit is clicked
  const button = document.querySelector('button')
  button.addEventListener("click", function() {
    const playersGuess = document.querySelector('input').value;
    document.querySelector('input').value = '';

    game.playersGuessSubmission(playersGuess)
  });

  const hint = document.getElementById('hint-button')
  hint.addEventListener("click", function() {
    let hints = game.provideHint();
    document.getElementById('hint').innerHTML = `The winning number is either ${hints[0]}, ${hints[1]}, or ${hints[2]}`
  })



}

playGame()