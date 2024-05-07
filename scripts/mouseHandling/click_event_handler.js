const clickEventHandler = {
	clickableObjects: [],
	addClickableObject: function(object){
		this.clickableObjects.push(object);
	},
	clear: function(){
		this.clickableObjects = [];
	},
	registerClickPos: function(event){
		if(event.target.id == "gameWindow"){
			let canvasX = ((event.pageX-event.target.offsetLeft)/(event.target.width/320)).toFixed(0);
			let canvasY = ((event.pageY-event.target.offsetTop)/(event.target.width/320)).toFixed(0);

			this.clickableObjects.forEach(function(object){
				if(cursorInRect(canvasX, canvasY, object.x, object.y, object.width, object.height)){
					object.clickEvent();
				}
			})
		}
	}
};
{
	document.addEventListener("click", function(event){clickEventHandler.registerClickPos(event)})
}