window.onload = function() {
  alert("Welcome!\nHelp Joker escape!");
}

function enableStartButton() {
   document.getElementById("startBtn").disabled = true;
   document.getElementById("startBtn").style.display = 'none';
   document.getElementById("settingsBtn").style.display = 'none';
   document.getElementById("submitBtn").style.display = 'none';
   document.getElementById("backBtn").style.display = 'none';
   document.getElementById("highscoreBtn").style.display = 'none';
   document.getElementById("cheatcode").style.display = 'none';
   document.getElementById("checkBox").style.display = 'none';
   document.getElementById("level").style.display = 'none';
   document.getElementById("Range").style.display = 'none';
   document.getElementById("range").style.display = 'none';
   document.getElementById("Text").style.display = 'none';
   document.getElementById("text").style.display = 'none';
   document.getElementById("dayNight").style.display = 'none';
   document.getElementById("Select").style.display = 'none';
   document.getElementById("colorsEnemies").style.display = 'none';
   document.getElementById("Textarea").style.display = 'none';
   document.getElementById("submitBtn").style.display = 'none';
   document.getElementById("backBtn").style.display = 'none';

   document.getElementById("Potion").style.display = 'inline';

   var tex = document.getElementById("addCheckbox");
   tex.parentNode.removeChild(tex);

   tex = document.getElementById("addRadio");
   tex.parentNode.removeChild(tex);

   var tex = document.getElementById("addRange");
   tex.parentNode.removeChild(tex);

   var tex = document.getElementById("addText");
   tex.parentNode.removeChild(tex);

   var tex = document.getElementById("addTextarea");
   tex.parentNode.removeChild(tex);

   strt();
}


function settings() {
  document.getElementById("startBtn").style.display = 'none';
  document.getElementById("settingsBtn").style.display = 'none';
  document.getElementById("highscoreBtn").style.display = 'none';
  
  document.getElementById("cheatcode").style.display = 'inline';
  document.getElementById("checkBox").style.display = 'inline';
  document.getElementById("level").style.display = 'inline';
  document.getElementById("Range").style.display = 'inline';
  document.getElementById("range").style.display = 'inline';
  document.getElementById("Text").style.display = 'inline';
  document.getElementById("text").style.display = 'inline';
  document.getElementById("dayNight").style.display = 'inline';
  document.getElementById("Select").style.display = 'inline';
  document.getElementById("colorsEnemies").style.display = 'inline';
  document.getElementById("Textarea").style.display = 'inline';
  document.getElementById("submitBtn").style.display = 'inline';
  document.getElementById("backBtn").style.display = 'inline';

  if(!ok) {
    createCheckbox();
    createRadio();
    createRange();
    createText();
    createSelect();
    createTextarea();
    ok = 1;
  }
}

function showHighscore() {
  document.getElementById("startBtn").style.display = 'none';
  document.getElementById("settingsBtn").style.display = 'none';
  document.getElementById("highscoreBtn").style.display = 'none';

  creeazaTabel(player);

  document.getElementById("backBtn").style.display = 'inline';
  document.getElementById("backBtn").style.left = 150 + 'px';
}

function backButton() {
  document.getElementById("startBtn").style.display = 'inline';
  document.getElementById("settingsBtn").style.display = 'inline';
  document.getElementById("highscoreBtn").style.display = 'inline';

   document.getElementById("submitBtn").style.display = 'none';
   document.getElementById("backBtn").style.display = 'none';
   document.getElementById("highscoreBtn").style.display = 'none';
   document.getElementById("cheatcode").style.display = 'none';
   document.getElementById("checkBox").style.display = 'none';
   document.getElementById("level").style.display = 'none';
   document.getElementById("Range").style.display = 'none';
   document.getElementById("range").style.display = 'none';
   document.getElementById("Text").style.display = 'none';
   document.getElementById("text").style.display = 'none';
   document.getElementById("dayNight").style.display = 'none';
   document.getElementById("Select").style.display = 'none';
   document.getElementById("colorsEnemies").style.display = 'none';
   document.getElementById("Textarea").style.display = 'none';
   document.getElementById("submitBtn").style.display = 'none';
   document.getElementById("backBtn").style.display = 'none';

   /*var tex = document.getElementById("addCheckbox");
   tex.parentNode.removeChild(tex);

   tex = document.getElementById("addRadio");
   tex.parentNode.removeChild(tex);

   var tex = document.getElementById("addRange");
   tex.parentNode.removeChild(tex);

   var tex = document.getElementById("addText");
   tex.parentNode.removeChild(tex);

   var tex = document.getElementById("addTextarea");
   tex.parentNode.removeChild(tex);*/

   /*var elems = document.body.getElementsByTagName("row");
   for(let e of elems) {
      var child = elems.firstChild.firstChild;
      elems.removeChild(child);
   }*/

}