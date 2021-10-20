// Read stored data
chrome.storage.sync.get("buttons", ({
  buttons
}) => {
  let buttonList = buttons;
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

  // document.getElementsByTagName("body")[0].style.width = `${50 * buttonList.length}px`;

  function buildButtons(buttonList) {
    page.innerHTML = "";
    for (let buttonElem of buttonList) {
      let button = document.createElement("button");
      button.textContent = `X${(Math.floor(buttonElem.speed/10)/10).toFixed(1)}`;
      button.style.backgroundColor = buttonElem.backgroundColor;

      // When the button is clicked, it is removed from the page
      button.addEventListener("click", (event) => {
        if (confirm("Deseja remover este botão?")) {
          let targetElem = event.target;
          let targetText = targetElem.textContent;

          //Update stored Buttons
          for (let i = 0; i < buttonList.length; i++) {
            if (buttonList[i].speed == buttonElem.speed) {
              buttonList.splice(i, 1);
              console.log(buttonList[i]);
              break;
            }
          }
          targetElem.remove();

          chrome.storage.sync.set({
            buttons: buttonList
          });
          // button.removeEventListener(event, arguments.callee);
        }

      });

      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#fc4903";
        button.textContent = "-";
      });
      button.addEventListener("mouseleave", () => {
        button.textContent = `X${(Math.floor(buttonElem.speed/10)/10).toFixed(1)}`;
        button.style.backgroundColor = buttonElem.backgroundColor;
      });
      page.appendChild(button);
    }
    if (buttonList.length < 6) {
      // document.getElementsByTagName("body")[0].style.width = `${50 * (buttonList.length + 1)}px`;
      let addButton = document.createElement("button");
      addButton.textContent = "+";
      addButton.style.backgroundColor = "#b3b3b3";
      addButton.addEventListener("click", () => {
        let inputForm = document.getElementById("inputForm");
        inputForm.style.display = "block";
      });

      page.appendChild(addButton);

    }
  }

  buildButtons(buttonList);


  let numberInput = document.getElementsByClassName("numberInput")[0];
  numberInput.addEventListener("input", () => {
    let number = numberInput.value;
    number = number.replace(/\D/g, "");
    number = number.replace(/(\d{3})\d/g, "$1");
    numberInput.value = number;
  });
  //Adding new button
  let confirmButton = document.getElementsByClassName("confirmButton")[0];
  confirmButton.addEventListener("click", () => {
    let speedValue = document.getElementsByClassName("numberInput")[0];
    let colorValue = document.getElementsByClassName("colorInput")[0];

    document.getElementById("inputForm").style.display = "none";

    buttonList.push({
      backgroundColor: colorValue.value,
      speed: parseInt(speedValue.value)
    });
    //Sort the array
    buttonList.sort(function (a, b) {
      return a.speed - b.speed;
    })
    //Update data
    chrome.storage.sync.set({
      buttons: buttonList
    });

  });

  //On data update rebuild buttons
  chrome.storage.onChanged.addListener(() => {
    buildButtons(buttonList);
  });
});