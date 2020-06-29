export default function createGrid(columns, rows) {
	const box = '<div class="graph-col"></div>';
	for (var i = 0; i < rows; i++) {
		const row = $('<div></div>').attr('class', 'graph-row');
		for (var j = 0; j < columns; j++) {
			row.append(box);
		}
		$('.graph').append(row);
	}
}
