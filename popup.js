// Read stored data
chrome.storage.sync.get("buttons", ({buttons}) => {

  let page = document.getElementById("buttonDiv");
 
  function injectFunction(playbackSpeed) {
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
    // console.log(`Media speed set to X${playbackSpeed/100}.`);

    setSpeed(video, playbackSpeed / 100);
    setSpeed(audio, playbackSpeed / 100);
  }
  
  // let buttonList = [new Button(100), new Button(125), new Button(150), new Button(200), new Button(250), new Button(300)];
  document.getElementsByTagName("body")[0].style.width = `${50 * buttons.length}px`;

  function buildButtons(buttons) {
    for (let buttonElem of buttons) {
      let button = document.createElement("button");
      button.setAttribute("class", `X${buttonElem.speed}`);
      button.textContent = `X${(Math.floor(buttonElem.speed/10)/10).toFixed(1)}`;
      button.style.backgroundColor = buttonElem.backgroundColor;

      // When the button is clicked, inject respective speed change function into current page
      button.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true
        });

        chrome.scripting.executeScript({

          target: {
            tabId: tab.id,
            allFrames: true
          },
          function: injectFunction,
          args: [buttonElem.speed],
        });
      });
      page.appendChild(button);
    }
  }

  buildButtons(buttons);

});