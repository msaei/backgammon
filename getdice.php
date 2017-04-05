<?php
 $die1 = rand(1,6);
 $die2 = rand(1,6);
 $myObj = new stdClass();
 $myObj->die1 = $die1;
 $myObj->die2 = $die2;

 $myJSON = json_encode($myObj);

 echo $myJSON;
	
?>