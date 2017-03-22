$(window).ready(function() {
	var game = new Game;
	game.printBoardElements();

	$("#start").on("click", function(e) {
		game = new Game;
		game.printBoardElements();
	})
	
	$(window).on("keydown", function(e) {
		game.initBoard = _.clone(game.board)
		if(e.which == 37 || e.which == 39) {
			game.moveHorizontal(e.which, game.board);
		}
		else if (e.which == 38 || e.which == 40) {
			game.moveVertical(e.which);
		}
		game.compareBoards();
		
	});
});
		