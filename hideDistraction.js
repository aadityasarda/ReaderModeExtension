console.log("hideDistractions.js is running!");

let isDistractionHidingMode = false;

function enableDistractionHiding() {
  console.log("Distraction-hiding mode enabled. Hover over elements and click to remove them.");
  document.addEventListener("mouseover", highlightElement);
  document.addEventListener("mouseout", unhighlightElement);
  document.addEventListener("click", removeElementHandler, true);
}

function disableDistractionHiding() {
  console.log("Distraction-hiding mode disabled.");
  document.removeEventListener("mouseover", highlightElement);
  document.removeEventListener("mouseout", unhighlightElement);
  document.removeEventListener("click", removeElementHandler, true);
}

function highlightElement(event) {
  event.target.style.transition = "box-shadow 0.3s ease";
  event.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.5)";
}

function unhighlightElement(event) {
  event.target.style.transition = "box-shadow 0.3s ease";
  event.target.style.boxShadow = "";
}

function removeElementHandler(event) {
  // Prevent default behavior and stop propagation so the element isn't acted upon twice.
  event.preventDefault();
  event.stopPropagation();

  event.target.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  event.target.style.transform = "translateY(-20px) scale(0.5)";
  event.target.style.opacity = "0";

  
  setTimeout(() => {
    event.target.remove();
  }, 700);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "hideDistractions") {
    if (!isDistractionHidingMode) {
      enableDistractionHiding();
      isDistractionHidingMode = true;
      sendResponse({ status: "Distraction-hiding mode enabled" });
    } else {
      disableDistractionHiding();
      isDistractionHidingMode = false;
      sendResponse({ status: "Distraction-hiding mode disabled" });
    }
  } else if (request.action === "saveUndistractedPage") {
    // Simply disable distraction mode without saving the page.
    if (isDistractionHidingMode) {
      disableDistractionHiding();
      isDistractionHidingMode = false;
    }
    sendResponse({ status: "Distraction-hiding mode disabled" });
  }
});
