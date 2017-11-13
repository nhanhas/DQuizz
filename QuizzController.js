var TIMMER_TO_REFRESH = 5000; //5sec

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

function endKeyboard(){
	$( ".classKeyBoard" ).css('display', 'none');
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
	/**/$('#view-results').css('display','none');
	/**/$('#view-end').css('display','none');
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

function goToCredits(){
	/**/$('#view-results').css('display','none');
	/**/$('#view-end').css('display','block');

	//Start Timer to re-start
	setTimeout(function(){ 
		location.reload(); 
	}, TIMMER_TO_REFRESH);

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
	var tooBigAsk = (question.ask.length > 99);

	var template = '\
		<div id="view-'+question.id+'">\
			<!-- generic page title -->\
			<hr class="hr-green">\
			<div class="q-number font-regular font-200 text-green">'+ ((question.id+1) <= 9? ("0"+(question.id+1)) : (question.id+1) )+'</div>\
			<div class="q-text  text-green" style="height: 230px;"> \
				<h3  style="'+ (tooBigAsk ? "margin-bottom:52px" : "") +'" class="font-regular '+ (tooBigAsk ?  "font-md" : "font-lg") +'  q-text">'+ question.ask +'</h3>\
				<span class="font-bold font-22 text-white" >ESCOLHA UMA DAS SEGUINTES OPÇÕES:</span>\
			</div>\
			<hr class="hr-green">\
			\
			<div id="Options-'+question.id+'">\
			</div> \
			\
			<!-- footer -->\
			<div class="footer">\
				<div class="row">\
					<div class="col-xs-2 col-xs-offset-5 text-center" onclick="viewClicked('+question.id+', '+isLastQuestion+')">\
						<div class="btn-green" style="margin-left: 40px;"><h4 class="font-bold font-xs text-white">PRÓXIMA</h4></div>\
					</div>\
				</div>\
			</div>\
		</div> \
		';
	return template;

}

//#4.2 - (AUX) Generate questions template
function generateOptionsTemplate(question, options){

	//aux func to return custom style
	var getStyleCustom = function (optionText){
		if(optionText.length <= 39){
			return 'style="padding-top: 30px;"'
		}
		return '';
	}

	var template = '\
			<!-- Questions -->\
			<!-- 1 2 -->\
			<div class="row text-white">\
				<div class="col-xs-6">\
					<p>\
						<input type="radio" id="'+options[0].optId+'" value="'+options[0].optId+'" name="Q'+question.id+'">\
						<label '+getStyleCustom(options[0].description)+' class="font-bold font-36" for="'+options[0].optId+'">'+options[0].description+'</label>\
					</p>\
				</div>\
				<div class="col-xs-6">\
					<p>\
						<input type="radio" id="'+options[1].optId+'" value="'+options[1].optId+'" name="Q'+question.id+'">\
						<label '+getStyleCustom(options[1].description)+' class="font-bold font-36" for="'+options[1].optId+'">'+options[1].description+'</label>\
					</p>\
				</div>\
			</div>\
			\
			<!-- 3 4 -->\
			<div class="row text-white">\
				<div class="col-xs-6 text-white">\
				<p>\
					<input type="radio" id="'+options[2].optId+'" value="'+options[2].optId+'" name="Q'+question.id+'">\
					<label '+getStyleCustom(options[2].description)+' class="font-bold font-36" for="'+options[2].optId+'">'+options[2].description+'</label>\
				</p>\
				</div>\
				<div class="col-xs-6">\
				<p>\
					<input type="radio" id="'+options[3].optId+'" value="'+options[3].optId+'" name="Q'+question.id+'">\
					<label '+getStyleCustom(options[3].description)+' class="font-bold font-36" for="'+options[3].optId+'">'+options[3].description+'</label>\
				</p>\
				</div>\
			</div>';

	return template;

}


//#5 - On Submit QUIZZ
function submitQuiz(){
	endKeyboard();
	$('#view-attendee').css('display','none');
	$('#view-results').css('display','block');

	//#1 - Get all answers to array
	var answers = $('#questions').serializeArray();

	//#2 - Get DB questions and solutions
	var questions = DB_getQuestions();

	//Number of Questions, correct and wrong ones
	var numberQuestions = questions.length;
	var correctOnes = 0;
	var wrongOnes = 0;
	var answerIndex = 0;
	for(var index = 0; index < questions.length; index++){
		if(answers[answerIndex+2] && answers[answerIndex+2].name.startsWith('Q'+questions[index].id)){
			if(answers[answerIndex+2].value === questions[index].solution){
				correctOnes++;
			}else{
				wrongOnes++;
			}
			answerIndex++;
		}else{
			wrongOnes++;
		}

		


	}

	//Build circle 1 
	buildCircle(1, 100, numberQuestions);

	//Build circle 2
	buildCircle(2, (correctOnes / numberQuestions)*100, correctOnes);

	//Build circle 3
	buildCircle(3, (wrongOnes / numberQuestions)*100, wrongOnes);



	//TODO - Answers DB GOES HERE
}



//---------------------Circles Result---------------------
function buildCircle(circleId, percentage, numberToShow){
	var circle = document.getElementById('circle-' + circleId);
	var length = circle.getTotalLength();

	//show text
	var textNumber = (numberToShow <= 9 ? '0'+numberToShow : numberToShow);
	jQuery('#result-number-' + circleId).text(textNumber);

	setPercentage(circle, percentage);
}


function setPercentage(circleReference, percentage) {
	var length = circleReference.getTotalLength();
	percentage = 100 - percentage;
	var new_length = (length / 100)*percentage
	circleReference.style['stroke-dashoffset'] = new_length;
}
/*
function buildCircle(circleId){
	var circle = document.getElementById('circle-' + circleId);
	var length = circle.getTotalLength();

	var text = document.getElementById('percentage-' + circleId);
	var percentage = text.innerHTML;
	percentage = percentage.replace(' %','');
	percentage = parseInt(percentage);
	setPercentage(circle, percentage);
}


function setPercentage(circleReference, percentage) {
	var length = circleReference.getTotalLength();
	percentage = 100 - percentage;
	var new_length = (length / 100)*percentage
	circleReference.style['stroke-dashoffset'] = new_length;
}*/

//-----------------End Circles Result---------------------

/* TODO - APP DATABASE */

//#A - Get Questions from DB
function DB_getQuestions(){
	var questionsList = [
		{ id : 0,
		  ask : "A maioria dos portugueses espera que a economia nacional, no próximo ano, evolua de forma...", 
		  solution : "Q0-1", 
		  options : [	{optId : "Q0-1", description: "Positiva"},
		  				{optId : "Q0-2", description: "Negativa"},
		  				{optId : "Q0-3", description: "Neutra"},
		  				{optId : "Q0-4", description: "Não sabem"}		] 
		},
		{ id : 1,
		  ask : "Grande parte dos consumidores nacionais considera que o seu poder de compra, face a 2016...", 
		  solution : "Q1-3", 
		  options : [	{optId : "Q1-1", description: "Aumentou"},
		  				{optId : "Q1-2", description: "Diminui"},
		  				{optId : "Q1-3", description: "Manteve-se"},
		  				{optId : "Q1-4", description: "Não sabem"}		] 
		},
		{ id : 2,
		  ask : "Em que medida o Orçamento do Estado influencia as expetativas e comportamentos da maioria dos portugueses?", 
		  solution : "Q2-2", 
		  options : [	{optId : "Q2-1", description: "Muito"},
		  				{optId : "Q2-2", description: "Moderado"},
		  				{optId : "Q2-3", description: "Pouco"},
		  				{optId : "Q2-4", description: "Não sabem"}		] 
		},
		{ id : 3,
		  ask : "Quanto espera a maioria dos portugueses gastar nesta época festiva do Natal e Ano Novo?", 
		  solution : "Q3-1", 
		  options : [	{optId : "Q3-1", description: "Entre 300€ - 350€"},
		  				{optId : "Q3-2", description: "Entre 350€ - 400€"},
		  				{optId : "Q3-3", description: "Entre 400€ - 450€"},
		  				{optId : "Q3-4", description: "Entre 450€ - 500€"}		] 
		},
		{ id : 4,
		  ask : "Grande parte dos portugueses espera gastar a maior parte do seu orçamento de Natal em...", 
		  solution : "Q4-3", 
		  options : [	{optId : "Q4-1", description: "Alimentação e bebidas"},
		  				{optId : "Q4-2", description: "Eventos sociais"},
		  				{optId : "Q4-3", description: "Presentes"},
		  				{optId : "Q4-4", description: "Viagens"}		] 
		},
		{ id : 5,
		  ask : "Qual o presente que a maioria dos portugueses considera mais provável receber neste Natal?", 
		  solution : "Q5-1", 
		  options : [	{optId : "Q5-1", description: "Chocolates"},
		  				{optId : "Q5-2", description: "Cosméticos/ Perfumes"},
		  				{optId : "Q5-3", description: "Dinheiro"},
		  				{optId : "Q5-4", description: "Roupa/ Calçado"}		] 
		},
		{ id : 6,
		  ask : "Em que locais a maioria dos portugueses prefere fazer as suas compras de Natal?", 
		  solution : "Q6-2", 
		  options : [	{optId : "Q6-1", description: "Cadeias de retalho especializado"},
		  				{optId : "Q6-2", description: "Centros comerciais"},
		  				{optId : "Q6-3", description: "Hipermercados/ supermercados"},
		  				{optId : "Q6-4", description: "Lojas de rua"}		] 
		},
		{ id : 7,
		  ask : "Que fonte a maioria dos portugueses preferem utilizar para procurar ideias e conselhos para as suas compras de Natal?", 
		  solution : "Q7-3", 
		  options : [	{optId : "Q7-1", description: "Canais informais (amigos, familiares, vizinhos)"},
		  				{optId : "Q7-2", description: "Internet"},
		  				{optId : "Q7-3", description: "Lojas físicas"},
		  				{optId : "Q7-4", description: "Redes sociais"}		] 
		},
		{ id : 8,
		  ask : "Grande parte dos portugueses considera que a principal utilidade das redes sociais, para as compras de Natal, é...", 
		  solution : "Q8-2", 
		  options : [	{optId : "Q8-1", description: "Encontrar descontos, cupões e informações de vendas"},
		  				{optId : "Q8-2", description: "Pesquisar produtos"},
		  				{optId : "Q8-3", description: "Verificar preços"},
		  				{optId : "Q8-4", description: "Verificar quais os presentes que a família e amigos pretendem"}		] 
		},
		{ id : 9,
		  ask : "Para melhorar a sua experiência de compra, a maioria dos portugueses gostaria que os retalhistas investissem em...", 
		  solution : "Q9-4", 
		  options : [	{optId : "Q9-1", description: "Aplicação de telemóvel"},
		  				{optId : "Q9-2", description: "Entrega em casa"},
		  				{optId : "Q9-3", description: "Horários mais alargados"},
		  				{optId : "Q9-4", description: "Preços mais baixos"}		] 
		}

	];

	return questionsList;
}