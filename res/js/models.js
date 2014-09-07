var timerData = {
		started: false,
		done: false,
		startTime: 0,
		nowTime: 0,
		endTime: 0,
		work: true,
		doneCount: 0,
		paused: false
	};

var soundBreak = new Audio("res/sound/break.wav");
var soundStop = new Audio("res/sound/stop.wav");
var soundStart = new Audio("res/sound/start.wav");
var soundPause = new Audio("res/sound/pause.wav");

function playSound(sound) {
	var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
	if (iOS != true) {
		stopSounds();
		sound.play();
	}
}
function stopSounds() {
	soundStart.pause();
	soundStart.currentTime="0";
	soundStop.pause();
	soundStop.currentTime="0";
	soundBreak.pause();
	soundBreak.currentTime="0";
	soundPause.pause();
	soundPause.currentTime="0";
}
