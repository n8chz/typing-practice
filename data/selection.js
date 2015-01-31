self.on("click", function () {
  var selectionText = document.getSelection().toString();
  console.log("before: "+JSON.stringify(selectionText));
  console.log("after replacing \\n: "+JSON.stringify(selectionText.replace(/\n/, " ")));
  self.postMessage(selectionText.replace(/\n/g, " ").replace(/[^ -~]/g, "").replace(/\s{3,}/, "  ").trim());
  // self.postMessage(selectionText.replace(/\n/, " ").replace(/[^ -~]/g, "").trim());
});
