$(document).ready(function(){

	$('.question-item').on('click', function(){
		$('> .question-item__text', this).slideToggle(300);
		$(this).toggleClass('active');
	});

});