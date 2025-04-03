document.getElementById("activateReaderMode").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    // Only send message if it's an http(s) URL (avoid chrome://, etc.)
    if (!tab || !/^https?:/.test(tab.url)) {
      console.error("Cannot activate reader mode on this page.");
      return;
    }
    chrome.tabs.sendMessage(tab.id, { action: "activateReader" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError.message);
      } else {
        console.log(response?.status || "No response received");
      }
    });
  });
});

document.getElementById("hideDistractions").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || !/^https?:/.test(tab.url)) {
      console.error("Hide distractions cannot be activated on this page.");
      return;
    }
    chrome.tabs.sendMessage(tab.id, { action: "hideDistractions" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError.message);
      } else {
        console.log(response?.status || "No response received");
      }
    });
  });
});

document.getElementById("savePage").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || !/^https?:/.test(tab.url)) {
      console.error("Save page cannot be activated on this page.");
      return;
    }
    chrome.tabs.sendMessage(tab.id, { action: "saveUndistractedPage" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError.message);
      } else {
        console.log(response?.status || "No response received");
      }
    });
  });
});
