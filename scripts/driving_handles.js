{
	const leftHandle = document.getElementById('leftHandle');
	const rightHandle = document.getElementById('rightHandle');

	function updateHandles(event) {
		switch(tank.leftTrack) {
		case 1:
			leftHandle.src = "./assets/driving_handles/handle_left_forward.png";
			break;
		case 0:
			leftHandle.src = "./assets/driving_handles/handle_left_neutral.png";
			break;
		default:
			leftHandle.src = "./assets/driving_handles/handle_left_reverse.png";
			break;
		}
		switch(tank.rightTrack) {
		case 1:
			rightHandle.src = "./assets/driving_handles/handle_right_forward.png";
			break;
		case 0:
			rightHandle.src = "./assets/driving_handles/handle_right_neutral.png";
			break;
		default:
			rightHandle.src = "./assets/driving_handles/handle_right_reverse.png";
			break;
		}
	};

	setInterval(updateHandles, 15)
}