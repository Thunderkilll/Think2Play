function drawImage(ctx, img, posX, posY, width, height) {
  ctx.drawImage(img, posX, posY, width, height);
}

function drawCircle(ctx, x,y,r,clr) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.fillStyle = clr;
  ctx.closePath();
  ctx.fill();
}

function drawLine(ctx, p1, p2, clr, lineWidth, dashStyle) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = clr;
  if (lineWidth) {
    ctx.lineWidth = lineWidth;
  }
  if (dashStyle) {
    ctx.setLineDash(dashStyle);
  }
  ctx.stroke();
}


function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return { x: (x-bbox.left) * (canvas.width  / bbox.width),
            y: (y-bbox.top) * (canvas.height / bbox.height)
          };
}


function pDistance(x, y, x1, y1, x2, y2) {
  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = dot / len_sq;

  var xx, yy;

  if (param < 0 || (x1 == x2 && y1 == y2)) {
    xx = x1;
    yy = y1;
  }
  else if (param > 1) {
    xx = x2;
    yy = y2;
  }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = x - xx;
  var dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}