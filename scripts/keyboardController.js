const keyboardMapping = {
	leftTrackForwards: "q",
	leftTrackReverse: "a",
	rightTrackForwards: "e",
	rightTrackReverse: "d",
}

const keyboardController = {
	keyDownEvent: function(event) {
		switch(event.key) {
		case keyboardMapping.leftTrackForwards:
			if(event.type == "keydown") tank.leftTrack = 1;
			if(event.type == "keyup") tank.leftTrack = 0;
			break;
		case keyboardMapping.leftTrackReverse:
			if(event.type == "keydown") tank.leftTrack = -1;
			if(event.type == "keyup") tank.leftTrack = 0;
			break;
		case keyboardMapping.rightTrackForwards:
			if(event.type == "keydown") tank.rightTrack = 1;
			if(event.type == "keyup") tank.rightTrack =0;
			break;
		case keyboardMapping.rightTrackReverse:
			if(event.type == "keydown") tank.rightTrack = -1;
			if(event.type == "keyup") tank.rightTrack = 0;
			break;
		}
		console.log("Left track = "+tank.leftTrack+"\nRight track = "+tank.rightTrack);
	}
}
document.addEventListener("keydown", keyboardController.keyDownEvent);
document.addEventListener("keyup", keyboardController.keyDownEvent);