console.log("🚀 hideDistractions.js is running!");

let isDistractionHidingMode = false;

function enableDistractionHiding() {
  console.log("👉 Distraction-hiding mode enabled. Hover over elements and click to remove them.");
  document.addEventListener("mouseover", highlightElement);
  document.addEventListener("mouseout", unhighlightElement);
  document.addEventListener("click", removeElementHandler, true);
}

function disableDistractionHiding() {
  console.log("✋ Distraction-hiding mode disabled.");
  document.removeEventListener("mouseover", highlightElement);
  document.removeEventListener("mouseout", unhighlightElement);
  document.removeEventListener("click", removeElementHandler, true);
}

function highlightElement(event) {
  // Apply a subtle blue glow on hover.
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

  // Animate the removal: slide up, scale down, and fade out.
  event.target.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  event.target.style.transform = "translateY(-20px) scale(0.5)";
  event.target.style.opacity = "0";

  // Remove the element after the animation completes.
  setTimeout(() => {
    event.target.remove();
  }, 700);
}

// The savePage function is no longer needed if you don't want to save the page.
// function savePage() {
//   const htmlContent = document.documentElement.outerHTML;
//   const blob = new Blob([htmlContent], { type: "text/html" });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "undistracted_page.html";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);

//   URL.revokeObjectURL(url);
// }

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
