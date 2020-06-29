//grid: 50 x 20
import './grid.js';
import dijkstra from './algorithms/dijkstra.js';
import aStarSearch from './algorithms/astar.js';
import bestFirst from './algorithms/bestFirst.js';
import bfs from './algorithms/bfs.js';
import dfs from './algorithms/dfs.js';

let startingPoint = {
	x : 10,
	y : 10
};

let endingPoint = {
	x : 15,
	y : 15
};

let key; //for eraser vs weight types
let pointKey = null; // identifies each type
let startEndKey; // tells if drag is on start, end or a normal box
let algorithmKey = 1;
let delay = 0;
let finished = false;
class boardCell {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.prevNode = null;
		this.weight = 1;
		this.visited;
		this.totalDistance = Infinity;
		this.h;
		this.g = Infinity;
		this.f;
	}
}
// const color = 'rgba(0,149,221,0.5)';
const boxes = $('.graph-row .graph-col');
const points = {
	1 : 'wall',
	2 : 'medium',
	3 : 'high',
	4 : 'eraser',
	5 : 'clear-board',
	6 : 'reset-board'
};

//initializes the board
const board = [
	...boxes
].map((box, index) => {
	const cell = new boardCell(Math.floor(index / 50), index % 50);
	if (box.classList.contains('medium')) cell.weight = 5;
	if (box.classList.contains('high')) cell.weight = 5;
	if (box.classList.contains('wall')) cell.weight = Infinity;
	return cell;
});

//sets default points
function setDefault() {
	const startingBox = boxes[startingPoint.x * 50 + startingPoint.y];
	const endBox = boxes[endingPoint.x * 50 + endingPoint.y];

	startingBox.classList.add('start');
	startingBox.setAttribute('draggable', true);

	endBox.classList.add('end');
	endBox.setAttribute('draggable', true);
	$('.start')[0].innerHTML = '<i class="fas fa-star-of-life"></i>';
	$('.end')[0].innerHTML = '<i class="far fa-dot-circle"></i>';
}

//clears everything
function clearBoard() {
	[
		...boxes
	].forEach((box, index) => {
		box.className = 'graph-col';
		box.innerHTML = '';
		box.style.animationDelay = `0s`;
		board[index].weight = 1;
		board[index].visited = false;
		board[index].totalDistance = Infinity;
		board[index].g = Infinity;
		board[index].prevNode = null;
	});
	finished = false;
	setDefault();
}

const checkStartEnd = (param) =>
	!param.classList.contains('start') && !param.classList.contains('end')
		? true
		: false;

//updates weights and images
function updateBoard(box, name) {
	try {
		if (box.classList.contains('fas')) box = box.parentElement;
		let coordinate = box.getAttribute('data-x-y');
		coordinate = coordinate.split('-');
		if (checkStartEnd(box)) {
			if (key) {
				let w = Infinity;
				if (name === 'high') {
					w = 10;
					box.innerHTML = '<i class="fas fa-weight-hanging"></i>';
				} else if (name === 'medium') {
					w = 5;
					box.innerHTML = '<i class="fas fa-dumbbell"></i>';
				}
				board[50 * +coordinate[0] + +coordinate[1]].weight = w;
			} else {
				board[50 * +coordinate[0] + +coordinate[1]].weight = 1;
			}
		}
	} catch (err) {
		console.log(err);
		console.log(this, box, name);
	}
}

function eraser(cell) {
	if (checkStartEnd(cell)) {
		cell.className = 'graph-col';
		cell.innerHTML = '';
		updateBoard(cell, '');
	}
}

function updateStart(x, y) {
	startingPoint.x = +x;
	startingPoint.y = +y;
	boxes[startingPoint.x * 50 + startingPoint.y].className = 'graph-col start';
}

function updateEnd(x, y) {
	endingPoint.x = +x;
	endingPoint.y = +y;
	boxes[endingPoint.x * 50 + endingPoint.y].className = 'graph-col end';
}

/*


							DRAG


*/

//when mouse is dragged adds classes and avoids start/end
function cellDragStart() {
	startEndKey = 0;
	//console.log(this);
	if (key) {
		if (checkStartEnd(this)) {
			this.className = `graph-col ${points[pointKey]}`;
		}
		updateBoard(this, points[pointKey]);
	} else {
		eraser(this);
	}
	if (this.classList.contains('start')) startEndKey = 1;
	else if (this.classList.contains('end')) startEndKey = 2;
}

//when dragged mouse enter a new cell
function cellDragEnter() {
	if (key) {
		if (checkStartEnd(this))
			this.className = `graph-col ${points[pointKey]}`;
		updateBoard(this, points[pointKey]);
	} else {
		eraser(this);
	}
}

function dragOver(e) {
	e.preventDefault();
}

//drags start/end points
function onDrop() {
	if (startEndKey === 1) {
		const startingBox = [
			...boxes
		][startingPoint.x * 50 + startingPoint.y];

		startingBox.classList.remove('start');
		startingBox.innerHTML = '';
		this.classList.add('start');
		const coordinates = this.getAttribute('data-x-y').split('-');
		this.innerHTML = '<i class="fas fa-star-of-life"></i>';
		updateStart(coordinates[0], coordinates[1]);
	} else if (startEndKey === 2) {
		const endingBox = [
			...boxes
		][endingPoint.x * 50 + endingPoint.y];

		endingBox.classList.remove('end');
		endingBox.innerHTML = '';
		this.classList.add('end');
		const coordinates = this.getAttribute('data-x-y').split('-');
		this.innerHTML = '<i class="far fa-dot-circle"></i>';
		updateEnd(coordinates[0], coordinates[1]);
	}
}

/*


						EventListener


*/

//The type of point that will be marked
$('.point-type button').click((e) => {
	if (e.target.value == 5) clearBoard();

	pointKey = e.target.value;
	key = true;

	if (pointKey == 4) key = false;
});

//Marks points
boxes.click((e) => {
	if (e.target.classList.contains('fas')) e.target = e.target.parentElement;
	if (checkStartEnd(e.target)) {
		if (pointKey == null) {
			console.log('select point type');
		}
		if (pointKey == 4) {
			eraser(e.target);
		} else if (e.target.classList.contains('wall')) {
			e.target.classList.remove('wall');
			if (pointKey !== 1) {
				e.target.classList.add(points[pointKey]);
			}
		} else if (e.target.classList.contains('medium')) {
			e.target.classList.remove('medium');
			if (pointKey !== 2) {
				e.target.classList.add(points[pointKey]);
			}
		} else if (e.target.classList.contains('high')) {
			e.target.classList.remove('high');
			if (pointKey !== 3) {
				e.target.classList.add(points[pointKey]);
			}
		} else {
			e.target.classList.add(points[pointKey]);
		}
		updateBoard(e.target, points[pointKey]);
		e.target.setAttribute('draggable', true);
	}
});

//adds drag listeners on boxes
[
	...boxes
].forEach((box, index) => {
	box.setAttribute('data-x-y', `${Math.floor(index / 50)}-${index % 50}`);
	box.addEventListener('dragstart', cellDragStart);
	box.addEventListener('dragenter', cellDragEnter);
	box.addEventListener('dragover', dragOver);
	box.addEventListener('drop', onDrop);
});

$('#run').click(() => {
	if (finished) {
		$('#popup').css('display', 'flex');
		setTimeout(() => {
			$('#popup').css('display', 'none');
		}, 3000);
	} else {
		finished = true;
		switch (algorithmKey) {
			case 1:
				dijkstra(
					startingPoint,
					endingPoint,
					board,
					boxes,
					delay,
					delayIncrement
				);
				break;
			case 2:
				aStarSearch(
					startingPoint,
					endingPoint,
					board,
					boxes,
					delay,
					delayIncrement
				);
				break;
			case 3:
				bestFirst(
					startingPoint,
					endingPoint,
					board,
					boxes,
					delay,
					delayIncrement
				);
				break;
			case 4:
				bfs(
					startingPoint,
					endingPoint,
					board,
					boxes,
					delay,
					delayIncrement
				);
				break;
			case 5:
				dfs(
					startingPoint,
					endingPoint,
					board,
					boxes,
					delay,
					delayIncrement
				);
				break;
		}
	}
});

const selectedAlgorithm = $('#selected-algo-dropdown .dropdown-item');
$(selectedAlgorithm).click((e) => {
	algorithmKey = Number(e.target.getAttribute('value'));
	if (algorithmKey == 4 || algorithmKey == 5) {
		[
			...$('.weight')
		].forEach((button) => {
			button.disabled = true;
			button.classList.add('disabled');
		});
		if (pointKey == 2 || pointKey == 3) pointKey = null;
		clearBoard();
	} else {
		[
			...$('.weight')
		].forEach((button) => {
			button.disabled = false;
			button.classList.remove('disabled');
		});
	}
});

let delayIncrement = 0.01;

const speed = $('#speed-dropdown .dropdown-item');
$(speed).click(
	(e) => (delayIncrement = Number(e.target.getAttribute('value')))
);

setDefault();
