const objectiveLibrary = {
	moveAround: function(){
		const moveUpKey = controlsMapping.goForwards;
		const moveDownKey = controlsMapping.goBackwards;
		const moveLeftKey = controlsMapping.goLeft;
		const moveRightKey = controlsMapping.goRight;

		objectiveHandler.broadcast("Use "+moveUpKey+moveDownKey+moveLeftKey+moveRightKey+" to move around!");
		objectiveHandler.setCondition(function(){
			return(
				keyMemoryMap.get(controlsMapping.goRight) ||
				keyMemoryMap.get(controlsMapping.goLeft) ||
				keyMemoryMap.get(controlsMapping.goBackwards) ||
				keyMemoryMap.get(controlsMapping.goForwards)
			)
		});
		objectiveHandler.conditionMet = function(){
			this.hideBroadcast();

			const interfaceLayer = rendererObject.getLayer("interfaceLayer");
			const objectiveBoxLayer = interfaceLayer.getSublayer("objectiveBoxLayer");
			const objectiveText = objectiveBoxLayer.getObject("objectiveText");
			const objectiveTextDisappear = objectiveText.getAnimation("disappear");
			objectiveTextDisappear.endScript = function(){
				objectiveLibrary.talkToTheSergeant();
			}
		}
	},
	talkToTheSergeant: function(){
		objectiveHandler.broadcast("Talk to the sergeant");
		objectiveHandler.setCondition(function(){
			return(objectiveHandler.dataRegistry.get("nearSergeant"));
		});
		objectiveHandler.conditionMet = function(){
			this.hideBroadcast();

			const interfaceLayer = rendererObject.getLayer("interfaceLayer");
			const objectiveBoxLayer = interfaceLayer.getSublayer("objectiveBoxLayer");
			const objectiveText = objectiveBoxLayer.getObject("objectiveText");
			const objectiveTextDisappear = objectiveText.getAnimation("disappear");
			objectiveTextDisappear.endScript = function(){
				objectiveLibrary.pressToInteract();
			}
		}
	},
	pressToInteract: function(){
		const interactKey = controlsMapping.interact;
		objectiveHandler.broadcast("Press "+interactKey+" to interact");
		objectiveHandler.setCondition(function(){
			return(objectiveHandler.dataRegistry.get("interactedSergeant"));
		});
		objectiveHandler.conditionMet = function(){
			this.hideBroadcast();

			dialogueHandler.showDialogue([
				"Sgt. Escoffier:",
				"Good morning soldier. As I'm sure you've already been told,",
				"this is your last training day. You did well, but now you are",
				"needed elsewhere."
			]);

			const interfaceLayer = rendererObject.getLayer("interfaceLayer");
			const objectiveBoxLayer = interfaceLayer.getSublayer("objectiveBoxLayer");
			const objectiveText = objectiveBoxLayer.getObject("objectiveText");
			const objectiveTextDisappear = objectiveText.getAnimation("disappear");
			objectiveTextDisappear.endScript = function(){};
			objectiveLibrary.sergeantDialogue1();
		}
	},
	sergeantDialogue1: function(){
		objectiveHandler.dataRegistry.set("interactedSergeant", false);

		objectiveHandler.setCondition(function(){
			return(objectiveHandler.dataRegistry.get("interactedSergeant"));
		});

		objectiveHandler.conditionMet = function(){
			dialogueHandler.showDialogue([
				"Sgt. Escoffier:",
				"Because of that, today is your final excercise. Get in the tank",
				"and show me that you can actually drive this thing. Come on.",
			]);
			objectiveLibrary.sergeantDialogue2();
		}
	},
	sergeantDialogue2: function(){
		objectiveHandler.dataRegistry.set("interactedSergeant", false);

		objectiveHandler.setCondition(function(){
			return(objectiveHandler.dataRegistry.get("interactedSergeant"));
		});

		objectiveHandler.conditionMet = function(){
			dialogueHandler.hideDialogue();

			const sergeant = gameEngine.getObject("sergeant")
			const tank = gameEngine.getObject("tank")
			sergeant.interact = function(){};
			sergeant.isInteractable = false;
			sergeant.sprite.getAnimation("unhighlight").playAnimation();
			gameEngine.controlledObject.updateControls = controlSchemeLibrary.humanCharacter;
			tank.isInteractable = true;
			tank.interact = function(){
				objectiveHandler.dataRegistry.set("interactedTank", true);
			}
			objectiveLibrary.getInTheTank();
		}
	},
	getInTheTank: function(){
		objectiveHandler.setCondition(function(){
			return(objectiveHandler.dataRegistry.get("interactedTank"));
		});
		objectiveHandler.conditionMet = function(){
			const characterLayer = rendererObject.getLayer("characterLayer");
			const driver = gameEngine.getObject("driver")
			const driverSprite = characterLayer.getObject("driverSprite");
			const driverIndex = gameEngine.gameObjects.indexOf(driver);
			const driverSpriteIndex = characterLayer.renderObjects.indexOf(driverSprite);
			const tank = gameEngine.getObject("tank");
			const turret = gameEngine.getObject("turret");
			gameEngine.gameObjects.splice(driverIndex, 1);
			characterLayer.renderObjects.splice(driverIndex, 1);

			gameEngine.controlledObject = tank;
			tank.attachedObjects.push(turret);
			tank.isInteractable = false;
			tank.sprite.getAnimation("unhighlight").playAnimation();
			tank.objectData = {
				parentObject: tank,
				leftTrack: 0,
				rightTrack: 0,
				state: "brake",
				rpm: 500,
				speed: 0,
				gear: 0,
				updateState: controlSchemeLibrary.tankCharacter.updateState,
				updatePosition: controlSchemeLibrary.tankCharacter.updatePosition,
				updateEngine: controlSchemeLibrary.tankCharacter.updateEngine,
				throttle: controlSchemeLibrary.tankCharacter.throttle,
				drive: controlSchemeLibrary.tankCharacter.drive,
				brake: controlSchemeLibrary.tankCharacter.brake,
				turn: controlSchemeLibrary.tankCharacter.turn,
			};
			
			dialogueHandler.showDialogue([
				"Sgt. Escoffier:",
				"Alright, remember, the FT is not a car. You are operating",
				"each track separately. To drive forward, push both levers",
				"forward."
			]);
			objectiveLibrary.instructions1();
		}
	},
	instructions1(){
		gameEngine.controlledObject.lastInteractState = true;
		objectiveHandler.setCondition(function(){
			return(gameEngine.controlledObject.lastInteractState == false);
		});
		objectiveHandler.conditionMet = function(){
			const leftTrackForward = controlsMapping.leftTrackForwards;
			const rightTrackForward = controlsMapping.rightTrackForwards;
			dialogueHandler.showDialogue([
				"HINT: Use ["+leftTrackForward+"] to propel the left track forward and ["+rightTrackForward+"] to propel",
				"the right track forward.",
			])
			objectiveLibrary.instructions2();
		}
	},
	instructions2(){
		gameEngine.controlledObject.lastInteractState = true;
		objectiveHandler.setCondition(function(){
			return(gameEngine.controlledObject.lastInteractState == false);
		});
		objectiveHandler.conditionMet = function(){
			gameEngine.controlledObject.updateControls = function(){
				this.objectData.updateState();
				this.objectData.updatePosition();
				this.objectData.updateEngine();
			};
			dialogueHandler.hideDialogue();
			objectiveLibrary.driveForwards();
		}
	},
	driveForwards(){
		objectiveHandler.setCondition(function(){
			return(gameEngine.controlledObject.position[0] > -50);
		});
		objectiveHandler.conditionMet = function(){
			gameEngine.controlledObject.updateControls = function(){
			};

			dialogueHandler.showDialogue([
				"Sgt. Escoffier:",
				"Just like that, yeah. Now try pulling the levers back",
				"to back your tank up to the same spot"
			]);

			objectiveLibrary.instructions3();
		}
	},
	instructions3(){
		gameEngine.controlledObject.lastInteractState = true;
		objectiveHandler.setCondition(function(){
			return(gameEngine.controlledObject.lastInteractState == false);
		});
		objectiveHandler.conditionMet = function(){
			const leftTrackBackward = controlsMapping.leftTrackReverse;
			const rightTrackBackward = controlsMapping.rightTrackReverse;
			dialogueHandler.showDialogue([
				"HINT: Use ["+leftTrackBackward+"] to propel the left track backwards and ["+rightTrackBackward+"] to",
				"propel the right track backwards.",
			])
			objectiveLibrary.instructions4();
		}
	},
	instructions4(){
		gameEngine.controlledObject.lastInteractState = true;
		objectiveHandler.setCondition(function(){
			return(gameEngine.controlledObject.lastInteractState == false);
		});
		objectiveHandler.conditionMet = function(){
			dialogueHandler.hideDialogue();
			gameEngine.controlledObject.updateControls = function(){
				this.objectData.updateState();
				this.objectData.updatePosition();
				this.objectData.updateEngine();
			};
			objectiveLibrary.driveBackwards();
		}
	},
	driveBackwards(){
		objectiveHandler.setCondition(function(){
			return(gameEngine.controlledObject.position[0] < -60);
		});
		objectiveHandler.conditionMet = function(){
			gameEngine.controlledObject.updateControls = function(){};
			dialogueHandler.showDialogue([
				"Sgt. Escoffier:",
				"Perfect. That's 90% of what you will be doing once you hit the",
				"front, but just in case you get yourself into a bad spot,",
				"let's try turning."
			]);
			objectiveLibrary.instructions5();
		}
	},
	instructions5(){
		gameEngine.controlledObject.lastInteractState = true;
		objectiveHandler.setCondition(function(){
			return(gameEngine.controlledObject.lastInteractState == false);
		});
		objectiveHandler.conditionMet = function(){
			dialogueHandler.showDialogue([
				"HINT: Running one track forward and one in reverse will let you",
				"turn your tank around on the spot"
			])
			objectiveLibrary.instructions6();
		}
	},
	instructions6(){
		gameEngine.controlledObject.lastInteractState = true;
		objectiveHandler.setCondition(function(){
			return(gameEngine.controlledObject.lastInteractState == false);
		});
		objectiveHandler.conditionMet = function(){
			dialogueHandler.hideDialogue();
			gameEngine.controlledObject.updateControls = function(){
				this.objectData.updateState();
				this.objectData.updatePosition();
				this.objectData.updateEngine();
			};
			objectiveLibrary.turnTank();
		}
	},
	turnTank(){
		objectiveHandler.setCondition(function(){
			return(Math.abs(gameEngine.controlledObject.rotation-90)>35);
		});
		objectiveHandler.conditionMet = function(){
			gameEngine.controlledObject.updateControls = function(){};
			dialogueHandler.showDialogue([
				"Sgt. Escoffier:",
				"Looks like your months of training paid off. Just one more",
				"thing now. It's unlikely that you will be shooting at anyone",
				"there, but just in case, I have to tell you this."
			]);
			objectiveLibrary.instructions7();
		}
	},
	instructions7(){
		gameEngine.controlledObject.lastInteractState = true;
		objectiveHandler.setCondition(function(){
			return(gameEngine.controlledObject.lastInteractState == false);
		});
		objectiveHandler.conditionMet = function(){
			dialogueHandler.showDialogue([
				"Sgt. Escoffier:",
				"On your left, there are two mannequins that we prepared.",
				"The one on the left is wearing a FRENCH uniform. You DO NOT",
				"SHOOT at the soldiers dressed in BLUE."
			])
			objectiveLibrary.instructions8();
		}
	},
	instructions8(){
		gameEngine.controlledObject.lastInteractState = true;
		objectiveHandler.setCondition(function(){
			return(gameEngine.controlledObject.lastInteractState == false);
		});
		objectiveHandler.conditionMet = function(){
			dialogueHandler.showDialogue([
				"Sgt. Escoffier:",
				"The one next to it is wearing a GERMAN uniform. The uniform",
				"of OUR ENEMY. If you see a German soldier and have a gun,",
				"SHOOT."
			])
			objectiveLibrary.instructions9();
		}
	},
	instructions9(){
		gameEngine.controlledObject.lastInteractState = true;
		objectiveHandler.setCondition(function(){
			return(gameEngine.controlledObject.lastInteractState == false);
		});
		objectiveHandler.conditionMet = function(){
			dialogueHandler.showDialogue([
				"Sgt. Escoffier:",
				"Well, that's the end of your training. Tomorrow you will be",
				"transported to the frontline, where you will meet your gunner.",
				"Good luck, private."
			])
			objectiveLibrary.instructions10();
		}
	},
	instructions10(){
		gameEngine.controlledObject.lastInteractState = true;
		objectiveHandler.setCondition(function(){
			return(gameEngine.controlledObject.lastInteractState == false);
		});
		objectiveHandler.conditionMet = function(){
			const overlayLayer = rendererObject.getLayer("overlayLayer");
			const overlayRect = overlayLayer.getObject("overlayRect");
			overlayRect.getAnimation("fadeIn").playAnimation();
		}
	},
	startGame(){
		objectiveHandler.setCondition(function(){
			return(keyMemoryMap.get(controlsMapping.interact));
		});
		objectiveHandler.conditionMet = function(){
			sceneMainGame.load();
		}
	},
	allTroopsDie(){
		objectiveHandler.setCondition(function(){
			let troops = false;
			for(let i = 0; i<9; i++){
				troops = gameEngine.getObject("frenchSoldier"+i);
				if(troops) {
					return !troops;
				}
			};
			if(troops == undefined) return true;
		});
		objectiveHandler.conditionMet = function(){
			sceneFailScreen.load();
		}
	},
	winGame(){
		objectiveHandler.setCondition(function(){
			return(true);
		});
		objectiveHandler.conditionMet = function(){
			sceneWinScreen.load();
			clearInterval(objectiveHandler.intervalID);
			objectiveHandler.intervalID = undefined;
		}
	},
	retry(){
		objectiveHandler.setCondition(function(){
			return(keyMemoryMap.get(controlsMapping.interact));
		});
		objectiveHandler.conditionMet = function(){
			sceneMainGame.load();
		}
	},
}