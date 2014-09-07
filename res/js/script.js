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

	this.draw = function (c, green) { //canvas
		//interpolation
		this.nowX = this.nowX + RASTERIZE*2 * (-this.nowX + this.x);
		this.nowY = this.nowY + RASTERIZE*2 * (-this.nowY + this.y);
		// console.log(this.x, this.y);
		if (green)
			c.fillStyle = "#5da423";
		else
			c.fillStyle = "#c60f13";

		c.strokeStyle = "#222222";
		c.beginPath();
		c.arc(this.nowX,this.nowY, 5, 0, Math.PI*2);
		c.fill();
	}
}
var particleContainer = [];
function particles(c, w, h, green) {
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
		particleContainer[i].draw(c, green);
	}
}


function shawty() {
		if (runShawty == false) {
			return;
		}
	// console.log(this.test);
	var i = document.getElementById('timer');

	if (i != undefined) {

		var total, now, type;
		var data = JSON.parse(i.innerHTML);
		total = data[0];
		now = data[1];
		type = data[2]%2;
		if (total == 0) total = 1;
		if (now == 0) now = 1;


		// console.log(total, now);

		// resize
		i.width = i.offsetWidth;
		i.height = i.offsetHeight;
		// width, height, context
		var w = i.width, h = i.height;
		var c = i.getContext('2d');


		// drawing
		c.fillStyle="white";
		c.fillRect(0,0, w, h);		
		
		// c.beginPath();
		// c.arc(w/2, h/2, h/2, 0, 2 * Math.PI, false);
		// c.fillStyle = "green";
		// c.fill();
		// c.endPath();
		if (this.last == undefined) this.last = 0;
		var result = this.last + RASTERIZE * (-this.last + w * (1 - now/total));


		//particles
		particles(c, w, h, type==1);
		

		if (type == 1) {
			c.fillStyle="#5da423";
			c.strokeStyle="#5da423";
		} else {
			c.fillStyle="#c60f13";
			c.strokeStyle="#c60f13";
		}
		c.fillRect(0,0, result, h);

		c.font = "bold 20px sans-serif";
		c.fillStyle="black";
		c.textAlign = "center";
		var d = new Date(total - (result/w)*total);
		var m = d.getMinutes().toString();
		if (m.length == 1) m = "0" + m.toString();
		var s = d.getSeconds().toString();
		if (s.length == 1) s = "0" + s.toString();

		c.fillText(m+"m "+s+"s", w/2,h/1.5);

		this.last = result;
	} else {

	}

	requestAnimationFrame(shawty);
}
requestAnimationFrame(shawty);
