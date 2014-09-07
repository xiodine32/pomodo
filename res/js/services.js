var app = angular.module("pomodo.services", []);

app.service('ServiceTimer', function($interval, $rootScope, $timeout){
	var counter = {
		exists: false,
		interval: undefined
	};



	function update() {
		if (!runShawty)
			return;
		timerData.nowTime = new Date().getTime();
		if (timerData.nowTime > timerData.endTime) {
			stop();
			$timeout(start,1000);
		}
		// $rootScope.$broadcast('timerupdate');
	}

	function calculateTime() {
		var time = 25; //25 minutes
		if (!timerData.work) {
			time = 5;
			
			playSound(soundBreak);
		} else {
			
			playSound(soundStart);
		}
		if (!timerData.work && (timerData.doneCount+1)%8==0)
			time = 25;
		timerData.endTime = new Date(timerData.startTime + time*60000).getTime();
		timerData.nowTime = timerData.startTime;
	}
	function start() {
		console.log(particleContainer);
		particleContainer = [];
		timerData.started = true;
		timerData.paused = false;
		timerData.done = false;
		timerData.startTime = new Date().getTime();
		calculateTime();
			
		if (counter.exists == false)
			counter.interval = $interval(update, 100);
		counter.exists = true;

		
		if (!runShawty) {
			runShawty = true;
			requestAnimationFrame(shawty);
		}
	}

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

		playSound(soundPause);

		runShawty = !runShawty;
		if (runShawty) {
			timerData.paused = false;
			timerData.nowTime = (new Date()).getTime();
			timerData.endTime = timerData.nowTime + this.timer;
			timerData.startTime = timerData.nowTime - this.timerStart;

			requestAnimationFrame(shawty);
		} else {
			timerData.paused = true;
			this.timer = timerData.endTime - timerData.nowTime;
			this.timerStart = timerData.nowTime - timerData.startTime;
		}
		console.log("I should pause");

	}

	function stop() {
		if (!runShawty) {
			runShawty = true;
			timerData.paused = false;
			requestAnimationFrame(shawty);
		}
		if (counter.exists) {
			playSound(soundStop);

			timerData.doneCount++;
			$interval.cancel(counter.interval);
			counter.exists = false;

			timerData.started = false;
			timerData.done = true;
			timerData.work = !timerData.work;
			timerData.nowTime = timerData.endTime;
			$timeout(function (){
				if (timerData.done)
					runShawty = false;
			},1000);
			
		}
	}
	this.start = start;
	this.stop = stop;
	this.pause = pause;
});
