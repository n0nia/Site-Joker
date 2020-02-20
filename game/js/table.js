function creeazaRand(tipCelula, vector){
  var tr=document.createElement("tr");
  for(let x of vector){
    var celula=document.createElement(tipCelula);
    celula.innerHTML = x; 
    tr.appendChild(celula);
  }
  return tr;
}

function creeazaTabel(elevi){
  if(!players || players.length==0) return;
  
  var tabel=document.createElement("table");
  tabel.id="tab";
  var thead=document.createElement("thead");// TO DO - creare thead
  tabel.appendChild(thead); // TO DO - adugare thead in tabel
  var rand=creeazaRand("th",Object.keys(players[0]));
  console.log("Proprietati:"); console.log(Object.keys(players[0]));
  thead.appendChild(rand);
    
  
  var tbody=document.createElement("tbody");
  tabel.appendChild(tbody);
  for(let p of player){ 
    rand=creeazaRand("td",Object.values(player));
    console.log("Valori:");console.log(Object.values(player));
    tbody.appendChild(rand);
    rand.classList.add(player.name);//clasa sa fie egala cu numele
  
    //rand.onclick=function(e){//cand da click pe tr
      //TO DO corectati
      //rand.classList.toggle("selectat"); -> va fi selectat doar ultima val. a lui rand
      //this.classList.toggle("selectat");//metoda onclick a obiectului rand
      /*2*/
      //if(e.ctrlKey) {//exista si altkey, shiftkey
        //dc e apasat
        //this.remove();//sterge randul
        /*3*/
        //printLog("S-a sters un rand");
      //}

      //else {
        //this.classList.toggle("selectat");
      //}

    //}
  }
  return tabel;
}

function addInceput() {
  var tab = document.gtElementById("tab");
  var tbody = tab.getElementsByTagName("tbody")[0];//sa ia primul tbody 
  var rand = creeazaRand("td", player.score);
  tbody.insertBefore(rand, tbody.firstChild);
  
}

function addSfarsit() {
  var tab = document.getElementById("tab");
  var tbody = tab.getElementsByTagName("tbody")[0];//sa ia primul tbody 
  var rand = creeazaRand("td", Object.values(elevRandom()));
  tbody.appendChild(rand);
}

function sorteaza() {
  var tabel=document.getElementById("tab");
    var tbody=tabel.getElementsByTagName("tbody")[0];

    var v_tr = Array.prototype.slice.call(tbody.children);//.call apelez fct slice
    //slice = selecteaza dintre indici (a, b)
    //daca nu are merge de la inceeput pana la final
    //tbody.children este this-ul lui slice, apeleaza slice pe tbody.children
    //converteste la vector

    //comp in js este ca c
    //-1 cand a < b, 0 a = b, 1 a > b
    v_tr.sort(function(a, b){
      //a.children[1];//celula care contine numele
      return (a.children[1].innerHTML + a.children[0].innerHTML).localeCompare(
      b.children[1].innerHTML + b.children[0].innerHTML);
      //localeCompare e doar pt stringuri
    });

    for(tr of v_tr){
      tbody.appendChild(tr);
    }
}

/*const isStorage = 'undefined' !== typeof localStorage;//check whethet localStorage is available

if(isStorage && localStorage.getItem('socres')) {
  player.score = localStorage.getItem('scores').split(',');
}

function ScoreRecord(name, score) {
    this.name = name;
    this.score = score;
}

function getHighScoreTable() {
    var scoreTable = new Array();
    // console.log("doc cookie: " + document.cookie);
    for(var i=0; i<10; i++) {
        var cookieName = "player" + i;
        // console.log("player i: " + cookieName);
        // var scoreRecord = getCookie(cookieName);
        var scoreRecord = localStorage.getItem(cookieName);
        if(scoreRecord == null) {
            // console.log("score record is null");
            break;
        } 
        var name = scoreRecord.split("~")[0];
        var score = scoreRecord.split("~")[1];
        // console.log("name: " + name);
        scoreTable.push(new ScoreRecord(name, score));
    }
    return scoreTable;
}
//
// This function stores the high score table to the cookies
//
function setHighScoreTable(table) {
    for (var i = 0; i < 10; i++) {
        // If i is more than the length of the high score table exit
        // from the for loop
        if (i >= table.length) break;

        // Contruct the cookie name
        var cookieName = "player" + i;
        var name = table[i].name;
        var score = table[i].score;

        // Store the ith record as a cookie using the cookie name
        localStorage.setItem(cookieName, name +"~"+score);
    }
}

function addHighScore(name, score) {
    var table = getHighScoreTable();
    // console.log("table length: " + table.length);

    for(var i=0; i<table.length; i++) {
        if(score >= table[i].score) {
            var record = new ScoreRecord(name, score);
            // console.log("splicing table");
            table.splice(i, 0, record);
            return table;
        }
    }
    if (table.length <= 10) {
        table.push(new ScoreRecord(name, score));
    }
    return table;
}

function setCookie(name, value, expires, path, domain, secure) { 
     var curCookie = name + "=" + escape(value) + 
     ((expires) ? "; expires=" + expires.toGMTString() : "") + 
     ((path) ? "; path=" + path : "") + 
     ((domain) ? "; domain=" + domain : "") + 
     ((secure) ? "; secure" : ""); 
     // console.log("curCookie: " + curCookie);
     document.cookie = curCookie; 
     // console.log("document cookie: " + document.cookie);
} 


function getCookie(name) { 
     var dc = document.cookie; 
     var prefix = name + "="; 
     var begin = dc.indexOf("; " + prefix); 
     if (begin == -1) { 
        begin = dc.indexOf(prefix); 
     if (begin != 0) return null; 
     } else begin += 2; 
     var end = document.cookie.indexOf(";", begin); 
     if (end == -1) end = dc.length; 
     return unescape(dc.substring(begin + prefix.length, end)); 
}

function showHighscore() {
    document.getElementById("startBtn").style.display = 'none';
    document.getElementById("settingsBtn").style.display = 'none';
    document.getElementById("highscoreBtn").style.display = 'none';

    document.getElementById("backBtn").style.display = 'inline';
    document.getElementById("backBtn").style.left = 250 + 'px';
    var table = getHighScoreTable();
    ctx.fillStyle = "white";
    ctx.fillRect(80, 170, width-160, height-300);
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("High Score", 320, 210);
    ctx.font = "15px Arial";
    for(var i=0; i<table.length; i++) {
        var name = table[i].name;
        var score = table[i].score;
        // console.log("name.length: " + name.length + ", score.length: " + score.length);
        var numSpaces = 35 - name.length - score.length;
        if(numSpaces + name.length + score.length != 35) console.log("not 35");
        var str = name+ whiteSpace(numSpaces) + score;
        if(str.length != 36) console.log("str len: " + str.length);
        ctx.fillText(name, 310, 240+i*20);
        ctx.fillText(score, 310+145, 240+i*20);
    }
}

function whiteSpace(num) {
    var sp = " ";
    for(var i=0; i<num ;i++) {
        sp += " ";
    }
    return sp;
}

/*document.addEventListener('DOMContentLoaded', () => {
  let elements = []
  let container = document.querySelector('#container')
  // Add each row to the array
  container.querySelectorAll('.row').forEach(el => elements.push(el))
  // Clear the container
  container.innerHTML = ''
  // Sort the array from highest to lowest
  elements.sort((a, b) => b.querySelector('.score').textContent - a.querySelector('.score').textContent)
  // Put the elements back into the container
  elements.forEach(e => container.appendChild(e))
})*/