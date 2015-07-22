var questions = [{ option : "single", questionText:" Which of the following concepts provides facility of using object of one class inside another class?" , 
								answers:["Encapsulation." , "Abstraction." , "Composition." , "Inheritance." , "Polymorphism."], 
							    points: [0,0,10,0,0]},
					 { option : "multiple" , questionText:" Which of the following is correct about function overloading?" , 
							  	answers:["The types of arguments are different." , "The order of argument is different." , "The number of argument is same." , "The returned type is different." , "The name of the method is different."],
							  	points: [5,5,-2,-2,-2]},
					 { option: "single" , questionText:" Which of the following concepts means wrapping up of data and functions together?" ,
							  	answers: ["Abstraction." , "Encapsulation." , "Inheritance." , "Polymorphism." , "Composition."],
							  	points: [0,10,0,0,0]},
					 { option: "single" , questionText:" Which one of these lists contains only Java programming language keywords?" ,
							    answers:["class, if, void, long, Int, continue" , "goto, instanceof, native, finally, default, throws" , "try, virtual, throw, final, volatile, transient" , "strictfp, constant, super, implements, do" , "class, super, continue, volatile, atoi."], 
								points: [0,10,0,0,0]},
					 { option: "single" , questionText:" What really happens when a message is sent to an object?" , 
							  	answers:["A method is called on that object." , "A member variable is set for that object." , "A text string is assigned to the object." , "A value is assigned to the object." ,  "All of the above."],
							  	points: [10,0,0,0,0]},
					 { option: "single" , questionText:" Multiple inheritance means" , 
							  	answers:["One class inheriting from more super classes." , "More classes inheriting from one super class." , "More classes inheriting from more super classes." , "None of the above." , "(a) and (b) above."], 
							    points: [10,0,0,0,0]},
					 { option: "single" , questionText:" In java, objects are passed as: " , 
							  	answers:["Copy of that object." , "Method called call by value." , "Memory address." , "Constructor." , "Default constructor."],
							  	points: [0,0,10,0,0]},
					 { option: "multiple" , questionText:" A constructor " , 
								answers:["Must have the same name as the class it is declared within." , " Is used to create objects." , "May be declared private." , "It doesn`t have return type." , "It can not be abstract, static, final or synchronized."],
								points: [2,2,2,2,2]},
					 { option: "single" , questionText:" Which of the following statements is true?" , 
							  	answers:["The keyword extends is used to specify that an interface inherits from another interface." , "The keyword extends is used to specify that a class inherits from an interface." , "The keyword implements is used to specify that an interface inherits from another interface." , "The keyword implements is used to specify that a class inherits from another class." , "None of the above."],
							  	points: [10,0,0,0,0]},
					 { option: "multiple" , questionText:" Which of the following is/are valid comment(s) in java?" , 
							  	answers:["/** comment */" , "/* comment */" , "/* comment" , "// comment" , "--comment"],
							  	points: [3.34,3.33,-1,3.33,-1]} 
				    ];
var currQIndex = 0; //tracks question number
var numberOfAnswers = 5;
var numberOfQuestions = questions.length;
var totalPoints = 0.00;
var answerRecord = new Array(questions.length);//user choises
var quiz = $('#quiz'); //Quiz div object
var count = 900;
var counter = setInterval(displayTime, 1000); //1000 will  run it every 1 second

function init()
{
	for(var i = 0 ; i < questions.length ; i++)
	   	answerRecord[i] = new Array(numberOfAnswers);

	for(var i = 0 ; i < questions.length ; i++)
	   	for(var j = 0; j < numberOfAnswers ; j++)
			answerRecord[i][j] = false;

	$('#start-over').hide();
	$('#image2').hide();
	$('#image1').hide();
}

function displayTime()
{
	count = count - 1;
	if (count == -1) 
	{
		clearInterval(counter);
		return;
	}

	var seconds = count % 60;
	var minutes = Math.floor(count / 60);

	minutes %= 60;
	$("#timer-placeholder").html(minutes + " : " + seconds + "  left") ; 

	if(count < 30)
		blinkingTimer();

	if(count == 0)
		displayScore();
}

function blinkingTimer()
{
	$('div#timer-placeholder').addClass("blinking-timer");
}

function createQuestionElement(index) 
{
	currQIndex = index;
	var questionElement = $('<div>').attr("id", "question");
	var header = $('<h3>Question ' + (index + 1) + '</h3>');
	questionElement.append(header);

	var question = $('<p>').append(questions[currQIndex].questionText);
	questionElement.append(question);

	if(questions[currQIndex].option == "single")
	{	    		
		var radioButtons = createRadios(index);
		questionElement.append(radioButtons);
	}
	else
	{
	    var checkBoxes = createCheckboxes(index);
		questionElement.append(checkBoxes);
    }
	return questionElement;
}

// Creates a list of the answer choices as radio inputs
function createRadios(index) 
{
	var radioList = $('<ul>');
	var item;
	var input = '';
	var label = '';
	
	for (var i = 0; i < questions[currQIndex].answers.length; i++) 
	{
	    item = $('<li>');
	    input = '<input type = "radio" name = "answer" id = "radiobutton'+ i + '"></input>'; 
	    label = '<label id = answer-label>'+ questions[currQIndex].answers[i] + '</label>';
	    input += label;
	    item.append(input);
	    radioList.append(item);
	}
	return radioList;
}

// Creates a list of the answer choices as checkbox inputs
function createCheckboxes(index) 
{
	var checkboxList = $('<ul>');
	var item;
	var input = '';
	var label = '';

	for (var i = 0; i < questions[currQIndex].answers.length; i++) 
	{
	    item = $('<li>');
	    input = '<input type = "checkbox" name = "answer" id = "check'+ i +'"></input>'; 
	    label = '<label id = answer-label>'+ questions[currQIndex].answers[i] + '</label>';
	    input += label;
	    item.append(input);
	    checkboxList.append(item);
	}
	return checkboxList;
}

function displayQuestion(input)
{
	quiz.fadeOut(function()
	{
		$('#question').remove();
		if(input < questions.length)
		{
			var nextOuestion = createQuestionElement(input);
			quiz.append(nextOuestion).fadeIn();
			toPreviousQuestion();
			viewAnswers(input);
		}
		else 
			displayScore();
	})	
}

//Click handler for the 'next' button
$('#next-button').on('click', function (e)
{
	e.preventDefault();
	getUserChoise();	
	currQIndex++;
	displayQuestion(currQIndex);

	if( currQIndex < numberOfAnswers)
		viewAnswers();

	if(currQIndex == questions.length) 
		alert("Urmeaza intrebarea finala!");
});

//Click handler for the 'previous' button
$('#prev-button').on('click', function (e)
{
	e.preventDefault();
	currQIndex--;
	toPreviousQuestion();
	displayQuestion(currQIndex);	
});

//Click handler for the 'start over' button
$('#start-over').on('click', function (e)
{
	e.preventDefault();
	$(location).prop('href', '../index.html');	
});

//Click handler for the 'submit' button
$('#submit').on('click', function (e)
{
	e.preventDefault();
	displayScore();	
});

// Animates buttons on hover
$('.button').on('mouseenter', function () 
{
    $(this).addClass('active');
});

$('.button').on('mouseleave', function () 
{
    $(this).removeClass('active');
});

function toPreviousQuestion()
{
	if(currQIndex < questions.length)	
      	if(currQIndex >= 1)
      	{
      		$('#prev-button').show();
      		$('#next-button').show();
      	}
      	else 
      		if(currQIndex == 0)
	      	{
	      		$('#prev-button').hide();
	      		$('#next-button').show();
	      	}
} 

function getUserChoise()
{
	for(var i = 0 ; i < numberOfAnswers ; i++)
	{
		if(questions[currQIndex].option == "multiple")
			answerRecord[currQIndex][i] = $("#check"+ i ).is(":checked");
		else 	
			answerRecord[currQIndex][i] = $("#radiobutton"+ i ).is(":checked"); 
	}
}

/* recheck the option*/
function viewAnswers()
{
	for(var i = 0 ; i < numberOfAnswers ; i++)
		if(answerRecord[currQIndex][i] == true)
		{
			if(questions[currQIndex].option == "multiple")
				$("#check"+ i ).prop('checked', true);       
			else
				$("#radiobutton"+ i ).prop('checked', true); 
		}
} 

function computeTotalPoints()
{
	for (var i = 0 ; i < numberOfQuestions ; i++) 
		for (var j = 0 ; j < numberOfAnswers ; j++) 
		{
			if(questions[i].option == "single")
			{
				if (answerRecord[i][j]) totalPoints += parseFloat(questions[i].points[j]);
			}
			else
				if(answerRecord[i][j] ) totalPoints += parseFloat(questions[i].points[j]); 
		}
}

function displayScore()
{
	computeTotalPoints();
	$('#question').remove();

	var score = $('<p>',{id: 'question'});
	var header = $('<h2><center>You got '+ totalPoints + ' points out of 100 </center></h2>');

    score.append(header);
    quiz.append(score).fadeIn();

    $('#prev-button').hide();
	$('#next-button').hide();
	$('#submit').hide();
	$('#timer-placeholder').hide();
	$('.img').hide();
	$('#start-over').show();

	if(totalPoints > 85) 
		$('#image').show();

	if(totalPoints < 30)	
		$('#image1').show();
	
	count = 0;
    return score;
}

$(document).ready(function()
{
	displayQuestion(currQIndex);
	displayTime();
	init();
});