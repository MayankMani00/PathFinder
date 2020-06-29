import visualizePath from '../visualize.js';

const manhattanDistance = (x1, y1, endingPoint) =>
	Math.abs(x1 - endingPoint.x) + Math.abs(y1 - endingPoint.y);

function updateNeighbors(cell, openList, board, endingPoint) {
	if (cell.y > 0) {
		let leftCell = board[cell.x * 50 + cell.y - 1];
		if (leftCell.weight !== Infinity && !leftCell.visited) {
			leftCell.h =
				manhattanDistance(leftCell.x, leftCell.y, endingPoint) +
				leftCell.weight;
			leftCell.visited = true;
			leftCell.prevNode = cell;
			openList.push(leftCell);
		}
	}

	if (cell.x > 0) {
		let topCell = board[(cell.x - 1) * 50 + cell.y];
		if (topCell.weight !== Infinity && !topCell.visited) {
			topCell.h =
				manhattanDistance(topCell.x, topCell.y, endingPoint) +
				topCell.weight;
			topCell.visited = true;
			topCell.prevNode = cell;
			openList.push(topCell);
		}
	}

	if (cell.y < 49) {
		let rightCell = board[cell.x * 50 + cell.y + 1];
		if (rightCell.weight !== Infinity && !rightCell.visited) {
			rightCell.h =
				manhattanDistance(rightCell.x, rightCell.y, endingPoint) +
				rightCell.weight;
			rightCell.prevNode = cell;
			rightCell.visited = true;
			openList.push(rightCell);
		}
	}

	if (cell.x < 19) {
		let bottomCell = board[(cell.x + 1) * 50 + cell.y];
		if (bottomCell.weight !== Infinity && !bottomCell.visited) {
			bottomCell.h =
				manhattanDistance(bottomCell.x, bottomCell.y, endingPoint) +
				bottomCell.weight;
			bottomCell.prevNode = cell;
			bottomCell.visited = true;
			openList.push(bottomCell);
		}
	}
}

export default function bestFirst(
	startingPoint,
	endingPoint,
	board,
	boxes,
	delay,
	delayIncrement
) {
	board[startingPoint.x * 50 + startingPoint.y].totalDistance = 0;
	board[startingPoint.x * 50 + startingPoint.y].h = 0;

	var openList = [];
	var flag = true;

	openList.push(board[startingPoint.x * 50 + startingPoint.y]);

	while (openList.length && flag) {
		var lowest = openList[0];
		openList.shift();

		boxes[
			lowest.x * 50 + lowest.y
		].style.animationDelay = `${(delay += delayIncrement)}s`;
		boxes[lowest.x * 50 + lowest.y].classList.add('visited');

		if (lowest === board[endingPoint.x * 50 + endingPoint.y]) flag = false;
		else {
			updateNeighbors(lowest, openList, board, endingPoint);
			openList.sort((a, b) => a.h - b.h);
		}
	}
	if (!flag) visualizePath(startingPoint, endingPoint, board, boxes, delay);
}
