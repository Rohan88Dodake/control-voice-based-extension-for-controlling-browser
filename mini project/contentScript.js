// Create the UI elements for the commands
const uiContainer = document.createElement("div");
uiContainer.style.position = "fixed";
uiContainer.style.bottom = "10px";
uiContainer.style.right = "10px";
uiContainer.style.backgroundColor = "white";
uiContainer.style.padding = "10px";
uiContainer.style.border = "1px solid black";
uiContainer.style.zIndex = "9999";

const startButton = document.createElement("button");
startButton.textContent = "Start";
uiContainer.appendChild(startButton);

const stopButton = document.createElement("button");
stopButton.textContent = "Stop";
stopButton.disabled = true;
uiContainer.appendChild(stopButton);

// Append the UI container to the document body
document.body.appendChild(uiContainer);

// Command grammar for browser control
const grammar =
  "#JSGF V1.0; grammar commands; public <command> = scroll up | scroll down | go to top | go to bottom | go back | go forward | open new tab | open website | close tab | reload page | stop loading | zoom in | zoom out | zoom reset | search | select all | copy | cut | paste | undo | redo;";

// Speech recognition setup
const recognition = new webkitSpeechRecognition();
const speechRecognitionList = new webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = true; // Enable interim results
recognition.maxAlternatives = 1;

// Start speech recognition
function startRecognition() {
  recognition.start();
  startButton.disabled = true;
  stopButton.disabled = false;
  console.log("Ready to receive a command.");
}

// Stop speech recognition
function stopRecognition() {
  recognition.stop();
  startButton.disabled = false;
  stopButton.disabled = true;
  console.log("Speech recognition stopped.");
}

// Speech recognition result handler
recognition.onresult = (event) => {
  const command = event.results[0][0].transcript;
  const isFinal = event.results[0].isFinal;

  if (isFinal) {
    console.log(`Final result received: ${command}`);
  } else {
    console.log(`Interim result received: ${command}`);
  }

  // Handle the command here
  handleCommand(command);
};

// Function to handle the recognized command
function handleCommand(command) {
  switch (command) {
    case "scroll up":
      // Add logic to scroll the page upward
      window.scrollBy(0, -window.innerHeight * 0.8);
      break;
    case "scroll down":
      // Add logic to scroll the page downward
      window.scrollBy(0, window.innerHeight * 0.8);
      break;
    case "go to top":
      // Add logic to go to the top of the page
      window.scrollTo(0, 0);
      break;
    case "go to bottom":
      // Add logic to go to the bottom of the page
      window.scrollTo(0, document.body.scrollHeight);
      break;
    case "go back":
      // Add logic to go back to the previous page
      window.history.back();
      break;
    case "go forward":
      // Add logic to go forward to the next page
      window.history.forward();
      break;
    case "open new tab":
      // Add logic to open a new browser tab
      window.open("", "_blank");
      break;
    case "open website":
      // Add logic to prompt user for a website and open it
      const website = prompt("Enter the website URL:");
      if (website) {
        window.open(website, "_blank");
      }
      break;
    case "close tab":
      // Add logic to close the current browser tab
      window.close();
      break;
    case "reload page":
      // Add logic to reload the current page
      location.reload();
      break;
    case "stop loading":
      // Add logic to stop the page from loading
      window.stop();
      break;
    case "zoom in":
      // Add logic to zoom in on the page
      document.body.style.zoom *= 1.2;
      break;
    case "zoom out":
      // Add logic to zoom out on the page
      document.body.style.zoom /= 1.2;
      break;
    case "zoom reset":
      // Add logic to reset the zoom level to 100%
      document.body.style.zoom = 1;
      break;
    case "search":
      // Add logic to perform a search using a search engine
      performSearch();
      break;
    case "select all":
      // Add logic to select all the text on the page
      document.execCommand("selectAll", false, null);
      break;
    case "copy":
      // Add logic to copy the selected text
      document.execCommand("copy", false, null);
      break;
    case "cut":
      // Add logic to cut the selected text
      document.execCommand("cut", false, null);
      break;
    case "paste":
      // Add logic to paste the copied or cut text
      document.execCommand("paste", false, null);
      break;
    case "undo":
      // Add logic to undo the last action
      document.execCommand("undo", false, null);
      break;
    case "redo":
      // Add logic to redo the previously undone action
      document.execCommand("redo", false, null);
      break;
    default:
      console.log("Command not recognized:", command);
  }
}

// Function to perform a search
function performSearch() {
  const searchQuery = prompt("Enter your search query:");
  if (searchQuery) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
  }
}

// Add click event listeners to the start and stop buttons
startButton.addEventListener("click", startRecognition);
stopButton.addEventListener("click", stopRecognition);

console.log("Content script injected successfully.");
