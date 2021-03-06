var isOpen = false;
var isRunning = false;
//GRAB THE OPEN/CLOSE BUTTON
$("#operate-button").on("click", function() {
  //IF THE BRIDGE IS CLOSED...
  console.log($("#bridge-title").text());
  if (isRunning === false && $("#bridge-title").text().trim() !== "Select Bridge") {
    isRunning = true;
  if (isOpen === false) {
    //FLIP THE BRIDGE STATE SO THE FUNCTION DOESN'T CALL TWICE
    isOpen = true;
    closeSwitches();
    //CHANGE THE CLASS TO TRANSITION
    $("#operate-button").toggleClass("transition released");
    //CHANGE THE TEXT TO OPENING
    $("#operate-button").text("OPENING");
    //RUN THE OPENING FUNCTION
    runOpeningSequence();
//IF THE BRIDGE IS OPEN..
  } else if (isOpen === true) {
    //FLIP THE BRIDGE STATE SO THE FUNCTION DOESN'T CALL TWICE
    isOpen = false;
    //TOGGLE THE TRANSITION CLASS
    $("#operate-button").toggleClass("transition");
    //CHANGE THE TEXT TO CLOSING
    $("#operate-button").text("CLOSING");
    openSwitches();
    runClosingSequence();
  } 
}
});




//SPAN LOCKS FUNCTION
function spanLocks() {
  //CHECK THAT LOCKS ARE DRIVEN
  if ($switch1.text().trim() === "SPAN LOCKS DRIVEN") {
    //UPDATE CLASS AND TEXT
    animateLockPull();
    $switch1.toggleClass("released");
    $switch1.text("SPAN LOCKS PULLED");
    //IF THE LOCKS ARE PULLED
  } else if ($switch1.text().trim() === "SPAN LOCKS PULLED") {
    //UPDATE CLASS AND TEXT
    animateLockDrive();
    $switch1.toggleClass("released");
    $switch1.text("SPAN LOCKS DRIVEN");
    //changeover operate button
    // $("#operate-button").toggleClass("transition released");
    // $("#operate-button").text("OPEN");
  }
}

//SPAN LOCKS FUNCTION
function tailLocks() {
  //CHECK THAT LOCKS ARE DRIVEN
  if ($switch2.text().trim() === "TAIL LOCKS DRIVEN") {
    //UPDATE TEXT AND CLASS
    // animateLockPull();
    animateTailLockPull();
    $switch2.toggleClass("released");
    $switch2.text("TAIL LOCKS PULLED");
  //CHECK THAT LOCKS ARE PULLED
  } else if ($switch2.text().trim() === "TAIL LOCKS PULLED") {
    //UPDATE TEXT AND CLASS
    animateTailLockDrive();
    $switch2.toggleClass("released");
    $switch2.text("TAIL LOCKS DRIVEN");
  }
}


//MOTOR BRAKES FUNCTION
function motorBrakes() {
  //CHECK THAT BRAKES ARE SET
  if ($switch3.text().trim() === "MOTOR BRAKES SET") {
    //UPDATE CLASS AND TEXT
    animateMotorBrakeRelease();
    $switch3.toggleClass("released");
    $switch3.text("MOTOR BRAKES RELEASED");
    //CHECK THAT BRAKES ARE RELEASED
  } else if ($switch3.text().trim() === "MOTOR BRAKES RELEASED") {
    //UPDATE CLASS AND TEXT
    animateMotorBrakeSet();
    $switch3.toggleClass("released");
    $switch3.text("MOTOR BRAKES SET");
  }
}

//MACHIENRY BRAKES FUNCTION
function machineryBrakes() {
  //CHECK THAT BRAKES ARE SET
  if ($switch4.text().trim() === "MACHINERY BRAKES SET") {
    //UPDATE CLASS AND TEXT
    animateMachineBrakeRelease();
    $switch4.toggleClass("released");
    $switch4.css("font-size","15px");
    $switch4.text("MACHINERY BRAKES RELEASED");
    //CHECK THAT BRAKES ARE RELEASED
  } else if ($switch4.text().trim() === "MACHINERY BRAKES RELEASED") {
    //UPDATE CLASS AND TEXT
    animateMachineBrakeSet();
    $switch4.toggleClass("released");
    $switch4.css("font-size","18px");
    $switch4.text("MACHINERY BRAKES SET");
  }
}

//SPAN MOTION FUNCTION
function spanMotion() {
  $switch5.toggleClass("released transition");
  $switch5.text("BRIDGE MOVING");
  if ((isOpen = true)) {
    animateBridgeOpen();
  } else {
    animateBridgeClose();
  }
}

//SPAN STOP FUNCTION

function spanStop() {
  if ($switch5.text().trim() === "BRIDGE MOVING" && isOpen === true) {
    // $switch5.toggleClass("released");
    $switch5.toggleClass("transition");
    $switch5.text("BRIDGE OPEN");
    $("#operate-button").text("CLOSE");
    $("#operate-button").toggleClass("transition");
  } else if ($switch5.text().trim() === "BRIDGE MOVING" && isOpen === false) {
    $switch5.toggleClass("released");
    $switch5.text("BRIDGE CLOSED");
    $("#operate-button").text("OPEN");
    $("#operate-button").toggleClass("transition");
  }
}


//OPENING FUNCTION
function runOpeningSequence() {
  setTimeout(function() {
    //SHOW SPAN LOCKS PULLING
    spanLocks();
    setTimeout(function() {
      //SHOW TAIL LOCKS PULLING
      tailLocks();
      setTimeout(function() {
        //SHOW MOTOR BRAKES RELEASING
        motorBrakes();
        setTimeout(function() {
          //SHOW MACHINERY BRAKES RELEASING
          machineryBrakes();
          setTimeout(function() {
            //BRIDGE OPENING ANIMATION PLAYS
            spanOpen();
            setTimeout(function() {
              //
              spanStop();
              openSwitches();
              isRunning = false;
              //
            }, 1250);
            //BRIDGE OPENING TIMER
          }, 1200);
          // MACHINERY BRAKES TIMER
        }, 1200);
        //MOTOR BRAKES TIMER
      }, 1300);
      // TAIL LOCKS TIMER
    },1350);
    //SPAN LOCKS TIMER
  }, 1000);
}
/* CLOSING SEQUENCE:
1. LOWER BRIDGE ANIMATION
2. REVERSE ORDER FUNCTIONS...
*/


function runClosingSequence() {
  setTimeout(function() {
    spanClose();
    setTimeout(function() {
      spanStop();
      setTimeout(function() {
        machineryBrakes();
        setTimeout(function() {
          motorBrakes();
          setTimeout(function() {
            tailLocks();
            setTimeout(function() {
              spanLocks();
              setTimeout(function(){
                closeSwitches();
                isRunning = false;
              },1700)
            }, 1700);
          }, 1350);
        }, 1250);
      }, 1250);
    }, 10);
  }, 120);
}




//FUNCTION TO OPEN SPAN

function spanOpen() {

    //update text to moving
    $switch5.text("BRIDGE MOVING");
    //toggle released and transition
    $switch5.toggleClass("released transition")
    //run animation
    animateBridgeOpen();
  
}


function spanClose() {
  
    //update text to moving
    $switch5.text("BRIDGE MOVING");
    //toggle released and transition
    $switch5.toggleClass("released transition")
    //run animation
    animateBridgeClose();
  
}

function spanStop() {
  if ($switch5.text().trim() === "BRIDGE MOVING" && isOpen === true) {
    // $switch5.toggleClass("released");
    $switch5.toggleClass("transition");
    $switch5.text("BRIDGE OPEN");
    $("#operate-button").text("CLOSE");
    $("#operate-button").toggleClass("transition");
  } else if ($switch5.text().trim() === "BRIDGE MOVING" && isOpen === false) {
    $switch5.toggleClass("transition");
    $switch5.text("BRIDGE CLOSED");
  }
}
