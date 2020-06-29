import visualizePath from '../visualize.js';

const getNeightbors = (cell, openList, board) => {
	if (cell.y > 0) {
		let leftCell = board[cell.x * 50 + cell.y - 1];
		if (leftCell.weight !== Infinity && !leftCell.visited) {
			leftCell.visited = true;
			leftCell.prevNode = cell;
			openList.push(leftCell);
		}
	}

	if (cell.x > 0) {
		let topCell = board[(cell.x - 1) * 50 + cell.y];
		if (topCell.weight !== Infinity && !topCell.visited) {
			topCell.visited = true;
			topCell.prevNode = cell;
			openList.push(topCell);
		}
	}

	if (cell.y < 49) {
		let rightCell = board[cell.x * 50 + cell.y + 1];
		if (rightCell.weight !== Infinity && !rightCell.visited) {
			rightCell.prevNode = cell;
			rightCell.visited = true;
			openList.push(rightCell);
		}
	}

	if (cell.x < 19) {
		let bottomCell = board[(cell.x + 1) * 50 + cell.y];
		if (bottomCell.weight !== Infinity && !bottomCell.visited) {
			bottomCell.prevNode = cell;
			bottomCell.visited = true;
			openList.push(bottomCell);
		}
	}
};

export default function bfs(
	startingPoint,
	endingPoint,
	board,
	boxes,
	delay,
	delayIncrement
) {
	board[startingPoint.x * 50 + startingPoint.y].totalDistance = 0;
	let openList = [];
	openList.push(board[startingPoint.x * 50 + startingPoint.y]);
	var flag = true;
	while (openList.length && flag) {
		var node = openList.shift();
		boxes[node.x * 50 + node.y].classList.add('visited');
		boxes[
			node.x * 50 + node.y
		].style.animationDelay = `${(delay += delayIncrement)}s`;
		if (node === board[endingPoint.x * 50 + endingPoint.y]) flag = false;
		else getNeightbors(node, openList, board);
	}
	if (!flag) visualizePath(startingPoint, endingPoint, board, boxes, delay);
}
