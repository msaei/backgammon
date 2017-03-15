function roomClicked(roomId){
	var startRoom = roomId;
	var hop = (activeDie == 'die1' ? die1 : die2);
	var destRoom = roomId + player*hop;

	if (moveIsPossible(startRoom, destRoom)) {
		takePicOfElements();
		var hitHappened = false;
		// check if bearing off happened
		if ( destRoom < 1 || destRoom > 24){
			if (player == 1) {
				//remove a red checker from start point
				removeCheckerFrom('red', startRoom);
				//add a red off checker to red home
				addCheckerToHome('red');
			} else {
				//remove a blue checker from start point
				removeCheckerFrom('blue', startRoom);
				//add a blue off checker to blue home
				addCheckerToHome('blue');
			}

		} else {
		
		if(rooms[destRoom] * player == -1) {
			//hit happend

			hitHappened = true;
			if (player == 1 ){
				//remove blue checker from the destination room
				//add a ble checker to topbar (blue checkers bar)
				removeCheckerFrom('blue', destRoom);
				addCheckerTo('blue', 25);
			}else {
				//remove red checker from the destination room
				//add a red checker to bottom bar (red checkers bar)
				removeCheckerFrom('red', destRoom);
				addCheckerTo('red', 0);
			}	
		}

		if (player == -1) {
			//remove a blue checker from start room
			//and add a blue checker to destination room
			removeCheckerFrom('blue', startRoom);
			addCheckerTo('blue', destRoom);

		} else {
			//remove a red checker from start room
			//and add a red checker to destination room
			removeCheckerFrom('red', startRoom);
			addCheckerTo('red', destRoom);
		}
		}
		dieUsed(activeDie);
		savePosInStack(startRoom, destRoom, hitHappened);

	}
}

 


function moveIsPossible(started, droped) {
	// check if right players checker moved
	if (rooms[started] * player > 0) {
		// check if any checkers is on bar 
		if((player == 1) && (rooms[0] != 0) && (started != 0)){return false;}
		if((player == -1) && (rooms[25] != 0) && (started != 25)){ return false;}
		// check if red trys to bear off
		if(droped < 1 && player == -1 && isAllHome(-1)){ 
			if (droped == 0) {
				return true;
			} else {
				return isLastChecker(started);
			}
		}
		// check if blue trys to bear off
		if(droped > 24 && player == 1 && isAllHome(1)){ 
			
			if (droped == 25) {
				return true;
			} else {
				return isLastChecker(started);
			}
		}

		// check if drop room is in board and not blocked width opponent
		if(rooms[droped] * player > -2 && droped > 0 && droped < 25) {return true;}	
	}
	return false;
}

function isAllHome(playerId) {
	checkerInHome = 0;
	if (playerId == 1){
		for(i=19; i<25; i++){
			if(rooms[i]>0){checkerInHome += rooms[i];}
		}
		checkerInHome += rooms[26]
	} else {
		for(i=1; i<7; i++){
				if(rooms[i]<0){checkerInHome += -rooms[i];}
		}
		checkerInHome += -rooms[27];
	}
	return (checkerInHome == 15);			
}

function dieUsed(dieName) {
	if (dieName == 'die1'){
		if(doubleDice) {
			if($('.die1').css('opacity') == 1){
				$('.die1').css('opacity',0.9);
			} else {
				picOfElements.die = die1;
				die1 = 0.1;
				setActiveDie('die2');
				$('.die1').css('opacity',0.5)
			}
		} else {
			picOfElements.die = die1;
			die1 = 0.1;
			setActiveDie('die2');
			$('.die1').css('opacity',0.5);
		}
	} else {
		if(doubleDice) {
			if($('.die2').css('opacity') == 1){
				$('.die2').css('opacity',0.9);
			} else {
				picOfElements.die = -die2;
				die2 = 0.1;
				setActiveDie('die1');
				$('.die2').css('opacity',0.5)
			}
		} else {
			picOfElements.die = -die2;
			die2 = 0.1;
			setActiveDie('die1');
			$('.die2').css('opacity',0.5);
		}
	}

	moveCounter++;

	if (player == -1) {
		$('#rightArea .undo').show();
		if(moveCounter == maxMoves) {
			$('#rightArea .confirm').show();
		}
		
	} else {
		$('#leftArea .undo').show();
		if(moveCounter == maxMoves) {
			$('#leftArea .confirm').show();
		}
	}		

}

function addCheckerTo (checkerColor, roomId) {

	var Element ;
	var roomName = '#room' + roomId ;
	if (roomId == 25) {roomName = '#topBar';}
	if (roomId == 0) {roomName = '#bottomBar';}

	if (checkerColor == 'red') {
		// add a red checker to room
		rooms[roomId] += 1;
		Element = '<div class="checker red"></div>';
		$(roomName).children().append(Element);
	} else {
		//add a blue checker to room
		rooms[roomId] -= 1;
		Element = '<div class="checker blue"></div>';
		$(roomName).children().append(Element);
	}

	$(roomName).children().children().draggable({
			revert: true ,
			stack: '.checker',
			helper: 'original'});
}

function removeCheckerFrom (checkerColor, roomId) {
	if (checkerColor == 'red') {
		rooms[roomId] -= 1;
	} else {
		rooms[roomId] += 1;
	}
	var roomName = '#room' + roomId ;
	if (roomId == 25) {roomName = '#topBar';}
	if (roomId == 0) {roomName = '#bottomBar';}
	$(roomName).children().find('div:eq(0)').remove();
}

function removeCheckerFromHome(checkerColor){
	var homeName;
	if (checkerColor == 'red') {
		rooms[26] += -1;
		homeName = '#redHome';
	} else {
		rooms[27] += 1;
		homeName = '#blueHome';
	}

	$(homeName).children().find('div:eq(0)').remove();

}

function addCheckerToHome(checkerColor) {
	var Element ;
	if (checkerColor == 'red') {
		rooms[26] += 1;
		Element = '<div class="homedChecker red"></div>';
		$('#redHome').children().append(Element);
	} else {
		rooms[27] += -1;
		Element = '<div class="homedChecker blue"></div>';
		$('#blueHome').children().append(Element);
	}

	checkGameStatus();
}

function checkGameStatus(){
	if (rooms[26] == 15){
		$("#gameStatusBoard").html('Red Won!');
	}
	if (rooms[27] == -15){
		$("#gameStatusBoard").html('Blue Won!');
	}
}