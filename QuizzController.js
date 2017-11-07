/* On Start App */
jQuery(document).ready(function($){
	updateQuizzDateTime();
	resetApp();//reset defaults
});

//function to reset application
function resetApp(){
	$('#home').css('display','block');
	$('#app').css('display','none');
	/**/$('#view-0').css('display','block');
	/**/$('#view-1').css('display','none');
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
function view0Click(){
	$('#view-0').css('display','none');
	$('#view-1').css('display','block');
	$('#view-2').css('display','none');
	$('#view-3').css('display','none');
	$('#view-4').css('display','none');
	$('#view-5').css('display','none');
	$('#view-6').css('display','none');

}

//#2 - Click "Iniciar Quiz" in view 1 (Hints)
function view1Click(){
	$('#view-0').css('display','none');
	$('#view-1').css('display','none');
	$('#view-2').css('display','block');
	$('#view-3').css('display','none');
	$('#view-4').css('display','none');
	$('#view-5').css('display','none');
	$('#view-6').css('display','none');
}