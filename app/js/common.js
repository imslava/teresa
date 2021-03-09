$(document).ready(function(){

	$('.question-item').on('click', function(){
		$('> .question-item__text', this).slideToggle(300);
		$(this).toggleClass('active');
	});

});

function checkOffset() {
  var a=$(document).scrollTop()+window.innerHeight;
  var b=$('.footer').offset().top;
	if($(window).width() > 1200){
		if (a<b) {
			$('.nav').css({'bottom': '20px', 'top': '20px'});
		} else {
			$('.nav').css({'bottom': (20+(a-b))+'px', 'top': (20-(a-b))+'px'});
		}
	}
  
}
$(document).ready(checkOffset);
$(document).scroll(checkOffset);