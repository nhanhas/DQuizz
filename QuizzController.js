/* On Start App */
jQuery(document).ready(function($){
	updateQuizzDateTime();
	generateQuestions();//generate questions to app
	resetApp();//reset defaults
	
});


function startKeyboard() {
    $(document).ready(function(){
	  $('input#name').mlKeyboard({layout: 'en_US', is_hidden: false});
	});

	$(document).ready(function(){
	  $('input#email').mlKeyboard({layout: 'en_US' , is_hidden: false});
	});

	$( "input#name" ).focus(function() {
  		$( ".classKeyBoard:eq( 0 )" ).css('display', 'block');
  		$( ".classKeyBoard:eq( 1 )" ).css('display', 'none');
	});

	$( "input#email" ).focus(function() {
  		$( ".classKeyBoard:eq( 0 )" ).css('display', 'none');
  		$( ".classKeyBoard:eq( 1 )" ).css('display', 'block');
	});

	$( "input#name" ).focus();

}

//function to reset application
function resetApp(){
	$('#home').css('display','block');
	$('#app').css('display','none');
	/**/$('#view-a').css('display','block');
	/**/$('#view-b').css('display','none');
	/**/$('#view-0').css('display','none');
	/**/$('#view-1').css('display','none');
	/**/$('#view-2').css('display','none');
	/**/$('#view-3').css('display','none');
	/**/$('#view-4').css('display','none');
	/**/$('#view-5').css('display','none');
	/**/$('#view-6').css('display','none');
	/**/$('#view-7').css('display','none');
	/**/$('#view-8').css('display','none');
	/**/$('#view-9').css('display','none');
	/**/$('#view-10').css('display','none');
	/**/$('#view-attendee').css('display','none');
}

//function to update quizz date and hour
function updateQuizzDateTime(){
	var date = new Date();

	var monthNames = [
	"Jan", "Fev", "Mar",
	"Abr", "Maio", "Jun", "Jul",
	"Ago", "Set", "Out",
	"Nov", "Dez"  ];

	//day, month year
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	//day of week
	var options = { weekday: 'long'};
	var weekDay = date.toLocaleDateString('pt-PT', options)


	var dateString = weekDay + '. ' + day + ' ' + monthNames[monthIndex] + ' ' + year;

	var time = new Date();
	var timeOptions = { hour: '2-digit', minute: '2-digit' };
	var timeString = time.toLocaleTimeString('pt-PT', timeOptions);


	//now update our display footer
	jQuery('#quizz-date').html(dateString);
	jQuery('#quizz-hour').html(timeString);

}


/* Home Controlling... */
//#1 - on clicking home screen
function homeTouch(){

	//switch views
	$('#home').css('display','none');
	$('#app').css('display','block');

}

//#2 - Click "Avançar" in view 0 (Intro)
function viewAClick(){
	$('#view-a').css('display','none');
	$('#view-b').css('display','block');
	$('#view-0').css('display','none');
	$('#view-1').css('display','none');
	$('#view-2').css('display','none');
	$('#view-3').css('display','none');
	$('#view-4').css('display','none');
	$('#view-5').css('display','none');
	$('#view-6').css('display','none');

}

//#2 - Click "Iniciar Quiz" in view 1 (Hints)
function viewBClick(){
	$('#view-a').css('display','none');
	$('#view-b').css('display','none');
	$('#view-0').css('display','block');
	$('#view-1').css('display','none');
	$('#view-2').css('display','none');
	$('#view-3').css('display','none');
	$('#view-4').css('display','none');
	$('#view-5').css('display','none');
	$('#view-6').css('display','none');
}

//#3 - Click on question number
function viewClicked(questionNumber, isLastQuestion){
	if(!isLastQuestion){
		$('#view-' + questionNumber).css('display','none');
		$('#view-' + (questionNumber + 1)).css('display','block');	
	}else{
		//show name email form
		startKeyboard();
		$('#view-' + questionNumber).css('display','none');
		$('#view-attendee').css('display','block');
	}
	
	
}


//#4 - Generate questions html
function generateQuestions(){
	//#1 - Get questions from DB
	var questionsList = DB_getQuestions();

	//#2 - add question pages
	for(var index = 0; index < questionsList.length; index++){
		var isLastQuestion = (index === (questionsList.length - 1));
		var questionTemplate = generateQuestionTemplate(questionsList[index], isLastQuestion);
		
		//add question title to generic Form
		var e = document.getElementById('questions');
    	e.innerHTML += questionTemplate;

    	//#3 - add options to questions
    	var optionsTemplate = generateOptionsTemplate(questionsList[index], questionsList[index].options);
    	var questionElement = document.getElementById('Options-' + questionsList[index].id);
    	questionElement.innerHTML = optionsTemplate;

	}



}

//#4.1 - (AUX) Generate questions template
function generateQuestionTemplate(question, isLastQuestion){
	var template = '\
		<div id="view-'+question.id+'">\
			<!-- generic page title -->\
			<hr class="hr-green">\
			<div class="q-number font-regular font-200 text-green">'+ ((question.id+1) <= 9? ("0"+(question.id+1)) : (question.id+1) )+'</div>\
			<div class="q-text  text-green"> \
				<h3 class="font-regular font-lg q-text">'+ question.ask +'</h3>\
				<span class="font-bold font-22 text-white">ESCOLHA UMA DAS SEGUINTES OPÇÕES:</span>\
			</div>\
			<br>\
			<hr class="hr-green">\
			\
			<div id="Options-'+question.id+'">\
			</div> \
			\
			<!-- footer -->\
			<div class="footer">\
				<div class="row">\
					<div class="col-xs-2 col-xs-offset-5 text-center btn-green" onclick="viewClicked('+question.id+', '+isLastQuestion+')">\
						<h4 class="font-bold font-xs text-white">PRÓXIMA</h4>\
					</div>\
				</div>\
			</div>\
		</div> \
		';
	return template;

}

//#4.2 - (AUX) Generate questions template
function generateOptionsTemplate(question, options){
	var template = '\
			<!-- Questions -->\
			<!-- 1 2 -->\
			<div class="row text-white">\
				<div class="col-xs-6">\
					<p>\
						<input type="radio" id="'+options[0].optId+'" name="radio-group">\
						<label class="font-bold font-36" for="'+options[0].optId+'">'+options[0].description+'</label>\
					</p>\
				</div>\
				<div class="col-xs-6">\
					<p>\
						<input type="radio" id="'+options[1].optId+'" name="radio-group">\
						<label class="font-bold font-36" for="'+options[1].optId+'">'+options[1].description+'</label>\
					</p>\
				</div>\
			</div>\
			\
			<!-- 3 4 -->\
			<div class="row text-white">\
				<div class="col-xs-6 text-white">\
				<p>\
					<input type="radio" id="'+options[2].optId+'" name="radio-group">\
					<label class="font-bold font-36" for="'+options[2].optId+'">'+options[2].description+'</label>\
				</p>\
				</div>\
				<div class="col-xs-6">\
				<p>\
					<input type="radio" id="'+options[3].optId+'" name="radio-group">\
					<label class="font-bold font-36" for="'+options[3].optId+'">'+options[3].description+'</label>\
				</p>\
				</div>\
			</div>';

	return template;

}

/* TODO - APP DATABASE */

//#A - Get Questions from DB
function DB_getQuestions(){
	var questionsList = [
		{ id : 0,
		  ask : "Esta é a pergunta número 1", 
		  solution : 2, 
		  options : [	{optId : "Q0-1", description: "opção 1 da pergunta 1 opção 1 da pergunta 1"},
		  				{optId : "Q0-2", description: "opção 2 da pergunta 1"},
		  				{optId : "Q0-3", description: "opção 3 da pergunta 1"},
		  				{optId : "Q0-4", description: "opção 4 da pergunta 1"}		] 
		},
		{ id : 1,
		  ask : "Esta é a pergunta número 2", 
		  solution : 1, 
		  options : [	{optId : "Q1-1", description: "opção 1 da pergunta 2"},
		  				{optId : "Q1-2", description: "opção 2 da pergunta 2"},
		  				{optId : "Q1-3", description: "opção 3 da pergunta 2"},
		  				{optId : "Q1-4", description: "opção 4 da pergunta 2"}		] 
		},
		{ id : 2,
		  ask : "Esta é a pergunta número 3", 
		  solution : 3, 
		  options : [	{optId : "Q2-1", description: "opção 1 da pergunta 3"},
		  				{optId : "Q2-2", description: "opção 2 da pergunta 3"},
		  				{optId : "Q2-3", description: "opção 3 da pergunta 3"},
		  				{optId : "Q2-4", description: "opção 4 da pergunta 3"}		] 
		},
		{ id : 3,
		  ask : "Esta é a pergunta número 4", 
		  solution : 4, 
		  options : [	{optId : "Q3-1", description: "opção 1 da pergunta 4"},
		  				{optId : "Q3-2", description: "opção 2 da pergunta 4"},
		  				{optId : "Q3-3", description: "opção 3 da pergunta 4"},
		  				{optId : "Q3-4", description: "opção 4 da pergunta 4"}		] 
		}

	];

	return questionsList;
}