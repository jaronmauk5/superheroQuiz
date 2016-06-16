$(document).ready(function(){
	$(".start-button").click(function(){
		$(".intro-page").hide();
		$(".question-form").show()
		switchQuestion();
	});


	var questions = [
		{
			title: 'What actor plays Spiderman?',
			answers: [
				'Tobey Maguire',
				'Andrew Garfield',
				'Tom Holland',
				'All of the above'
			],
			correctAnswer: 3
		},
		
		{
			title: 'Who makes a cameo appearence in every Marvel movie?',
			answers: [
				'Robert Downey Jr.',
				'Stan Lee',
				'Jon Favreau',
				'Thanos'
			],
			correctAnswer: 1
		},

		{
			title: 'What is the highest grossing marvel movie to date?',
			answers: [
				'The Avengers',
				'Iron Man 3',
				'Deadpool',
				'Captain America: Civil War'
			],
			correctAnswer: 0
		},
	
		{
			title: 'In Iron Man 3, what is the latest suit model Tony Stark has made called?',
			answers: [
				'Mark 15',
				'Heartbreaker',
				'Mark 42',
				'Hulkbuster'
			],
			correctAnswer: 2
		},

		{
			title: 'What element is Captain Americas shield made of?',
			answers: [
				'Iron',
				'Steel',
				'Americium',
				'Vibranium'
			],
			correctAnswer: 3
		},
	];

	var currentQuestion = 0;
	var template = $('#question-template').html();

	var totalScore = 0;
	var totalQuestions = questions.length;


	function switchQuestion() {

		if(currentQuestion == totalQuestions) {
			showResults();
			return;
		}


		var question = questions [currentQuestion];
		var $template = $(template);
		$template.find('.title').text(question.title);
		var $answers = $template.find('.answers');
		question.answers.forEach(function(answer, index){
			var $answer = $('<label><input type="radio" name="question" value="' + index + '" required />' + answer + '</label>');
			$answers.append($answer);
		});

		$('.question-form').html($template);
	}


	$('.question-form').on('submit', function(event){
		event.preventDefault();
		var $form = $(this);
		var answer = $form.find(':input:checked').val();
		if (questions[currentQuestion].correctAnswer == answer) {
		 totalScore++;
		 showFeedback('Correct!', 'Good Job!'); 	
		}
		else {
			var correctAnswer = questions[currentQuestion].answers[
				questions[currentQuestion].correctAnswer
			]

			showFeedback('Sorry!', 'The correct answer was ' + correctAnswer);
		}
		console.log('totalScore', totalScore + ' out of ' + totalQuestions);
	 	console.log('currentQuestion', currentQuestion);

	 	
	});


	var showResults = function() {
		totalScore + totalQuestions;
		$('.question-form').html("").hide();
		$('.results-overlay').show();
		$('.results-overlay').find('.results').text('You got ' + totalScore + ' out of ' + totalQuestions);
	}; 
 
	var showFeedback = function(status, feedback) {
		$('.answer-overlay').show();

		$('.answer-overlay').find('.status').text(status);
		$('.answer-overlay').find('.feedback').text(feedback);

	}

	$('.answer-overlay').on('click','.continue', function(){
		$('.answer-overlay').hide();
		currentQuestion++;
		switchQuestion();
	});

	$('.results-overlay').on('click','.continue', function(){
		$('.results-overlay').hide();
		$(".intro-page").show();
		currentQuestion = 0;
		totalScore = 0;
	})


}); 