// background.js

// Add an event listener for the extension's icon click
chrome.browserAction.onClicked.addListener(function(tab) {
  // Open a new tab and load the HTML file
  chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
});