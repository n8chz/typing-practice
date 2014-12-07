
self.port.on("runTest", function (text) {
  document.getElementById("end").textContent = text;
  var input = document.getElementById("input");
  var mistakos = 0;
  input.focus();
  var startTime;
  input.addEventListener("keyup", function (event) {
    if (typeof startTime == "undefined") {
     console.log("first keystroke?");
     startTime = (new Date()).valueOf();
    }
    if (input.value == text) {
     var endTime = (new Date()).valueOf();
     var minutes = (endTime-startTime)/60000.0;
     var grossWords = text.length/5.0;
     var netWords = (text.length-mistakos)/5.0;
     var grossWPM = grossWords/minutes;
     var netWPM = netWords/minutes;
     alert(`gross WPM: ${grossWPM}\nnet WPM: ${netWPM}`);
    }
    else if (input.value == text.substring(0, input.value.length)) {
     input.style.backgroundColor = "white";
     document.getElementById("start").textContent = input.value;
     document.getElementById("end").textContent = text.substring(input.value.length);
    }
    else {
     input.style.backgroundColor = "pink";
     mistakos++;
    }
  });
});
