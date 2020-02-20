function cheatCode() {  
    var checkBox = document.getElementById("myCheckbox");

    if(checkBox.checked == true)
      CHEAT = true;
    else
      CHEAT = false;
}

function createCheckbox() {
  var x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.id = "myCheckbox";
    document.getElementById("addCheckbox").appendChild(x);
}

 function check() {
    document.getElementById("myRadio").checked = true;
    hardLevel = true;
}

  function uncheck() {
    document.getElementById("myRadio").checked = false;
    hardLevel = false;
}

function createRadio() {
  var x = document.createElement("INPUT");
    x.setAttribute("type", "radio");
    x.id = "myRadio";
    document.getElementById("addRadio").appendChild(x);
}

function createRange() {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "range");
    x.id = "myRange"; 
    x.value = 3;
    x.max = 13;
    x.min = 0;
    document.getElementById("addRange").appendChild(x);
}

function createText() {
  var x = document.createElement("INPUT");
  x.setAttribute("type", "text");
  x.setAttribute("value", "Name");
  x.id = "myText";
  document.getElementById("addText").appendChild(x);
}

function inputRange() {
  var playerLives = document.getElementById("myRange").value;
  LIVES = playerLives;
}

function inputText() {
  var playerName = document.getElementById("myText").value.trim();
  NAME = playerName == "" ? "Anonymous" : playerName;
  //localStorage.setItem("arrayOfUsernames", NAME);
}

function createTextarea() {
  var x = document.createElement("TEXTAREA");
  var t = document.createTextNode("Choose between Slate, Maroon and Green");
  x.appendChild(t);
  x.id = "myTextarea";
  x.style.left = 150 + "px";
  document.getElementById("addTextarea").appendChild(x);
}

function Textarea() {
  var elem = document.getElementById("myTextarea").value;
  elem = elem.toLowerCase();

  if(elem === "slate")
    ENEMIESCOLOR = COLOR.SLATE;
  else if(elem === "maroon")
    ENEMIESCOLOR = COLOR.MAROON;
  else if(elem === "green")
    ENEMIESCOLOR = COLOR.GREEN;
}

function createSelect() {
  var x = document.getElementById("addSelect");
  //x.id = "mySelect";
  var option = document.createElement("option");
  x.options[x.options.length] = new Option('Night');
  x.options[x.options.length] = new Option('Day');
}

function Select() {
  var elem = document.getElementById("mySelect");
  MOOD = elem.options[elem.selectedIndex].value;
}

function initialize() {
      player   = {};
      monsters = [];
      treasure = [];
      cells    = [];
}

function bound(x, min, max) {
    return Math.max(min, Math.min(max, x));
}

div = document.getElementById("Potion");
div.style.position = "absolute";
div.style.left = "503px";
div.style.top = "375px";
div.style.width = "10px";
div.style.height = "10px";
div.style.background = "red";
div.style.color = "blue";

function overlap(x1, y1, w1, h1, x2, y2, w2, h2) {

    return !(((x1 + w1 - 1) < x2) ||
             ((x2 + w2 - 1) < x1) ||
             ((y1 + h1 - 1) < y2) ||
             ((y2 + h2 - 1) < y1))
}

function mousePos(event) {
  isDown = true;
  //clientX pt mouse
  //offset positin of a div, left position/top position
  offset = [div.offsetLeft - event.clientX,
            div.offsetTop - event.clientY];
   div.style.borderWidth = 100 + 'px';
  div.style.borderColor = "black";
}

function movePotion(event) {
  event.preventDefault();

  if(isDown) {
    mousePosition = {x: event.clientX,
                     y: event.clientY};

  div.style.left = (mousePosition.x + offset[0]) + 'px';
  div.style.top = (mousePosition.y + offset[1]) + 'px';

  }

 if(div.style.left === (player.x + 'px') && div.style.top === (player.y + 'px')) {
  document.getElementById("Potion").style.display = 'none';
  player.lives++;
 }
}
