$(document).ready(function(){

	$('.question-item').on('click', function(){
		$('> .question-item__text', this).slideToggle(300);
		$(this).toggleClass('active');
	});

	$('.profile-audio').on('click', function(){
		$(this).toggleClass('active');
	});

	$('.nav-burger').on('click', function(){
		$('.nav-menu').slideToggle(300);
		$(this).toggleClass('active');

		$("body").toggleClass("compensate-for-scrollbar");
		$(".nav-menu ul").toggleClass("compensate-for-scrollbar-menu");
	});

	$("head").append('<style type="text/css">.compensate-for-scrollbar, .compensate-for-scrollbar-menu{overflow: hidden; margin-right:' + (window.innerWidth - document.documentElement.clientWidth) + "px;}</style>");

	if($(window).width() > 1024){
		$('.history-content').colcade({
			columns: '.history-col',
			items: '.history-item'
		});
	}
	

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