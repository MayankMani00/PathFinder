export default function createGrid(rows, columns) {
	$('.graph').empty();
	const box = `<div class="graph-col"></div>`;
	for (var i = 0; i < rows; i++) {
		const row = $('<div></div>').attr('class', 'graph-row');
		// row.css('height', h);
		for (var j = 0; j < columns; j++) {
			if (i == 10 && j == 10) {
				const startBox = `<div class="graph-col start" draggable><i class="fas fa-star-of-life"></i></div>`;
				row.append(startBox);
				continue;
			} else if (i == 15 && j == 15) {
				const endBox = `<div class="graph-col end" draggable><i class="far fa-dot-circle"></i></div>`;
				row.append(endBox);
				continue;
			}
			row.append(box);
		}
		$('.graph').append(row);
	}
}
