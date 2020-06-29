export default function visualizePath(
	startingPoint,
	endingPoint,
	board,
	boxes,
	delay
) {
	let temp = board[endingPoint.x * 50 + endingPoint.y];
	let tempArr = [];
	let t = 0;

	if (temp.prevNode == null) {
		console.log('not found');
		return;
	}

	setTimeout(() => {
		while (temp !== board[startingPoint.x * 50 + startingPoint.y]) {
			try {
				tempArr.push(temp);
				boxes[
					temp.x * 50 + temp.y
				].style.animationDelay = `${(t += 0.05)}s`;
				boxes[temp.x * 50 + temp.y].classList.add('path');
				temp = temp.prevNode;
			} catch (err) {
				console.log(temp, tempArr, err);
				temp = startingPoint;
			}
		}
		boxes[startingPoint.x * 50 + startingPoint.y].className =
			'graph-col path';
	}, delay * 1000);
}
