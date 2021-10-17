class Button{
    constructor(speed, backgroundColor){
        this.speed = speed;
        this.backgroundColor = backgroundColor;
    }
}

let buttons = [new Button(100, "#4287f5"), new Button(125, "#23afad"), new Button(150, "#35bd4c"),
 new Button(200, "#f5c242"), new Button(250, "#f57b42")/*, new Button(300, "#eb4034")*/]; 


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ buttons: buttons });
});