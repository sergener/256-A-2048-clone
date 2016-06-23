
function Game(initBoard) {
	this.board = this.board();
	this.initBoard;
}

Game.prototype.board = function() {
	var arr = [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var shuffled = _.shuffle(arr);
	return split(shuffled);
}

function split(arr) {
  var boardArray = [];
  while (arr.length) {
    boardArray.push(arr.splice(0, 4));
  }
  return boardArray;
}

Game.prototype.printBoardElements = function() {
  var array = this.board;

  for(var i = 0; i < 4; i++) {
    var rowId = array[i]
    for(var j = 0; j < 4; j++) {
      var cell = $("#row-" + i + " .col-" + j)
      if(array[i][j] === 0) {
        cell.text("");
        cell.removeClass("num"+/[0-9]+/);
        cell.addClass("num0");
      }
      else {
        cell.text(array[i][j]);
        cell.addClass("num" + array[i][j])
      }
    }
  }
}

Game.prototype.moveHorizontal = function(direction, board) {
	for(var i = 0; i < board.length; i++) {
		board[i] = _.compact(board[i]);
		if (direction == 37 || direction == 38) {
			board[i] = add(board[i]);
			while (board[i].length < 4) {
			board[i].push(0);
			}
		}
		else if (direction == 39 || direction == 40) {
			board[i] = add(board[i].reverse());
			board[i] = board[i].reverse();
			while (board[i].length < 4) {
				board[i].unshift(0);
			}
		}
	}
}


Game.prototype.moveVertical = function(direction) {
	var board = _.unzip(this.board);
	this.moveHorizontal(direction, board);
	this.board = _.unzip(board);
}

Game.prototype.compareBoards = function () {
	if (_.join(this.initBoard, ',') == _.join(this.board, ',')) {
		this.printBoardElements();
	} else { 
		this.generateNumOnBoard();
		this.printBoardElements(); };
}


function add(row) {
	if (row != []){
		for (var i = 0; i < row.length; i++) { //this is a single row
			if (row[i] == row[(i+1)] ){
				var j = (i+1);
				row[i] = row[i] + row[j];
				row.splice(j, 1);
			};
		};
	};
	return row;
}

Game.prototype.generatePos = function () {
	var randRowIdx = Math.floor(Math.random() * this.board.length);
	var randPosIdx = Math.floor(Math.random() * this.board.length);
	return ([randRowIdx, randPosIdx]);
}

Game.prototype.getNewNum = function() {
  var num = [ 2,2,2,2,2,2,2,4,4,4,4 ]
  return num[ Math.floor( Math.random() * num.length ) ]
}

Game.prototype.generateNumOnBoard = function () {
	var idx = this.generatePos();
	while (this.board[idx[0]][idx[1]] != 0){
			idx = this.generatePos();
		};
	this.board[idx[0]][idx[1]] = this.getNewNum();
}

Game.prototype.over = function () {

}

Game.prototype.reset = function () {
}
