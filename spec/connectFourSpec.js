describe("Connect Four", function() {

  connectFour.initializeBoard();

  it("should be able to switch player", function() {
    expect(connectFour.currentPlayer).toBe("red");
    connectFour.switchPlayer();
    expect(connectFour.currentPlayer).toBe("black");
  });

  it("should be able to make a move correctly", function() {
    connectFour.makeMove("1");
    expect(connectFour.board[1][0]).toBe("black");
    expect(connectFour.currentPlayer).toBe("red");
  });

  it("should not allow a move on a full column", function() {
    connectFour.makeMove("1");
    connectFour.makeMove("1");
    connectFour.makeMove("1");
    connectFour.makeMove("1");
    connectFour.makeMove("1");
    connectFour.makeMove("1");
    connectFour.makeMove("1");
    expect(connectFour.board[1].length).toBe(6);
    expect(connectFour.currentPlayer).toBe("black");
  })

  it("should find a horizontal win", function() {
    connectFour.currentPlayer = "black";
    connectFour.board = [["black"], ["black"], ["black"], ["black"], [], [], []];
    expect(connectFour.checkWin([2,0])).toBe(true);
  })

  it("should find a vertical win", function() {
    connectFour.currentPlayer = "red";
    connectFour.board = [["black"], ["black"], ["red", "red", "red", "red"], ["black"], [], [], []];
    expect(connectFour.checkWin([2,3])).toBe(true);
  })

  it("should find a diagonal win (positive slope)", function() {
    connectFour.currentPlayer = "red";
    connectFour.board = [["red"], ["black", "red"], ["red", "red", "red", "red"], ["black", "black", "black", "red"], [], [], []];
    expect(connectFour.checkWin([2,3])).toBe(true);
  })

  it("should find a diagonal win (negative slope)", function() {
    connectFour.currentPlayer = "red";
    connectFour.board = [["red", "black", "black", "red"], ["black", "red", "red"], ["red", "red", "red", "red"], ["red", "black", "black", "red"], [], [], []];
    expect(connectFour.checkWin([2,3])).toBe(true);
  })

  it("should not find a win that doesn't exist", function() {
    connectFour.currentPlayer = "red";
    connectFour.board = [["red", "black", "black", "red"], ["red", "red", "red"], ["black", "red", "red", "red"], ["black", "red", "black", "black"], [], [], []];
    expect(connectFour.checkWin([0,0])).toBe(false);
    expect(connectFour.checkWin([0,3])).toBe(false);
    expect(connectFour.checkWin([1,0])).toBe(false);
    expect(connectFour.checkWin([1,1])).toBe(false);
    expect(connectFour.checkWin([1,2])).toBe(false);
    expect(connectFour.checkWin([2,1])).toBe(false);
    expect(connectFour.checkWin([2,2])).toBe(false);
    expect(connectFour.checkWin([2,3])).toBe(false);
    expect(connectFour.checkWin([3,1])).toBe(false);
    expect(connectFour.checkWin([3,2])).toBe(false);

    connectFour.currentPlayer = "black";
    expect(connectFour.checkWin([0,1])).toBe(false);
    expect(connectFour.checkWin([0,2])).toBe(false);
    expect(connectFour.checkWin([2,0])).toBe(false);
    expect(connectFour.checkWin([3,0])).toBe(false);
    expect(connectFour.checkWin([3,2])).toBe(false);
    expect(connectFour.checkWin([3,3])).toBe(false);
  })

  it("should find a draw", function() {
    expect(connectFour.checkDraw()).toBe(false);
    connectFour.board = [["", "", "", "", "", ""],
                         ["", "", "", "", "", ""],
                         ["", "", "", "", "", ""],
                         ["", "", "", "", "", ""],
                         ["", "", "", "", "", ""],
                         ["", "", "", "", "", ""],
                         ["", "", "", "", "", ""]];
    expect(connectFour.checkDraw()).toBe(true);
  })

  
});