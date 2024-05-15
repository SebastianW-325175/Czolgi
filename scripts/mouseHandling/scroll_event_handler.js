const scrollEventHandler = {
	registerScroll: function(event){
		if(event.deltaY>0){
			rendererObject.camera.zoom /= 2;
			if(rendererObject.camera.zoom < 0.5) rendererObject.camera.zoom = 0.5;
		}
		if(event.deltaY<0){
			rendererObject.camera.zoom *= 2;
			if(rendererObject.camera.zoom > 4) rendererObject.camera.zoom = 4;
		}
	}
};
{
	document.addEventListener("wheel", function(event){scrollEventHandler.registerScroll(event);});
}