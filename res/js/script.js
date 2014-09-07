RASTERIZE = 0.2;
var runShawty = false;

function random(min, max) {
	var v = Math.floor((Math.random()*(max-min+1)) + min);
	// console.log(min, max, v);
	return v;
}

function Particle(spawnX, spawnY, deltaX, deltaY) {
	this.deletable = false;
	this.spawnX = spawnX;
	this.spawnY = spawnY;
	this.deltaX = deltaX;
	this.deltaY = deltaY;
	this.x = spawnX;
	this.y = spawnY;
	this.nowX = spawnX - this.deltaX;
	this.nowY = spawnY - this.deltaY;

	this.update = function (w, h) {
		this.spawnX = w;
		this.spawnY = random(5, h-5);
		this.x += this.deltaX;
		this.y += this.deltaY;
		if (this.x < -10 || this. y < -5 || this.y > h + 5) {

			this.x = this.spawnX;
			this.y = this.spawnY;
			this.nowX = this.spawnX;
			this.nowY = this.spawnY;	
			//add some random
		}
		this.y += random(-2,2)/2.0;
		this.x += random(-2, 2);
		if (this.y < 5 ) this.y = 5;
		if (this.y > h - 5) this.y = h - 5;
	}

	this.draw = function (CanvasContext, green) { //canvas
		//interpolation
		this.nowX = this.nowX + RASTERIZE*2 * (-this.nowX + this.x);
		this.nowY = this.nowY + RASTERIZE*2 * (-this.nowY + this.y);
		// console.log(this.x, this.y);
		if (green)
			CanvasContext.fillStyle = "#5da423";
		else
			CanvasContext.fillStyle = "#c60f13";

		CanvasContext.strokeStyle = "#222222";
		CanvasContext.beginPath();
		CanvasContext.arc(this.nowX,this.nowY, 5, 0, Math.PI*2);
		CanvasContext.fill();
	}
}
var particleContainer = [];
function particles(CanvasContext, w, h, green) {
	if (this.lastDate == undefined)
		this.lastDate = (new Date).getTime();
	if (random(1, 5) == 1 && runShawty) {
		if (particleContainer.length < 50)
			particleContainer.push(new Particle(w, random(5, h-5), -5, 0));
	}

	var now = (new Date()).getTime();
	if (now - this.lastDate > 1000/60.0) {
		lastDate = now;
		for (i = 0; i < particleContainer.length; i++) {
			particleContainer[i].update(w, h);
		}
	}
	// console.log(this.particleContainer);
	for (i = 0; i < particleContainer.length; i++) {
		particleContainer[i].draw(CanvasContext, green);
	}
}

var CanvasContext = undefined;
var CANVAS = undefined;
var resultLast = 0;
var running = false;
var lastTicks = 0;

function updateAnimation() {
	if (lastTicks == ticks.ticks)
		requestAnimationFrame(engine);
	lastTicks = ticks.ticks;
}

function engine() {
	ticks.ticks++;
	animationTick();
	requestAnimationFrame(engine);
}

function animationTick() {
	if (runShawty) {
		// console.log(this.test);
		if (CANVAS == undefined)
			CANVAS = document.getElementById('timer');
		if (CANVAS != undefined) { 

			var total, now, type;

			total = timerData.endTime - timerData.startTime;
			now = timerData.endTime - timerData.nowTime;
			type = (timerData.doneCount-(timerData.done?1:0))%2;

			if (total == 0) total = 1;
			if (now == 0) now = 1;


			// console.log(total, now);

			// resize
			CANVAS.width = CANVAS.offsetWidth;
			CANVAS.height = CANVAS.offsetHeight;
			// width, height, context
			var w = CANVAS.width, h = CANVAS.height;
			if (w < 10) w = 10;
			if (h < 10) h = 10;
			if (CanvasContext == undefined)
				CanvasContext = CANVAS.getContext('2d');


			// drawing
			CanvasContext.fillStyle="white";
			CanvasContext.fillRect(0,0, w, h);		
			
			// c.beginPath();
			// c.arc(w/2, h/2, h/2, 0, 2 * Math.PI, false);
			// c.fillStyle = "green";
			// c.fill();
			// c.endPath();
			var result = resultLast + RASTERIZE * (-resultLast + w * (1 - now/total));


			//particles
			particles(CanvasContext, w, h, type==1);
			

			if (type == 1) {
				CanvasContext.fillStyle="#5da423";
				CanvasContext.strokeStyle="#5da423";
			} else {
				CanvasContext.fillStyle="#c60f13";
				CanvasContext.strokeStyle="#c60f13";
			}
			CanvasContext.fillRect(0,0, result, h);

			CanvasContext.font = "bold 20px sans-serif";
			CanvasContext.fillStyle="black";
			CanvasContext.textAlign = "center";
			var d = new Date(total - (result/w)*total);
			var m = d.getMinutes().toString();
			if (m.length == 1) m = "0" + m.toString();
			var s = d.getSeconds().toString();
			if (s.length == 1) s = "0" + s.toString();

			CanvasContext.fillText(m+"m "+s+"s", w/2,h/1.5);

			resultLast = result;
		} else {

		}
	}
}
engine();
