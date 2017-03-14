function roomClicked(roomId){
	var startRoom = roomId;
	var hop = (activeDie == 'die1' ? die1 : die2);
	var destRoom = roomId + player*hop;

	if (moveIsPossible(startRoom, destRoom)) {
		var hitHappened = false;
		
		if(rooms[destRoom] * player == -1) {
			//hit happend

			hitHappened = true;
			if (player == 1 ){
				//remove checker from the destination room
				//add a checker to topbar (blue checkers bar)
				removeCheckerFrom('blue', destRoom);
				addCheckerTo('blue', 25);
			}else {
				//remove checker from the destination room
				//add a red checker to bottom bar (red checkers bar)
				removeCheckerFrom('red', destRoom);
				addCheckerTo('red', 0);
			}	
		}

		if (player == -1) {
			removeCheckerFrom('blue', startRoom);
			addCheckerTo('blue', destRoom);
		} else {
			removeCheckerFrom('red', startRoom);
			addCheckerTo('red', destRoom);
		}

		dieUsed(activeDie);

	}
}

 


function moveIsPossible(started, droped) {
	// check if right players checker moved
	if (rooms[started] * player > 0) {
		// check if die one number used
		if(started + die1 * player == droped ) {
			// check if drop room blocked width opponent
			if(rooms[droped] * player > -2) {
				return true;
			}
			
		}
		// check if die two number used
		if(started + die2 * player == droped) {
			// check if drop room blocked width opponent
			if(rooms[droped] * player > -2) {
				return true;
			}
		}
	}
	return false;
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

function removeCheckerFrom (checker, roomId) {
	if (checker = 'red') {
		rooms[roomId] -= 1;
	} else {
		rooms[roomId] += 1;
	}
	var roomName = '#room' + roomId ;
	$(roomName).children().find('div:eq(0)').remove();
}