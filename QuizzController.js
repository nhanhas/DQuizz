/* On Start App */
jQuery(document).ready(function($){
	resetApp();//reset defaults
});

//function to reset application
function resetApp(){
	$('#home').css('display','block');
	$('#intro').css('display','none');
}



/* Home Controlling... */
//#1 - on clicking home screen
function homeTouch(){

	//switch views
	$('#home').css('display','none');
	$('#intro').css('display','block');

}