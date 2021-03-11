/*!
 * plan-table.js
 */

$('.plan-table__top').css('width', $('.plan-table').width()+'px');

var leftInit = $(".plan-table__top").offset().left;
var planTable = $('.plan-table__scroll').offset().top;

$(window).scroll(function(event) {
	if ($(this).scrollTop() >= planTable && $(this).scrollTop() <= planTable + $('.plan-table__scroll').height()) {
		$('.plan-table__top').css('position', 'fixed');
	} else {
		$('.plan-table__top').css('position', 'absolute');
	}
	
});

$('.plan-table__scroll').scroll(function(event) {
	var x = 0 - $('.plan-table__scroll').scrollLeft();
	$(".plan-table__top").offset({
		left: x + leftInit
	});
});