describe("test checkMatch", function () {
    beforeEach(() => score = 0);
    it("should add to score if correct answer is selected and displays 'correct' in html", function () {
        const ans = "$0.05";
        const quest = {
            "question": "How much does a US One Dollar Bill cost to make?",
            "incorrect": [
                "$0.25",
                "$1",
                "$5"
            ],
            "correct": "$0.05"
        };
        checkAnswer(ans, quest);
        expect(document.getElementById("info").innerText).toEqual("Correct! $0.05");
        expect(score).toEqual(1);
    });

    it("should not add to score if incorrect answer is selected and displays 'incorrect' in html", function () {
        const ans = "$0.25";
        const quest = {
            "question": "How much does a US One Dollar Bill cost to make?",
            "incorrect": [
                "$0.25",
                "$1",
                "$5"
            ],
            "correct": "$0.05"
        };
        checkAnswer(ans, quest);
        expect(document.getElementById("info").innerText).toEqual("Incorrect. Correct answer: $0.05");
        expect(score).toEqual(0);
    });
});

describe("test shuffle", function () {
    it("should shuffle an array", function () {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        shuffle(array);
        expect(...array).not.toEqual(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    });

    it("should not have duplicate values in shuffled array", function () {
        const array = [1, 2, 3, 4, 5, 6];
        shuffle(array);
        let set = new Set(array);
        expect(array.length).toEqual(set.size);
    });
});

describe("test high score", function () {
    beforeEach(() => localStorage.setItem("highScore", 0));
    it("should set high score if undefined in local storage", function () {
        score = 3;
        checkHighScore();
        expect(localStorage.highScore).toEqual('3');
    });
    it("should set new high score in local storage if new score is higher", function () {
        localStorage.setItem("highScore", 5);
        score = 6;
        checkHighScore();
        expect(localStorage.highScore).toEqual('6');
    });
    it("should not set new high score in local storage if new score is lower", function () {
        localStorage.setItem("highScore", 5);
        score = 4;
        checkHighScore();
        expect(localStorage.highScore).toEqual('5');
    });
});

