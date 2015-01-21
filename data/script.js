
function normalize(hmors) {
 // h/t Webjin http://stackoverflow.com/a/20351987/948073 :
 return ("0"+hmors).slice(-2);
}

var ContentScript = (function (){

    self.port.on("runTest", function (text) {
        var test = new Test(text);
        document.getElementById("input").addEventListener("keyup", function () {
            test.processKeystroke();
        });
    });

    function Test(text) {
        this.text = text;
        this.startTime = (new Date()).valueOf();
        this.inputText = "";
        document.getElementById("start").textContent = "";
        document.getElementById("current").textContent = text.substring(0, 1);
        document.getElementById("end").textContent = text.substring(1);
        document.getElementById("input").focus();
        this.matchStrings();
        /*
        document.getElementById("input").
         addEventListener("change", function () {
            this.processKeystroke();
        });
        */
    }

    Test.prototype = {

        processKeystroke: function () {
            var enteredText = document.getElementById("start").textContent
            this.inputText = document.getElementById("input").value;
            this.matchStrings();
        },

        matchStrings: function () {
            this.grossKeystrokes = this.inputText.length;
            var index = this.grossKeystrokes;
            var matchCandidate = this.inputText;
            // Test whether matchCandidate matches left part of text:
            while
             (matchCandidate != "" && this.text.split(matchCandidate)[0] != "")
            {
                matchCandidate = matchCandidate.slice(0, -1);
            }
            var start = matchCandidate;
            var error = this.text.substring(matchCandidate.length, index);
            var current = this.text.substring(index, index+1);
            var end = this.text.substring(index+1);
            document.getElementById("start").textContent = start;
            document.getElementById("error").textContent = error;
            document.getElementById("current").textContent = current;
            document.getElementById("end").textContent = end;
            this.updateStats();
        },

        updateStats: function () {
            var currentTime = (new Date()).valueOf();
            var elapsedTime = currentTime - this.startTime;
            this.netKeystrokes =
             document.getElementById("start").textContent.length;
            document.getElementById("strokes").textContent =
             this.grossKeystrokes;
            document.getElementById("mistakos").textContent =
             this.grossKeystrokes - this.netKeystrokes;
            document.getElementById("gross").textContent =
             (this.grossKeystrokes*12000/elapsedTime).toFixed(1);
            document.getElementById("net").textContent =
             (this.netKeystrokes*12000/elapsedTime).toFixed(1);
        }
        
    };
    
})();
