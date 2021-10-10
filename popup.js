// Initialize button with user's preferred color
let page = document.getElementById("buttonDiv");

let buttons = [100, 150, 200, 250, 300];

function handleButtonClick(event){
  
}

function buildButtons(buttons){
  for(let buttonElem of buttons){
    let button = document.createElement("button");
    button.setAttribute("class", `X${button}`);
    button.addEventListener("click", handleButtonClick);
    page.appendChild(button);
  }
}

// When the button is clicked, inject respective speed change function into current page
buttonX100.addEventListener("click", async () => {
  // console.log("extensao") ;
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    function: setPlaybackRate100,
  });
});
buttonX150.addEventListener("click", async () => {
  // console.log("extensao") ;
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    function: setPlaybackRate150,
  });
});
buttonX200.addEventListener("click", async () => {
  // console.log("extensao") ;
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    function: setPlaybackRate200,
  });
});
buttonX250.addEventListener("click", async () => {
  // console.log("extensao") ;
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    function: setPlaybackRate250,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPlaybackRate100() {
  function setSpeed(media, speed) {
    if (media.length != 0) {
      for (var i = 0; i < media.length; i++) {
        if (media[i] != undefined) {
          media[i].playbackRate = speed;
        }
      }

    }
  }
  let video = document.getElementsByTagName("video");
  let audio = document.getElementsByTagName("audio");
  setSpeed(video, 1);
  setSpeed(audio, 1);

}
function setPlaybackRate150() {
  function setSpeed(media, speed) {
    if (media.length != 0) {
      for (var i = 0; i < media.length; i++) {
        if (media[i] != undefined) {
          media[i].playbackRate = speed;
        }
      }

    }
  }
  let video = document.getElementsByTagName("video");
  let audio = document.getElementsByTagName("audio");
  setSpeed(video, 1.5);
  setSpeed(audio, 1.5);

}

function setPlaybackRate200() {
  function setSpeed(media, speed) {
    if (media.length != 0) {
      for (var i = 0; i < media.length; i++) {
        if (media[i] != undefined) {
          media[i].playbackRate = speed;
        }
      }

    }
  }
  let video = document.getElementsByTagName("video");
  let audio = document.getElementsByTagName("audio");
  setSpeed(video, 2);
  setSpeed(audio, 2);

}

function setPlaybackRate250() {
  function setSpeed(media, speed) {
    if (media.length != 0) {
      for (var i = 0; i < media.length; i++) {
        if (media[i] != undefined) {
          media[i].playbackRate = speed;
        }
      }

    }
  }
  let video = document.getElementsByTagName("video");
  let audio = document.getElementsByTagName("audio");
  setSpeed(video, 2.5);
  setSpeed(audio, 2.5);

  // window.alert("Playback rate is 2.0x.");

}