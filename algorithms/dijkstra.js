import visualizePath from '../visualize.js';

//returns smaller arr that has least value(s)
function getMin(sortedArr) {
	let arr = [];
	sortedArr.forEach((item) => {
		if (item.totalDistance === sortedArr[0].totalDistance) {
			arr.push(item);
			item.visited = true;
		}
	});
	return arr;
}

//update distance of neighboring cells
function updateDistance(cell, board, boxes, delay, delayIncrement) {
	var found = false;
	if (cell.y > 0) {
		let leftCell = board[cell.x * 50 + cell.y - 1];
		{
			if (leftCell.totalDistance > cell.totalDistance + leftCell.weight) {
				leftCell.totalDistance = cell.totalDistance + leftCell.weight;
				leftCell.prevNode = cell;
				boxes[
					leftCell.x * 50 + leftCell.y
				].style.animationDelay = `${(delay += delayIncrement)}s`;
				boxes[leftCell.x * 50 + leftCell.y].classList.add('visited');
				found = true;
			}
		}
	}
	if (cell.x > 0) {
		let topCell = board[(cell.x - 1) * 50 + cell.y];
		{
			if (topCell.totalDistance > cell.totalDistance + topCell.weight) {
				topCell.totalDistance = cell.totalDistance + topCell.weight;
				topCell.prevNode = cell;
				boxes[
					topCell.x * 50 + topCell.y
				].style.animationDelay = `${(delay += delayIncrement)}s`;
				boxes[topCell.x * 50 + topCell.y].classList.add('visited');
				found = true;
			}
		}
	}
	if (cell.y < 49) {
		let rightCell = board[cell.x * 50 + cell.y + 1];
		{
			if (
				rightCell.totalDistance >
				cell.totalDistance + rightCell.weight
			) {
				rightCell.totalDistance = cell.totalDistance + rightCell.weight;
				rightCell.prevNode = cell;
				boxes[rightCell.x * 50 + rightCell.y].classList.add('visited');
				boxes[
					rightCell.x * 50 + rightCell.y
				].style.animationDelay = `${(delay += delayIncrement)}s`;
				found = true;
			}
		}
	}
	if (cell.x < 19) {
		let bottomCell = board[(cell.x + 1) * 50 + cell.y];
		{
			if (
				bottomCell.totalDistance >
				cell.totalDistance + bottomCell.weight
			) {
				bottomCell.totalDistance =
					cell.totalDistance + bottomCell.weight;
				bottomCell.prevNode = cell;
				boxes[bottomCell.x * 50 + bottomCell.y].classList.add(
					'visited'
				);
				boxes[
					bottomCell.x * 50 + bottomCell.y
				].style.animationDelay = `${(delay += delayIncrement)}s`;
				found = true;
			}
		}
	}
	return [
		found,
		delay
	];
}

export default function dijkstra(
	startingPoint,
	endingPoint,
	board,
	boxes,
	delay,
	delayIncrement
) {
	let visited = [];

	board[startingPoint.x * 50 + startingPoint.y].totalDistance = 0;
	board[endingPoint.x * 50 + endingPoint.y].weight = 1;
	let unvisited = board;

	unvisited = unvisited
		.map((node) => node)
		.sort((a, b) => a.totalDistance - b.totalDistance);
	delay = 0;
	var foundCount,
		flag = true,
		found;
	while (
		!boxes[endingPoint.x * 50 + endingPoint.y].classList.contains(
			'visited'
		) &&
		flag
	) {
		foundCount = 0;
		getMin(unvisited).forEach((el) => {
			visited.push(el);
			unvisited.shift();
			[
				found,
				delay
			] = updateDistance(el, board, boxes, delay, delayIncrement);
			if (found == false) foundCount++;
		});
		if (foundCount === unvisited.length) flag = false;
		unvisited = unvisited
			.map((node) => node)
			.sort((a, b) => a.totalDistance - b.totalDistance);
	}
	if (flag) visualizePath(startingPoint, endingPoint, board, boxes, delay);
	else {
	}
}
