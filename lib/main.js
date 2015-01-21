var contextMenu = require ("sdk/context-menu");
var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");

contextMenu.Item({
  label: "Type selected text",
  image: data.url("icon.svg"),
  context: contextMenu.SelectionContext(),
  contentScriptFile: data.url("selection.js"),
  onMessage: function (text) {
   pageMod.PageMod({
     include: data.url("form.html"),
     contentScriptFile: data.url("script.js"),
     onAttach: function (worker) {
      worker.port.emit("runTest", text);
     }
   });
   tabs.open(data.url("form.html"));
  }
});



