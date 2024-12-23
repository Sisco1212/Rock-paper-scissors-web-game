const game = () => {
    let pScore = 0;
    let cScore = 0;
    let roundWinScore = 10;
    const match = document.querySelector('.match');
    const scoreSystem = document.querySelector('.score');


    //Start the game
    const startGame = () => {
        const playButton = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');

        playButton.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
            scoreSystem.classList.add('fadeIn');
        });
    }

    //Play match
    const playMatch = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');

        hands.forEach(hand => {
            hand.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        })

        //Computer options
        const computerOptions = ["rock", "paper", "scissors"];
        
        options.forEach(option => {
            option.addEventListener('click', function() {
            const computerNumber = Math.floor(Math.random() * 3);
            const computerChoice = computerOptions[computerNumber];
            
            setTimeout(() => {
            compareHands(this.textContent, computerChoice);
            playerHand.src = `${this.textContent}.png`;
            computerHand.src = `${computerChoice}.png`;                
            }, 2000);

            playerHand.style.animation = "shakePlayer 2s ease";
            computerHand.style.animation = "shakeComputer 2s ease";
            })
        });
    }

    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;

    }

    const roundManager = ()  => {
        const winner = document.querySelector('.winner');
        const roundWinner = document.querySelector(".roundWinner");
        const restart = document.querySelector(".restart");
        const roundWinnerText = document.querySelector(".roundWinnerText");

        if (pScore == roundWinScore) 
        {
            console.log("Player wins this round");
            cScore = 0;
            pScore = 0;
            roundWinner.classList.add("fadeIn");
            match.classList.remove("fadeIn");
            scoreSystem.classList.remove("fadeIn");
            roundWinnerText.textContent = "Player wins this round";
        }
        else if(cScore == roundWinScore)
        {
            console.log("Computer wins this round");
            cScore = 0;
            pScore = 0;
            roundWinner.classList.add("fadeIn");
            match.classList.remove("fadeIn");
            scoreSystem.classList.remove("fadeIn");
            roundWinnerText.textContent = "Computer wins this round";
        }

        restart.addEventListener('click', () => {
            match.classList.add("fadeIn");
            scoreSystem.classList.add("fadeIn");
            roundWinner.classList.remove("fadeIn");
            winner.textContent = "Choose an option";
            updateScore();
        })
    }

    const compareHands = (playerChoice, computerChoice) => {
        const winner = document.querySelector('.winner');

        //Checking for a tie
        if (playerChoice === computerChoice) {
            winner.textContent = "It's a tie";
            updateScore();
            roundManager();
            return;
        }

        //Checking for rock
        if(playerChoice === 'rock') {
            if(computerChoice === "scissors") {
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                roundManager();
                return;
            } else {
                winner.textContent = "Computer wins";
                cScore++;
                updateScore();
                roundManager();
                return;
            }
        }

        //Checking for paper
        if(playerChoice === 'paper') {
            if(computerChoice === "scissors") {
                winner.textContent = 'Computer wins';
                cScore++;
                updateScore();
                roundManager();
                return;
            } else {
                winner.textContent = "Player wins";
                pScore++;
                updateScore();
                roundManager();
                return;
            }
        }

        //Checking for scissors 
        if(playerChoice === 'scissors') {
            if(computerChoice === "rock") {
                winner.textContent = 'Computer wins';
                cScore++;
                updateScore();
                roundManager();
                return;
            } else {
                winner.textContent = "Player wins";
                pScore++;
                updateScore();
                roundManager();
                return;
            }
        }
    }

startGame();
playMatch();
}
game();