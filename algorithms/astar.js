import visualizePath from '../visualize.js';

const manhattanDistance = (x1, y1, endingPoint) =>
	Math.abs(x1 - endingPoint.x) + Math.abs(y1 - endingPoint.y);

function updateNeighbors(cell, closedList, openList, board, endingPoint) {
	if (cell.y > 0) {
		let leftCell = board[cell.x * 50 + cell.y - 1];
		if (leftCell.weight !== Infinity) {
			if (leftCell.g > cell.g + leftCell.weight) {
				if (
					!openList.includes(leftCell) &&
					!closedList.includes(leftCell)
				) {
					leftCell.h = manhattanDistance(
						leftCell.x,
						leftCell.y,
						endingPoint
					);
					openList.push(leftCell);
				}
				leftCell.g = cell.g + leftCell.weight;
				leftCell.prevNode = cell;
				leftCell.f = leftCell.h + leftCell.g;
			}
		}
	}

	if (cell.x > 0) {
		let topCell = board[(cell.x - 1) * 50 + cell.y];
		if (topCell.weight !== Infinity) {
			if (topCell.g > cell.g + topCell.weight) {
				if (
					!openList.includes(topCell) &&
					!closedList.includes(topCell)
				) {
					topCell.h = manhattanDistance(
						topCell.x,
						topCell.y,
						endingPoint
					);
					openList.push(topCell);
				}
				topCell.g = cell.g + topCell.weight;
				topCell.prevNode = cell;
				topCell.f = topCell.h + topCell.g;
			}
		}
	}

	if (cell.y < 49) {
		let rightCell = board[cell.x * 50 + cell.y + 1];
		if (rightCell.weight !== Infinity) {
			if (rightCell.g > cell.g + rightCell.weight) {
				if (
					!openList.includes(rightCell) &&
					!closedList.includes(rightCell)
				) {
					rightCell.h = manhattanDistance(
						rightCell.x,
						rightCell.y,
						endingPoint
					);
					openList.push(rightCell);
				}
				rightCell.g = cell.g + rightCell.weight;
				rightCell.prevNode = cell;
				rightCell.f = rightCell.h + rightCell.g;
			}
		}
	}

	if (cell.x < 19) {
		let bottomCell = board[(cell.x + 1) * 50 + cell.y];
		if (bottomCell.weight !== Infinity) {
			if (bottomCell.g > cell.g + bottomCell.weight) {
				if (
					!openList.includes(bottomCell) &&
					!closedList.includes(bottomCell)
				) {
					bottomCell.h = manhattanDistance(
						bottomCell.x,
						bottomCell.y,
						endingPoint
					);
					openList.push(bottomCell);
				}
				bottomCell.g = cell.g + bottomCell.weight;
				bottomCell.prevNode = cell;
				bottomCell.f = bottomCell.h + bottomCell.g;
			}
		}
	}
}

export default function aStarSearch(
	startingPoint,
	endingPoint,
	board,
	boxes,
	delay,
	delayIncrement
) {
	board[startingPoint.x * 50 + startingPoint.y].totalDistance = 0;
	board[startingPoint.x * 50 + startingPoint.y].g = 0;
	board[startingPoint.x * 50 + startingPoint.y].h = manhattanDistance(
		startingPoint.x,
		startingPoint.y,
		endingPoint
	);
	board[endingPoint.x * 50 + endingPoint.y].weight = 1;
	let openList = [];
	let closedList = [];
	var flag = true;
	openList.push(board[startingPoint.x * 50 + startingPoint.y]);

	while (openList.length && flag) {
		var lowest = openList[0];
		openList.forEach((node) => {
			if (node.f < lowest.f) {
				lowest = node;
			}
		});
		boxes[lowest.x * 50 + lowest.y].classList.add('visited');
		boxes[
			lowest.x * 50 + lowest.y
		].style.animationDelay = `${(delay += delayIncrement)}s`;
		if (lowest === board[endingPoint.x * 50 + endingPoint.y]) flag = false;
		else {
			openList = openList.filter((node) => node !== lowest);
			if (!closedList.includes(lowest))
				updateNeighbors(
					lowest,
					closedList,
					openList,
					board,
					endingPoint
				);
			closedList.push(lowest);
		}
	}
	if (!flag) visualizePath(startingPoint, endingPoint, board, boxes, delay);
}
