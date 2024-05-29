class gameObject {
	id;
	position = [0, 0];
	rotation = 0;
	collisionBox = [0, 0];
	attachedObjects = [];
	sprite;
	spriteOffset = [0, 0];
	lastInteractState = undefined;
	isInteractable;
	interact;
	highlighted;
	objectData;
	constructor(id){
		this.id = id;
	};
	updateSprite(){
		if(this.sprite != undefined){
			this.spriteOffset[0] = -this.sprite.width/2;
			this.spriteOffset[1] = -this.sprite.height/2;
			this.sprite.x = this.position[0]+this.spriteOffset[0];
			this.sprite.y = this.position[1]+this.spriteOffset[1];
			this.sprite.rotation = this.rotation;
		}
	};
	updateInteraction(){
		if(keyMemoryMap.get(controlsMapping.interact)){
			if(this.lastInteractState != undefined) this.lastInteractState = true;
			else this.lastInteractState = false;
		} else this.lastInteractState = undefined;
		gameEngine.gameObjects.forEach(function(object){
			if(object.isInteractable){
				const distanceX = Math.max(Math.abs(this.position[0]-object.position[0])-object.collisionBox[0]/2, 0);
				const distanceY = Math.max(Math.abs(this.position[1]-object.position[1])-object.collisionBox[1]/2, 0);
				const distanceTotal = Math.sqrt((distanceX*distanceX)+(distanceY*distanceY));
				if(distanceTotal < 10){
					if(!object.highlighted) object.sprite.getAnimation("highlight").playAnimation();
					object.highlighted = true;
					if(this.lastInteractState == false){
						object.interact();
						return;
					}
				} else if(object.highlighted){
					object.sprite.getAnimation("unhighlight").playAnimation();
					object.highlighted = false;
				}
			}
		}, this)
	};
	updateControls(){
	};
	ai(){
	};
	shoot(spread, range, reload){
		this.objectData.reload = reload;
		const characterLayer = rendererObject.getLayer("characterLayer");

		let i = 0;
		while(characterLayer.getObject("bullet"+i)){
			i++;
		};

		const spawnDistance = Math.sqrt(Math.pow(this.collisionBox[0]+3, 2)+Math.pow(this.collisionBox[0]+3, 2));
		const spawnDistanceY = Math.cos(this.rotation*(Math.PI/180))*spawnDistance;
		const spawnDistanceX = Math.sin(this.rotation*Math.PI/180)*spawnDistance;
		
		const bullet = gameEngine.newObject("bullet"+i);
		const bulletSprite = characterLayer.newObject("bulletSprite"+i, "img");
		bulletSprite.defineImg("./assets/bullet.png", 0, 0);
		bullet.sprite = bulletSprite;
		bullet.position = [this.position[0]+spawnDistanceX, this.position[1]-spawnDistanceY];
		bullet.collisionBox = [2, 2];
		bullet.rotation = this.rotation+((Math.random()-0.5)*2*spread);
		bullet.objectData = {
			parentObject: bullet,
			rangeLeft: range
		}
		bullet.ai = controlSchemeLibrary.bulletAi;
	};
	damage(){

	};
	testCollision(){
		let returnValue = undefined;
		gameEngine.gameObjects.forEach(function(object){
			if(
				object.id!=this.id &&
				!this.attachedObjects.includes(object) &&
				this.position[0]-(this.collisionBox[0]/2) < object.position[0]+(object.collisionBox[0]/2) &&
				this.position[0]+(this.collisionBox[0]/2) > object.position[0]-(object.collisionBox[0]/2) &&
				this.position[1]-(this.collisionBox[1]/2) < object.position[1]+(object.collisionBox[1]/2) &&
				this.position[1]+(this.collisionBox[1]/2) > object.position[1]-(object.collisionBox[1]/2)
			){
				returnValue = object;
				return;
			}
		}, this)
		return returnValue;
	};
}