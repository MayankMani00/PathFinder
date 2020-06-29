var rows = 20;
var h =
	$(window).width() < 992
		? $(window).width() < 769
			? $(window).width() < 576 ? '15px' : '20px'
			: '25px'
		: '30px';
var w = h;
var columns =
	$(window).width() < 992
		? $(window).width() < 769 ? ($(window).width() < 576 ? 20 : 30) : 40
		: 50;
$(window).resize(() => {
	const width = $(window).width();
	if (width > 992) {
		rows = 20;
		columns = 50;
		h = '30px';
		w = '30px';
	}
	if (width <= 992) {
		columns = 40;
		h = '25px';
		w = '25px';
	}
	if (width <= 769) {
		columns = 30;
		rows = 20;
		h = '20px';
		w = '20px';
	}
	if (width <= 576) {
		columns = 20;
		rows = 20;
		h = '15px';
		w = '15px';
	}
	createGrid();
});

function createGrid() {
	$('.graph').empty();
	const box = `<div class="graph-col"></div>`;
	for (var i = 0; i < rows; i++) {
		const row = $('<div></div>').attr('class', 'graph-row');
		// row.css('height', h);
		for (var j = 0; j < columns; j++) {
			row.append(box);
		}
		$('.graph').append(row);
	}
}

createGrid();
