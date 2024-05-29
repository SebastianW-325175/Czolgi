const hoverEventHandler = {
	lastCursorPosition: [],
	hoverableObjects: [],
	hoveredObjects: [],
	hoveredObjectsBuffer: [],
	addHoverableObject: function(object){
		this.hoverableObjects.push(object);
	},
	clear: function(){
		this.hoverableObjects = [];
	},
	registerMousePos: function(event){
		if(event.target.id == "gameWindow"){
			this.lastCursorPosition[0] = ((event.pageX-event.target.offsetLeft)/(event.target.width/320)).toFixed(0);
			this.lastCursorPosition[1] = ((event.pageY-event.target.offsetTop)/(event.target.width/320)).toFixed(0);

			this.hoverableObjects.forEach(function(object){
				if(cursorInRect(this.lastCursorPosition[0], this.lastCursorPosition[1], object.x, object.y, object.width, object.height)){
					if(!object.hovered){
						object.hoverEvent();
						object.hovered = true;
					}
				}else{
					if(object.hovered){
						object.unhoverEvent();
						object.hovered = false;
					}
				}
			})
		}
	}
};
{
	document.addEventListener("mousemove", function(event){hoverEventHandler.registerMousePos(event)});
}