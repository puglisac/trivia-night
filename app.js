// global doument elements
const choicesForm = document.getElementById("choices");
const infoDiv = document.getElementById("info");
const scoreDiv = document.getElementById("score");
const gameDiv = document.getElementById("game");
const timerDiv = document.getElementById("timer");
// set global variables
const shuffled = shuffle(data);
const questions = shuffled.slice(0, 10);
let questCount = 0;
let score = 0;
const answers = [];
let countDown;

// add event listener and handle click to start button
document.getElementById("start").addEventListener("click", () => {
    // empty infoDive
    infoDiv.innerHTML = "";
    // reveal the gameDiv and timerDiv
    gameDiv.classList.remove("d-none");
    timerDiv.classList.remove("d-none");
    // show the first question
    showQuestion();
});

// add event listener to submit button and handle submit of answers
choicesForm.addEventListener("submit", function handleSumbit(e) {
    e.preventDefault();
    // check if answer is correct
    checkAnswer(document.querySelector('input[name="choice"]:checked').value, questions[questCount]);
    // add 1 to the questCount and show next question. If no more questions end the game
    questCount++;
    if (questCount === 10) return endGame();
    showQuestion();
});

// function do show questions and multiple choices
function showQuestion() {
    clearInterval(countDown);
    choicesForm.innerHTML = "";
    const choicesDiv = document.createElement('div');
    const questDiv = document.getElementById("questions");
    const currQuest = questions[questCount];
    // add multiple choices to the html form
    choicesDiv.innerHTML = createChoices([...currQuest.incorrect, currQuest.correct]);
    choicesForm.prepend(choicesDiv);
    questDiv.innerHTML = currQuest.question;
    startTimer();
}

// Checks the submitted answer against the correct answer.
function checkAnswer(answer, q) {
    // if correct add 1 to the score and push the question and answer to the answers array
    if (answer == q.correct) {
        score++;
        infoDiv.innerHTML = `<p class="alert alert-success">Correct! ${q.correct}</p>`;
        scoreDiv.innerText = `Score: ${score}`;
        answers.push({
            correct: true,
            question: q.question,
            answer: q.correct
        });
    } else {
        // if incorrect push the question and  orrect answer to the answers array
        infoDiv.innerHTML = `<p class="alert alert-danger">Incorrect. Correct answer: ${q.correct}</p>`;
        answers.push({
            correct: false,
            question: q.question,
            answer: q.correct
        });
    }
}

// countdown timer
function startTimer(sec = 30) {
    countDown = setInterval(() => {
        sec -= 1;
        if (sec === 0) {
            // go to next question if timer runs out and record wrong answer
            clearInterval(countDown);
            checkAnswer("", questions[questCount]);
            questCount++;
            // end game if 10 questions have been seen
            if (questCount === 10) return endGame();
            showQuestion();
        } else {
            // show timer in html
            showTimer(sec);
        }
    }, 1000);
}

// set inner text of timerDiv to time left
function showTimer(sec) {
    timerDiv.innerText = `Time left: ${sec}`;
}

// ends the game
function endGame() {
    gameDiv.classList.add("d-none");
    timerDiv.classList.add("d-none");
    infoDiv.innerHTML = "";
    checkHighScore();
    showResults();
    addResetButton();
}

// returns the html to display the multiple choices
function createChoices(arr) {
    // shuffle the choices
    const shuffled = shuffle(arr);
    return (`
                <input type="radio" id="choice1" name="choice" value="${shuffled[0]}" required/>
                <label for="choice1">${shuffled[0]}</label><br>
                <input type="radio" id="choice2" name="choice" value="${shuffled[1]}" required/>
                <label for="choice2">${shuffled[1]}</label><br>
                <input type="radio" id="choice3" name="choice" value="${shuffled[2]}" required/>
                <label for="choice3">${shuffled[2]}</label><br>
                <input type="radio" id="choice4" name="choice" value="${shuffled[3]}" required/>
                <label for="choice4">${shuffled[3]}</label><br>
                <button class="btn btn-primary" type="submit">Submit</button>
           `);
};

// display the end results 
function showResults() {
    const ol = document.createElement("ol");
    ol.classList.add("list-group");
    for (el of answers) {
        const li = document.createElement("li");
        li.innerText = `${el.question} Correct answer: ${el.answer}`;
        if (el.correct) {
            li.classList.add("bg-success", "list-group-item");
        } else {
            li.classList.add("bg-danger", "list-group-item");
        }
        ol.appendChild(li);
        infoDiv.appendChild(ol);
    }
}

// adds a reset button to refresh the page and play again
function addResetButton() {
    const resetButton = document.createElement('button');
    resetButton.innerText = "Reset";
    resetButton.classList.add("btn", "btn-primary", "mt-4");
    infoDiv.appendChild(resetButton);
    resetButton.addEventListener("click", () => {
        location.reload();
    });
}

// check the current score agains the high score set in the local storage and display it
function checkHighScore() {
    if (!localStorage.highScore || localStorage.highScore < score) {
        localStorage.setItem("highScore", score);
    }
    const highScore = document.createElement('span');
    highScore.classList.add("float-right", "display-4");
    highScore.innerText = `High Score: ${localStorage.highScore}`;
    document.getElementById("header").appendChild(highScore);
}

//  takes an array and suffles it, returning the shuffled array
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}