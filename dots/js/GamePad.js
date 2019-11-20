var GamePad  = function (rows, columns, gCtrl) {
  var lBorder = 1;
  var lUserBorder = 10;
  var lUserBorderBy2 = lUserBorder/2;

  var gameTemplate=document.getElementById("gameTemplate");
  var ctxGameTemplate=gameTemplate.getContext("2d");

  var gameLine=document.getElementById("gameLine");
  var ctxGameLine=gameLine.getContext("2d");
  var ctxGameImg=ctxGameLine;

  var gameLineTry=document.getElementById("gameLineTry");
  var ctxGameLineTry=gameLineTry.getContext("2d");

  var gameDots=document.getElementById("gameDots");
  var ctxGameDots=gameDots.getContext("2d");

  var sWidth = 0;
  var sHeight = 0;
  var thisObj = this;

  this.init = function() {
    sWidth = (700-(rows+1))/rows;
    sHeight = (700-(columns+1))/columns;
  };

  this.clear = function() {
    ctxGameTemplate.clearRect(0, 0, gameTemplate.width, gameTemplate.height);
    ctxGameLine.clearRect(0, 0, gameLine.width, gameLine.height);
    ctxGameLineTry.clearRect(0, 0, gameLineTry.width, gameLineTry.height);
    ctxGameDots.clearRect(0, 0, gameDots.width, gameDots.height);
  };

  this.drawImageOnBox = function(img, row, col) {
    drawImage(ctxGameImg, img, col*sWidth+col*lBorder+10, row*sHeight+row*lBorder+10, sWidth-10, sHeight-10);
  }

  this.drawLineRC = function(ctx, s, e, dashStyle) {
    drawLine(ctx, 
      {x:(s.col?sWidth*s.col+s.col*lBorder:1)+10, y:(s.row?sHeight*s.row+s.row*lBorder:1)+10}, 
      {x:(e.col?sWidth*e.col+e.col*lBorder:1)+10, y:(e.row?sHeight*e.row+e.row*lBorder:1)+10},
      getColor(), 10,
      dashStyle);   
  };

  this._drawLineFromRCToNextCol = function(ctx, s, dashStyle) {
    var e = {
        row : s.row,
        col : s.col+1
    };
    this.drawLineRC(ctx, s, e, dashStyle);
  };

  this.drawLineFromRCToNextCol = function(s) {
    this._drawLineFromRCToNextCol(ctxGameLine, s);
  };


  this.drawLineFromRCToNextColTry = function(s) {
    this._drawLineFromRCToNextCol(ctxGameLineTry, s, [5,2]);
  };

  this._drawLineFromRCToNextRow = function(ctx, s, dashStyle) {
    var e = {
        row : s.row+1,
        col : s.col
    };
    this.drawLineRC(ctx, s, e, dashStyle);
  };

  this.drawLineFromRCToNextRow = function(s) {
    this._drawLineFromRCToNextRow(ctxGameLine, s);
  };

  this.drawLineFromRCToNextRowTry = function(s) {
    this._drawLineFromRCToNextRow(ctxGameLineTry, s, [5,2]);
  };

  this.drawPad = function() {
    for(var i = 0; i < rows+1; i++) {
      drawLine(ctxGameTemplate, 
        {x:(i?sWidth*i+i*lBorder:1)+10, y:1}, 
        {x:(i?sWidth*i+i*lBorder:1)+10, y:700},
        '#efeefe', 1,
        [5,2]);
    }

    for(var i = 0; i < columns+1; i++) {
     drawLine(ctxGameTemplate, 
       {y:(i?sHeight*i+i*lBorder:1)+10, x:1}, 
       {y:(i?sHeight*i+i*lBorder:1)+10, x:700},
       '#efeefe', 1,
       [5,2]);
    }

    for(var i = 0; i < rows+1; i++) {
      for(var j = 0; j < columns+1; j++) {
        drawCircle(ctxGameDots, 
          (j?sWidth*j+j*lBorder:1)+10, 
          (i?sHeight*i+i*lBorder:1)+10,
          10, "blue");
      }
    }
  };


  function _drawPlayerLineNextCol(s, activity) {
      if (activity == "up") {
        thisObj.drawLineFromRCToNextCol({row:s.row, col:s.col});
      } else {
        thisObj.drawLineFromRCToNextColTry({row:s.row, col:s.col});
      }
  }

  function _drawPlayerLineNextRow(s, activity) {
      if (activity == "up") {
        thisObj.drawLineFromRCToNextRow({row:s.row, col:s.col});
      } else {
        thisObj.drawLineFromRCToNextRowTry({row:s.row, col:s.col});
      }
  }

  function drawPlayerLine(x, y, activity) {
    ctxGameLineTry.clearRect(0, 0, gameLineTry.width, gameLineTry.height);

    var pos = windowToCanvas(gameDots, x, y);

    //console.log(pos.x, pos.y);

    var r = Math.floor((pos.y-10)/(sHeight+lBorder));
    var c = Math.floor((pos.x-10)/(sWidth+lBorder));
    var x =  (pos.x-10)%(sWidth+lBorder);
    var y =  (pos.y-10)%(sHeight+lBorder);

    //console.log(r, c, x, y);

    var top = pDistance(x, y, 0, 0, sWidth, 0);
    var bottom = pDistance(x, y, 0, sHeight, sWidth, sHeight);
    var left = pDistance(x, y, 0, 0, 0, sHeight);
    var right = pDistance(x, y, sWidth, 0, sWidth, sHeight);
    var min = Math.min(top, bottom, left, right);

    var nearer = '';
    var dir = '';
    var r1 = 0;
    var c1 = 0;

    if (top == min) {
      nearer = "top";
      dir = 'h';
      r1 = r;
      c1 = c;
    } else if (bottom == min) {
      nearer = "bottom";
      dir = 'h';
      r1 = r+1;
      c1 = c;
    } else if (left == min) {
      nearer = "left";
      dir = 'v';
      r1 = r;
      c1 = c;
    } else if (right == min) {
      nearer = "right";
      dir = 'v';
      r1 = r;
      c1 = c+1;
    }

    if (gCtrl.isLegal(r1, c1, dir)) {
      if (dir == 'h') {
        _drawPlayerLineNextCol({row:r1, col:c1}, activity);
      } if (dir == 'v') {
        _drawPlayerLineNextRow({row:r1, col:c1}, activity);
      }
      if (activity == "up") gCtrl.placed(r1, c1, dir);
    }
    //console.log(r, c, nearer);
  }

  //==========================================================
  function _onMouseMove(x, y) {
    drawPlayerLine(x, y, "move");
  }


  function onMouseMove(e) {
    _onMouseMove(e.clientX, e.clientY);
  }


  var lastMove = null;
  function onTouchMove(e) {
    e.preventDefault();
    lastMove = e;
    _onMouseMove(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
  }

  gameDots.addEventListener('mousemove', onMouseMove, false);
  gameDots.addEventListener('touchmove', onTouchMove, false);
  //==========================================================
  function _onMouseUp(x, y) {
    drawPlayerLine(x, y, "up");
  }


  function onMouseUp(e) {
    _onMouseUp(e.clientX, e.clientY);
  }


  var lastMove = null;
  function onTouchEnd(e) {
    e.preventDefault();
    e = lastMove;
    _onMouseUp(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
  }

  function onTouchStart(e) {
    e.preventDefault();
    lastMove = e;
  }

  gameDots.addEventListener('mouseup', onMouseUp, false);
  gameDots.addEventListener('touchend', onTouchEnd, false);
  gameDots.addEventListener('touchstart', onTouchStart, false);

  this.init();
  this.drawPad();
};
