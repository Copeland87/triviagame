var triviaQuestions = [{
	question: "Torchwood is an anagram and spin-off of what popular British sci-fi series?",
	answerList: ["Space: 1999", "Black Mirror", "Doctor Who", "Red Dwarf"],
	answer: 2
},{
	question: "Star Trek: The Next Generation originally aired in what year?",
	answerList: ["1983", "1986", "1989", "1987"],
	answer: 3
},{
	question: "What is the unit of length that is approximately 3.26 light-years?",
	answerList: ["Mickey", "Wiffle", "Parsec", "Sheppy"],
	answer: 2
},{
	question: "Each of a classic Rubik's Cube six faces is covered by how many stickers?",
	answerList: ["Nine", "Twelve", "Fourteen", "Twenty"],
	answer: 0
},{
	question: "Bruce Willis played a convict turned time traveler in what 1995 movie?",
	answerList: ["Looper", "Primer", "12 Monkeys", "Timecrimes"],
	answer: 2
},{
	question: "1,024 Gigabytes is equal to one what?",
	answerList: ["Petabyte", "Megabyte", "Kilobyte", "Terabyte"],
	answer: 3
},{
	question: "The largest volcano ever discovered in our solar system is located on which planet?",
	answerList: ["Earth", "Mars", "Jupiter", "Venus"],
	answer: 1
},{
	question: "What is the most abundant element in the earth's atmosphere?",
	answerList: ["Hydrogen", "Oxygen", "Carbon", "Nitrogen"],
	answer: 3
},{
	question: "What was the name of the first electronic general-purpose computer?",
	answerList: ["ENIAC", "EDSAC", "TETRA", "EDVAC"],
	answer: 0
},{
	question: "What does HTTP stand for in a website address?",
	answerList: ["HTTP", "Hewlett Packard Transfer Protocol", "HyperTransfer Text Protocol", "HyperText Transfer Protocol"],
	answer: 3
},{
	question: "What was Luke Skywalker's call sign during the rebel assult in Episode IV?",
	answerList: ["Red 5", "Red Leader", "Green Leader", "Red 3"],
	answer: 0
},{
	question: "What is the name of Chewbacca's home planet?",
	answerList: ["Alderaan", "Mustafar", "Kashyyyk", "Hoth"],
	answer: 2
},{
	question: "Who directed StarWars Episode V?",
	answerList: ["Ridley Scott", "Irvin Kershner", "Andrew Davis", "Wolfgang Petersen"],
	answer: 1
},{
	question: "How many languages does C-3PO speak?",
	answerList: ["More than 3 million", "More than 4 million", "More than 5 million", "More than 6 million"],
	answer: 3
},{
	question: "Who shot first?!",
	answerList: ["Not Han Solo", "Han Solo", "Not Han Solo", "Not Han Solo"],
	answer: 1
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "You got it!",
	incorrect: "Not nerdy enough :(",
	endTime: "Must go faster!",
	finished: "I can't watch..."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//new question
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//select answer to pause timer
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to count down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //clear
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//check status of question
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}