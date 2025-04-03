console.log("Reader Extension Installed");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Service worker is active");
});
