var app = angular.module("pomodo.services", []);

app.service('ServiceTimer', function($interval, $rootScope, $timeout){
	var counter = {
		exists: false,
		interval: undefined
	};



	function update() {
		if (!runShawty)
			return;
		updateAnimation();
		timerData.nowTime = new Date().getTime();
		if (timerData.nowTime > timerData.endTime) {
			stop();
			start();
		}
		// $rootScope.$broadcast('timerupdate');
	}

	function calculateTime() {
		var time = 25; //25 minutes work
		if (!timerData.work) {
			time = 5; //5 minutes break
			
			playSound("break");
		} else {
			
			playSound("start");
		}
		if (!timerData.work && (timerData.doneCount+1)%8==0)
			time = 25; //25 minutes break
		timerData.startTime = new Date().getTime();
		timerData.nowTime = timerData.startTime;
		timerData.endTime = new Date(timerData.startTime + time*60000).getTime();
	}
	function start() {
		// console.log(particleContainer);
		particleContainer = [];
		timerData.started = true;
		timerData.paused = false;
		timerData.done = false;
		
		calculateTime();
			
		if (counter.exists == false)
			counter.interval = $interval(update, 100);
		counter.exists = true;

		if (!runShawty) {
			runShawty = true;
			
		}
	}
	var pauseTimer = 0;
	var pauseTimerStart = 0;


	function pause() {
		/*
			startTime
			nowTime
			endTime
		 */
		//togglable! 
		if (!counter.exists) {
			return;
		}

		playSound("pause");

		runShawty = !runShawty;
		if (runShawty) {
			timerData.paused = false;
			timerData.nowTime = (new Date()).getTime();
			timerData.endTime = timerData.nowTime + pauseTimer;
			timerData.startTime = timerData.nowTime - pauseTimerStart;
			
		} else {
			timerData.paused = true;
			pauseTimer = timerData.endTime - timerData.nowTime;
			pauseTimerStart = timerData.nowTime - timerData.startTime;
		}
		// console.log("I should pause");

	}

	function stop() {
		if (!runShawty) {
			runShawty = true;
			
			timerData.paused = false;
		}
		if (counter.exists) {
			playSound("stop");
			timerData.doneCount++;
			counter.exists = false;
			$interval.cancel(counter.interval);
			timerData.started = false;
			timerData.done = true;
			timerData.work = !timerData.work;
			timerData.nowTime = timerData.endTime;
		}
	}
	this.start = start;
	this.stop = stop;
	this.pause = pause;
});
