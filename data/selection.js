self.on("click", function () {
  var selectionText = document.getSelection().toString();
  self.postMessage(selectionText.replace(/[^ -~]/g, "").replace(/\s{3,}/g, "  ")).trim();
});
