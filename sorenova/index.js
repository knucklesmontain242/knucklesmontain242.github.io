const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const nordDimensions = {
  width: 353 * 1.2,
  height: 325 * 1.2
};

const startTime = Date.now();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.translate(window.innerWidth / 2, window.innerHeight / 2);

const image = new Image();
image.src = "https://64.media.tumblr.com/5fab0c4f5aed35975445f4cc572d3211/bd2cb923d430c466-f0/s500x750/2e9b160d08a1e8e42cb9dd0f7780ae3e52fe93b1.png";

const loopingnords = 40;
const offsetDistance = 120;
let currentOffset = 0;

const movementRange = 200

const mouseOffset = {
  x: 0,
  y: 0
}

const movementOffset = {
  x: 0,
  y: 0
}

image.onload = () => {
  if(localStorage.getItem('isWoke') == null || localStorage.getItem('isWoke') == 'false'){
	  $("#wrapper").hide();
	  $("#woke").show();
  }else {
	  $("#wrapper").show();
	  $("#woke").hide();
  }
  startLooping();
  window.resizeTo("600", "600");
  $('.deny').click(function() {
    window.close();
  });
  $('canvas').click(function() {
    $('.ui.modal').modal('show');
  });
  $('body').append('<script src="https://www.youtube.com/player_api"></script><div class="gaf210imvustylez_youtubebox" style="width:1px;height:1px;overflow:hidden"><iframe allow="autoplay" width="300" height="300" src="https://www.youtube.com/embed/Y4KX-owEk98?autoplay=1&amp;loop=1&amp;playlist=Y4KX-owEk98" frameborder="0" onload="gaf210_youtube_invisible=new YT.Player(this,{events:{\'onReady\':function(event){event.target.playVideo()}}});" allowfullscreen></iframe><!--Youtube player code generated @ https://gaf210.imvustylez.net --></div>');
};

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.setTransform(1, 0, 0, 1, 0, 0); //Reset the canvas context
  context.translate(window.innerWidth / 2, window.innerHeight / 2);
};

window.addEventListener('mousemove', onMouseMove)

function draw(offset, loopCount) {

  let currentPercentage = (loopingnords - loopCount) / loopingnords
  context.drawImage(
    image,
    -nordDimensions.width / 2 - offset / 2 + (movementOffset.x * currentPercentage),
    -nordDimensions.height / 2 - offset / 2 + (movementOffset.y * currentPercentage),
    nordDimensions.width + offset,
    nordDimensions.height + offset
  );
}

function onMouseMove(e) {
  mouseOffset.x = (e.clientX - window.innerWidth / 2) / window.innerWidth / 2 * movementRange
  mouseOffset.y = (e.clientY - window.innerHeight / 2) / window.innerHeight / 2 * movementRange
}

function lerp(start, end, amount) {
  return start * (1 - amount) + end * amount
}

function loopDraw() {

  movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.05)
  movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.05)

  for (let i = loopingnords; i >= 1; i--) {
    draw(i * offsetDistance + currentOffset, i);
  }

  draw(offsetDistance, 1);

  currentOffset++;
  if (currentOffset >= offsetDistance) {
    currentOffset = 0;
  }

  const newTime = Math.floor((Date.now() - startTime) / 1000);


  requestAnimationFrame(loopDraw);
}

function startLooping() {
  requestAnimationFrame(loopDraw);
}

isWoke = function () {
  $('#woke').hide();
  $('#wrapper').show();
  localStorage.setItem('isWoke', true);
}

isRhea = function () {
  $('#woke').addClass('under');
  localStorage.setItem('isWoke', false);
}

goBack = function () {
    window.history.back();
}