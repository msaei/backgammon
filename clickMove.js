function roomClicked(roomId){
	var startRoom = roomId;
	var destRoom = roomId + player*activeDie;

	if (moveIsAlowed(startRoom, destRoom)) {
		var hitHappened = false;
		
		
		if (player == -1) {
			removeCheckerFrom('blue', startRoom);
			addCheckerTo('blue', destRoom);
		} else {
			removeCheckerFrom('red', startRoom);
			addCheckerTo('red', destRoom);
		}
		//alert($(this).data('num'));
		//alert(ui.draggable.parent().parent().data('num'));
		//ui.draggable.remove();


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
			
			
		} else {
			
		}


		//regMove(startRoom, destRoom, hitHappened);
	}
}

function addCheckerTo (checkerColor, roomId) {

	var Element ;
	var roomName = '#room' + roomId ;
	if (roomId == 25) {roomName = 'topBar';}
	if (roomId == 0) {roomName = 'bottomBar';}

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
	$(roomName).children().find('div:eq(1)').remove();
}