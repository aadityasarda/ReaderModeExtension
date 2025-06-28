console.log("🚀 content.js is running!");


function activateReaderMode() {
  if (typeof Readability !== "undefined") {
    console.log("Readability is loaded successfully.");

    const documentClone = document.cloneNode(true);
    const article = new Readability(documentClone).parse();

    if (article) {
      console.log("Extracted Article:", article);

      
      document.body.innerHTML = `
        <style>
        
          body {
            background: #fafafa;
            margin: 0;
            padding: 0;
            font-family: "Georgia", "Times New Roman", Times, serif;
            font-size: 18px;
            line-height: 1.8;
            color: #333;
          }
          #reader-mode-container {
            max-width: 800px;
            margin: 50px auto;
            padding: 30px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          #toolbar {
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: center;
            background: #f5f5f5;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          #toolbar label {
            font-size: 14px;
            color: #333;
          }
          #toolbar select,
          #toolbar input {
            margin-left: 5px;
            padding: 4px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
          }
          #toolbar button {
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            background: #007bff;
            color: white;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.3s ease;
          }
          #toolbar button:hover {
            background: #0056b3;
          }
          
          #reader-mode-container header {
            margin-bottom: 20px;
          }
          #reader-mode-container header h1 {
            font-size: 2.5em;
            margin-bottom: 0.4em;
          }
          #reader-mode-container header .article-meta {
            color: #888;
            font-size: 0.9em;
          }
          
          #reader-mode-container article {
            margin-bottom: 1.2em;
          }
          #reader-mode-container article h2 {
            font-size: 2em;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-weight: bold;
          }
          #reader-mode-container article h3 {
            font-size: 1.6em;
            margin-top: 1.2em;
            margin-bottom: 0.5em;
            font-weight: bold;
          }
          #reader-mode-container article h4 {
            font-size: 1.4em;
            margin-top: 1em;
            margin-bottom: 0.5em;
            font-weight: bold;
          }
          #reader-mode-container article p {
            margin-bottom: 1.2em;
          }
          #reader-mode-container article ul,
          #reader-mode-container article ol {
            margin: 1em 2em;
          }
          #reader-mode-container article li {
            margin-bottom: 0.5em;
          }
          #reader-mode-container article blockquote {
            margin: 1em 2em;
            padding-left: 1em;
            border-left: 4px solid #ccc;
            color: #666;
            font-style: italic;
          }
          #reader-mode-container article pre,
          #reader-mode-container article code {
            font-family: "Courier New", Courier, monospace;
            background: #f0f0f0;
            padding: 2px 4px;
            border-radius: 4px;
          }
          #reader-mode-container article img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 10px auto;
          }
          .highlight {
            background-color: yellow;
          }
          .note {
            background-color: #e0f7fa;
            border-bottom: 1px dashed #00796b;
            cursor: pointer;
          }
        </style>

        <div id="reader-mode-container">
          <div id="toolbar">
            <label>
              Font Family:
              <select id="font-family-selector">
                <option value='"Georgia", "Times New Roman", Times, serif'>Serif</option>
                <option value='Arial, sans-serif'>Sans-serif</option>
                <option value='"Courier New", Courier, monospace'>Monospace</option>
                <option value='"Dancing Script", cursive'>Dancing Script</option>
                <option value='"Great Vibes", cursive'>Great Vibes</option>
                <option value='"Pacifico", cursive'>Pacifico</option>
                <option value='"Merriweather", serif'>Merriweather</option>
              </select>
            </label>
            <label>
              Font Size:
              <input type="number" id="font-size-input" value="18" min="10" max="36"> px
            </label>
            <button id="highlight-btn">Highlight</button>
            <button id="add-note-btn">Add Note</button>
          </div>
          <header>
            <h1>${article.title}</h1>
            <div class="article-meta">Simplified view</div>
          </header>
          <article id="article-content" contenteditable="true">
            ${article.content}
          </article>
        </div>
      `;

      const fontFamilySelector = document.getElementById("font-family-selector");
      fontFamilySelector.addEventListener("change", (e) => {
        const newFont = e.target.value;
        document.getElementById("article-content").style.fontFamily = newFont;
      });

      
      const fontSizeInput = document.getElementById("font-size-input");
      fontSizeInput.addEventListener("change", (e) => {
        const newSize = e.target.value + "px";
        document.getElementById("article-content").style.fontSize = newSize;
      });

      
      document.getElementById("highlight-btn").addEventListener("click", () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          if (!range.collapsed && document.getElementById("article-content").contains(range.commonAncestorContainer)) {
            try {
              const highlightSpan = document.createElement("span");
              highlightSpan.className = "highlight";
              range.surroundContents(highlightSpan);
              selection.removeAllRanges();
            } catch (e) {
              alert("Unable to highlight the selected text. Please try selecting a smaller portion.");
            }
          } else {
            alert("Please select some text within the article to highlight.");
          }
        } else {
          alert("No text selected. Please select the text you want to highlight.");
        }
      });

      
      document.getElementById("add-note-btn").addEventListener("click", () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          if (!range.collapsed && document.getElementById("article-content").contains(range.commonAncestorContainer)) {
            const noteText = prompt("Enter your note:");
            if (noteText) {
              try {
                const noteSpan = document.createElement("span");
                noteSpan.className = "note";
                noteSpan.title = noteText;
                range.surroundContents(noteSpan);
                selection.removeAllRanges();
              } catch (e) {
                alert("Unable to add note to the selected text. Please try selecting a smaller portion.");
              }
            }
          } else {
            alert("Please select some text within the article to add a note.");
          }
        } else {
          alert("No text selected. Please select the text where you want to add a note.");
        }
      });
    } else {
      console.error("Failed to parse readable content.");
    }
  } else {
    console.error("Readability is still undefined!");
  }
}

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
