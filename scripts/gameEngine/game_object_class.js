class gameObject {
	id;
	position = [0, 0];
	sprite;
	spriteOffset = [-3.5, -3.5];
	constructor(id){
		this.id = id;
	};
	updateSprite(){
		this.sprite.x = this.position[0]+this.spriteOffset[0];
		this.sprite.y = -this.position[1]+this.spriteOffset[1];
	};
	updateControls(){
	}
}