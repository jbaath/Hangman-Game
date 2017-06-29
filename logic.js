//GLOBAL VARIABLES
//=====================================================================
//Arrays and Variables for holding data
var wordOptions = ["danny", "joseph", "adam", "charlie", "hamzeh", "damien"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

//Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 0;


//FUNCTIONS (Reusable blocks of code that I will call upon when needed)
//=====================================================================

function startGame(){
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersinWord = selectedWord.split("");
	numBlanks = lettersinWord.length;

	//Reset
	guessesLeft = 9;
	wrongLetters = [];
	blanksAndSuccesses = [];

	//Fill blanks and successes with correct number of blanks
	for (var i=0; i<numBlanks; i++) {
		blanksAndSuccesses.push("_");
	}

	//Change HTML to show rounds
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;


	//Testing
	console.log(selectedWord);
	console.log(lettersinWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function checkLetters(letter){
	//Check if letter exists

	var isLetterInWord = false;

	for (var i=0; i<numBlanks; i++){
		if(selectedWord[i] == letter){
			isLetterInWord = true;
		}
	}
	//Check where letter exists, then fill blank
	if(isLetterInWord) {
		for (var i=0; i<numBlanks; i++) {
			if(selectedWord[i] == letter) {
				blanksAndSuccesses[i] = letter;
		}
	}

}

	//Letter not found
	else{
		wrongLetters.push(letter);
		guessesLeft--
	}

	//Testing
	console.log(blanksAndSuccesses);

}

function roundComplete(){
	console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left" + guessesLeft);

	//Update HTML to count stats
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

	//Check if user won
	if(lettersinWord.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("You Win!");

		document.getElementById("winCounter").innerHTML = winCount;

		startGame();
	}

	//Check if user lost
	else if (guessesLeft == 0){
		lossCount++;
		alert("You lost!");

		document.getElementById("lossCounter").innerHTML = lossCount;

		startGame();
	}

}


//MAIN PROCESS
//=====================================================================

//Starts the code
startGame();

//Register clicks

document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();

	//Test
	console.log(letterGuessed);
}