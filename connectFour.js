$(document).ready( function() {
	connectFour.initializeBoard();

	$(".column").click( function(event) {
		connectFour.makeMove(parseInt(event.currentTarget.id));
	})
})

var connectFour = {
	initializeBoard: function() {
		this.board = [[], [], [], [], [], [], []];
		this.currentPlayer = "red";
		$(".board").css("cursor", "url(images/" + this.currentPlayer + ".cur) 46 46, auto");
	},

	switchPlayer: function() {
		this.currentPlayer = this.currentPlayer === "red" ? "black" : "red";
		$(".board").css("cursor", "url(images/" + this.currentPlayer + ".cur) 46 46, auto");
	},

	makeMove: function(column) {
		if (this.board[column].length < 6) {
			this.board[column].push(this.currentPlayer);
			var $piece = $("<div class='" + this.currentPlayer + "'></div>");
			$(".column#" + column).prepend($piece);
			this.slidePieceDown($piece, column);
			if ( this.checkWin( [ column, this.board[column].length - 1 ]) ) {
				setTimeout( function() {
					alert(connectFour.currentPlayer + " player wins!");
					connectFour.initializeBoard();
					$(".column").empty();
				}, 500);
			} else if (this.checkDraw()) {
				setTimeout( function() {
					alert("It's a draw");
					connectFour.initializeBoard();
					$(".column").empty();
				}, 500);
			} else {
				this.switchPlayer();
			}
		}
	},

	checkDraw: function() {
		var total = 0;
		for (var i = 0; i < this.board.length; i++) {
			total += this.board[i].length;
		}
		if (total === 42) {
			return true;
		}
		return false;
	},

	// only check for win at chosen location, 
	// call this after move is made. 
	// No need to check whole board every time
	checkWin: function(position) {
		return ( this.checkWinHorizontal(position) || this.checkWinVertical(position) || this.checkWinDiagonal(position) );
	},

	checkWinHorizontal: function(position) {
		return this.checkWinGeneral(position, 1, 0);
	},

	checkWinVertical: function(position) {
		return this.checkWinGeneral(position, 0, 1)
	},

	checkWinDiagonal: function(position) {
		return (this.checkWinGeneral(position, 1, 1) || this.checkWinGeneral(position, 1, -1))
	},

	checkWinGeneral: function(position, xIncrement, yIncrement) {
		upMatches = this.countContiguousMatches(position, xIncrement, yIncrement, "up");
		downMatches = this.countContiguousMatches(position, xIncrement, yIncrement, "down");

		if (upMatches + downMatches >= 3) {
			return true;
		}
		return false;
	},

	countContiguousMatches: function(position, xIncrement, yIncrement, direction) {
		if (direction == "down") { xIncrement *= -1; yIncrement *= -1; }
		var matches = 0;
		var newXIncrement = xIncrement;
		var newYIncrement = yIncrement;
		while (this.board[position[0] + newXIncrement] && 
					 this.board[position[0] + newXIncrement][position[1] + newYIncrement] === this.currentPlayer) {
			matches += 1;
			newXIncrement += xIncrement;
			newYIncrement += yIncrement;
		}
		return matches;
	},

	slidePieceDown: function($piece, column) {
		var offset = 618 - (this.board[column].length * 100);
		$piece.animate({"top": offset + "px"}, 500);
	}
}