
function strt() { // module pattern
  var SECONDS = 0;
  var myVar = setInterval(myTimer, 10000);
  function myTimer() {
    SECONDS += 10;
    let text = SECONDS + " seconds passed";
    displayComment(text, "red", updateDiv);
  };

var myVar2 = setTimeout(myTimer2, 20000);
 function myTimer2() {
     MonstersLength++; 
     displayComment("New guardian appeared", "pink", updateDiv);  
  };

  if(MOOD === "Day")
    document.getElementById("canvas").style.backgroundColor = COLOR.LIGHTGREEN;
  else
    document.getElementById("canvas").style.backgroundColor = COLOR.DARKBLUE;

  //-------------------------------------------------------------------------
  // POLYFILLS
  //-------------------------------------------------------------------------
  
  //to ensure our rendering loop is as smooth as possible with a controlled
  //fixed timestep update loop
  if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || 
                                   window.mozRequestAnimationFrame    || 
                                   window.oRequestAnimationFrame      || 
                                   window.msRequestAnimationFrame     || 
                                   function(callback, element) {
                                     window.setTimeout(callback, 1000 / 60);
                                   }
  }

  //-------------------------------------------------------------------------
  // UTILITIES
  //-------------------------------------------------------------------------

  //window.performance - performance info about current document
  //performance.now() method returns a DOMHighResTimeStamp, measured in milliseconds
  function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }
  //.getTime - returns the number of milliseconds
  
  function get(url, onsuccess) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      //4 means the request has been completed
      //200 the request was made succesful
      if ((request.readyState == 4) && (request.status == 200))
        onsuccess(request);
    }
    request.open("GET", url, true);
    request.send();
  }


  //-------------------------------------------------------------------------
  // UPDATE LOOP
  //-------------------------------------------------------------------------


//ev.preventDefault - prevents the browser's default action
//e.g/ to stop the up/down from scrolling the page
function onkey(ev, key, down) {
    switch(key) {
      case KEY.LEFT:  player.left  = down; ev.preventDefault(); return false;
      case KEY.RIGHT: player.right = down; ev.preventDefault(); return false;
      case KEY.SPACE: player.jump  = down; ev.preventDefault(); return false;
      case KEY.PAUSE:  displayComment("LEFT/RIGHT to move, SPACE to jump, collect gold and jump on monsters.", "white", Instr);
                      ev.preventDefault(); return false;
    }
  }

  function update(dt) {
    updatePlayer(dt);
    updateMonsters(dt);
    checkTreasure();
  }

  function updatePlayer(dt) {
    updateEntity(player, dt);
  }

  function updateMonsters(dt) {
    var n, max;
    for(n = 0, max = monsters.length ; n < max ; n++)
      updateMonster(monsters[n], dt);
  }

  function updateMonster(monster, dt) {
    if (!monster.dead && monster.ok==1) {
      updateEntity(monster, dt);
      //detect any collision with the player
      if (overlap(player.x, player.y, TILE, TILE, monster.x, monster.y, TILE, TILE)) {
        if ((player.dy > 0) && (monster.y - player.y > TILE/2))
          killMonster(monster);
        else
          hitPlayer(player);
      }
    }
  }

  function checkTreasure() {
    var n, max, t;
    for(n = 0, max = treasure.length ; n < max ; n++) {
      t = treasure[n];
      if (!t.collected && overlap(player.x, player.y, TILE, TILE, t.x, t.y, TILE, TILE))
        collectTreasure(t);
    }
  }

  function killMonster(monster) {
    player.killed++;
    player.score += 20;
    monster.dead = true;
    displayComment("Killed a guardian!", "blue", updateDiv);
  }

  function hitPlayer(player) {
    if(!CHEAT) {
      AUDIOP.play();

      if(player.lives == 1) {
          players.push(player);

        PLAYING = false;
        var txt;
        if(confirm("Play again?"))
          reset();
        else {
          window.location.reload();
        }
      }
      else {
        player.x = player.start.x;
        player.y = player.start.y;
        player.dx = player.dy = 0;
        player.lives--;
        displayComment("Guardian got you!", "pink", updateDiv);
      }
    }
  }


  function collectTreasure(t) {
    AUDIOC.play();
    player.collected++;
    t.collected = true;
    player.score += 10;
    displayComment("Collected coins!", "yellow", updateDiv);
  }

  function updateEntity(entity, dt) {
    var wasleft    = entity.dx  < 0,
        wasright   = entity.dx  > 0,
        falling    = entity.falling,
        friction   = entity.friction * (falling ? 0.5 : 1),
        accel      = entity.accel    * (falling ? 0.5 : 1);
  
    entity.ddx = 0;
    entity.ddy = entity.gravity;
  
    if (entity.left)
      entity.ddx = entity.ddx - accel;
    else if (wasleft)//sa nu iasa din canvas
      entity.ddx = entity.ddx + friction;
  
    if (entity.right)
      entity.ddx = entity.ddx + accel;
    else if (wasright)
      entity.ddx = entity.ddx - friction;
  
    if (entity.jump && !entity.jumping && !falling) {
      entity.ddy = entity.ddy - entity.impulse; // an instant big force impulse
      entity.jumping = true;
    }
  
    entity.x  = entity.x  + (dt * entity.dx);
    entity.y  = entity.y  + (dt * entity.dy);
    entity.dx = bound(entity.dx + (dt * entity.ddx), -entity.maxdx, entity.maxdx);
    entity.dy = bound(entity.dy + (dt * entity.ddy), -entity.maxdy, entity.maxdy);
 
  // to prevent the tiny jiggling effect
    if ((wasleft  && (entity.dx > 0)) ||
        (wasright && (entity.dx < 0))) {
      entity.dx = 0; // clamp at zero to prevent friction from making us jiggle side to side
    }
  
  //COLLISION
    var tx        = p2t(entity.x),
        ty        = p2t(entity.y),
        nx        = entity.x%TILE, // true if player overlaps right
        ny        = entity.y%TILE, // true if player overlaps below
        cell      = tcell(tx,     ty),
        cellright = tcell(tx + 1, ty),
        celldown  = tcell(tx,     ty + 1),
        celldiag  = tcell(tx + 1, ty + 1);
  
  //If the player has vertical velocity
  //check to see if they have hit a platform below or above
  //stop their vertical velocity, and clamp their y position
    if (entity.dy > 0) {
      if ((celldown && !cell) ||
          (celldiag && !cellright && nx)) {
        entity.y = t2p(ty); // clamp the y position to avoid falling into platform below
        entity.dy = 0; // stop downward velocity
        entity.falling = false; // no longer falling
        entity.jumping = false; // (or jumping)
        ny = 0; // - no longer overlaps the cells below
      }
    }
    else if (entity.dy < 0) {
      if ((cell      && !celldown) ||
          (cellright && !celldiag && nx)) {
        entity.y = t2p(ty + 1); // clamp the y position to avoid jumping into platform above
        entity.dy = 0;  // stop upward velocity
        cell      = celldown; // player is no longer really in that cell, we clamped them to the cell below
        cellright = celldiag;
        ny        = 0;  // player no longer overlaps the cells below
      }
    }
  
  //same logic to horizontal velocity
    if (entity.dx > 0) {
      if ((cellright && !cell) ||
          (celldiag  && !celldown && ny)) {
        entity.x = t2p(tx);
        entity.dx = 0;
      }
    }
    else if (entity.dx < 0) {
      if ((cell     && !cellright) ||
          (celldown && !celldiag && ny)) {
        entity.x = t2p(tx + 1);
        entity.dx = 0;
      }
    }

    //the monster entities turn around when they hit either a wall 
    //or the edge of a platform
    if (entity.monster) {
      if (entity.left && (cell || !celldown)) {
        entity.left = false;
        entity.right = true;
      }      
      else if (entity.right && (cellright || !celldiag)) {
        entity.right = false;
        entity.left  = true;
      }
    }
  
  //detect if the player is now falling or not
  // looking to see if there is a platform below them
    entity.falling = ! (celldown || (nx && celldiag));
  
    let nrm=0;
    for(let i=0;i<monsters.length;i++) {
      if(monsters[i].dead)
        nrm++;
    }
    let nrc=0;
    for(let i=0;i<treasure.length;i++) {
      if(treasure[i].collected)
        nrc++;
    }

    if(nrm===monsters.length && nrc===treasure.length) {
      if(confirm("You won!"))
          reset();
        else {
          window.location.reload();
        }
    }

  }

//}

  //-------------------------------------------------------------------------
  // RENDERING
  //-------------------------------------------------------------------------
  

  //-------------------------------------------------------------------------
  // LOAD THE MAP
  //-------------------------------------------------------------------------
  
  
  //-------------------------------------------------------------------------
  // THE GAME LOOP
  //-------------------------------------------------------------------------

  var counter = 0, dt = 0, now,
      last = timestamp();

  //the render loop
  function frame() {

    if(!player.pause) {
      now = timestamp();
      dt = dt + Math.min(1, (now - last) / 1000);
      while(dt > step) {
        dt = dt - step;
        update(step);
      }
      render(ctx, counter, dt);
      last = now;
      counter++;
      requestAnimationFrame(frame, canvas);
   }
  }


  function togglePause() {
    if(!player.pause)
      player.pause = true;
    else {
      player.pause = false;
      frame();//start the frame
    }
  }

  //addEventListener - to get input from the player we need to attach event handlers to the browser DOM
  //sets up a function that will be called whenever the specified event is delivered to the target
  //For mouse and touch events, it usually makes more sense to anchor those handlers to the HTML5 <canvas> element to make calculating relative coordinates simpler.
  canvas.addEventListener('mouseover', togglePause);
  canvas.addEventListener('mouseout', togglePause);
  document.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, false);
  document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);
  document.addEventListener('mousedown', mousePos, true);
  document.addEventListener('mouseup', function() { isDown = false;}, true);
  document.addEventListener('mousemove', movePotion, true);


//when complete, setting up the map and starting the first frame
  get("json+css/level.json", function(req) {
      //startBtn.style.display = 'none';
      setup(JSON.parse(req.responseText));
      frame();
  });

   function reset() {
      //uncheck();
      deleteComment();
      clearInterval(myVar);
      clearTimeout(myVar2);
       const myNode = document.getElementById("canvas");
       while(myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
       }
      initialize();
      get("json+css/level.json", function(req) {
        setup(JSON.parse(req.responseText));
        frame();
      });
  }


};

window.onbeforeunload = function(event) {
    event.returnValue = "Do you really want to leave?";
};