console.log("🚀 content.js is running!");

// Called when the popup sends the 'activateReader' message
function activateReaderMode() {
  if (typeof Readability !== "undefined") {
    console.log("✅ Readability is loaded successfully.");

    const documentClone = document.cloneNode(true);
    const article = new Readability(documentClone).parse();

    if (article) {
      console.log("📝 Extracted Article:", article);

      document.body.innerHTML = `
        <style>
          /* 
            Global reset for reader mode
            Base font-size is set on body so all elements inherit it unless overridden.
          */
          body {
            background: #fafafa;
            margin: 0;
            padding: 0;
            font-family: "Georgia", "Times New Roman", Times, serif;
            font-size: 18px; /* Base font size for all body text */
            line-height: 1.8; /* Comfortable line height */
            color: #333;
          }

          /* Centered container for the article */
          #reader-mode-container {
            max-width: 800px;
            margin: 50px auto;
            padding: 30px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          /* Header styling */
          #reader-mode-container header {
            margin-bottom: 20px;
          }
          /* Main article title (h1) */
          #reader-mode-container header h1 {
            font-size: 2.5em; /* 2.5 x base font size */
            margin-bottom: 0.4em;
          }
          #reader-mode-container header .article-meta {
            color: #888;
            font-size: 0.9em;
          }

          /* Headings within the article content */
          #reader-mode-container article h2 {
            font-size: 2em; /* 2 x base font size */
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-weight: bold;
          }
          #reader-mode-container article h3 {
            font-size: 1.6em; /* 1.6 x base font size */
            margin-top: 1.2em;
            margin-bottom: 0.5em;
            font-weight: bold;
          }
          #reader-mode-container article h4 {
            font-size: 1.4em; /* 1.4 x base font size */
            margin-top: 1em;
            margin-bottom: 0.5em;
            font-weight: bold;
          }

          /* Paragraphs */
          #reader-mode-container article p {
            margin-bottom: 1.2em;
          }

          /* Lists */
          #reader-mode-container article ul,
          #reader-mode-container article ol {
            margin: 1em 2em;
          }
          #reader-mode-container article li {
            margin-bottom: 0.5em;
          }

          /* Blockquotes */
          #reader-mode-container article blockquote {
            margin: 1em 2em;
            padding-left: 1em;
            border-left: 4px solid #ccc;
            color: #666;
            font-style: italic;
          }

          /* Code blocks / inline code */
          #reader-mode-container article pre,
          #reader-mode-container article code {
            font-family: "Courier New", Courier, monospace;
            background: #f0f0f0;
            padding: 2px 4px;
            border-radius: 4px;
          }

          /* Responsive images */
          #reader-mode-container article img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 10px auto;
          }
        </style>

        <div id="reader-mode-container">
          <header>
            <h1>${article.title}</h1>
            <div class="article-meta">Simplified view</div>
          </header>
          <article>
            ${article.content}
          </article>
        </div>
      `;
    } else {
      console.error("⚠️ Failed to parse readable content.");
    }
  } else {
    console.error("❌ Readability is still undefined!");
  }
}

// Listen for messages from popup (reader.js)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "activateReader") {
    activateReaderMode();
    sendResponse({ status: "Reader mode activated" });
  } else if (request.action === "hideDistractions") {
    document.querySelectorAll("header, footer, aside, nav, .ads, .sidebar")
      .forEach(el => el.style.display = "none");
    sendResponse({ status: "Distractions hidden" });
  }
});
