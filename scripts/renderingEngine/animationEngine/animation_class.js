class animationObject {
	id;
	intervalID;
	parent;
	nextAnimation;
	endScript;
	delay;
	attributeName;
	interpolation;	//linear
	totalTime;
	currentTime;
	startValue;
	currentValue;
	endValue;
	constructor(id, parentObject, attributeName){
		this.id = id;
		this.parent = parentObject;
		this.attributeName = attributeName;
	};
	defineAnimation(startValue, endValue, interpolation, totalTime){
		this.startValue = startValue;
		this.currentValue = startValue;
		this.endValue = endValue;
		this.interpolation = interpolation;
		this.totalTime = totalTime;
		this.currentTime = 0;
	};
	chainAnimation(nextAnimation, delay){
		this.nextAnimation = nextAnimation;
		this.delay = delay*1000;
	};
	playAnimation(){
		switch(this.interpolation){
		case "linear":
			this.currentTime = 0;
			this.currentValue = this.startValue;
			this.intervalID = setInterval(function(thisAnimation){thisAnimation.linearFrame()}, (1000/60), this);
			break;
		default:
			break;
		}
	};
	linearFrame(){
		let step = undefined;

		if((this.totalTime-this.currentTime).toFixed(3) == 0){
			clearInterval(this.intervalID);
			this.currentValue = this.endValue;
			this.parent[this.attributeName] = this.currentValue;
			this.currentTime = this.totalTime;
			if(this.nextAnimation != undefined) setTimeout(function(thisAnimation){thisAnimation.nextAnimation.playAnimation()}, this.delay, this);
			if(this.endScript != undefined) this.endScript();
		}else{
			step = (this.endValue-this.startValue)/(this.totalTime/(1/60));
			this.currentValue += step;
			this.parent[this.attributeName] = this.currentValue;
			this.currentTime+=(1/60);
		}
	}
}