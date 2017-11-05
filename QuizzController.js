/* On Start App */
jQuery(document).ready(function($){
	updateQuizzDateTime();
	resetApp();//reset defaults
});

//function to reset application
function resetApp(){
	$('#home').css('display','block');
	$('#app').css('display','none');
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