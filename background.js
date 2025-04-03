console.log("Reader Extension Installed");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Service worker is active");
});

// Remove or comment out any code that injects content.js manually.
// We rely on the manifest’s "content_scripts" for injection.
