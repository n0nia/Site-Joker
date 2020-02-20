//if(PLAYING) {
function render(ctx, frame, dt) {
    ctx.clearRect(0, 0, width, height);
    renderMap(ctx);
    renderTreasure(ctx, frame);
    renderPlayer(ctx, dt);
    renderMonsters(ctx, dt);
    //renderPotion(ctx, dt);
  }

  function renderMap(ctx) {
    var x, y, cell;
    for(y = 0 ; y < MAP.th ; y++) {
      for(x = 0 ; x < MAP.tw ; x++) {
        cell = tcell(x, y);
        if (cell) {
          ctx.fillStyle = COLORS[cell - 1];
          ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
        }
      }
    }
  }

  function drawPlayerName() {
  	ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    var len = player.name.length; 
    ctx.fillText(player.name, player.x-len*2, player.y-25);
  }

  function renderPlayer(ctx, dt) {
    ctx.fillStyle = JOKERCOLOR;
    ctx.fillRect(player.x + (player.dx * dt), player.y + (player.dy * dt), TILE, TILE);
    
    drawPlayerName();

    /*var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 400, 10, 500, 100, player.x + (player.dx * dt), player.y + (player.dy * dt) - 160, 700, 400); 
    };
    img.src = "NES - Batman - The-Joker.png";
    ctx.drawImage(img, 400, 10, 500, 100, player.x + (player.dx * dt), player.y + (player.dy * dt) - 160, 700, 400);
*/
    //lives
    ctx.fillStyle = COLOR.RED;
    for(i = 1; i <= player.lives; i++)
      ctx.fillRect(i * 65, 10, TILE/3, TILE*2/3);

    var n, max;

    ctx.fillStyle = COLOR.GOLD;
    for(n = 0, max = player.collected ; n < max ; n++)
      ctx.fillRect(t2p(2 + n), t2p(2), TILE/2, TILE/2);

    ctx.fillStyle = COLOR.SLATE;
    for(n = 0, max = player.killed ; n < max ; n++)
      ctx.fillRect(t2p(2 + n), t2p(3), TILE/2, TILE/2);
  }

  function renderMonsters(ctx, dt) {
    ctx.fillStyle = ENEMIESCOLOR;
    var n, max, monster;
    for(n = 0, max = MonstersLength ; n < max ; n++) {
      monster = monsters[n];
      if (!monster.dead) {
        if(hardLevel == true) {
          ctx.fillRect(monster.x + (monster.dx * dt), monster.y + (monster.dy * dt), TILE, TILE);
          monster.ok = 1;
        }
        else {
          monster.ok = 0;
          n++;
         }
      ctx.fillRect(monster.x + (monster.dx * dt), monster.y + (monster.dy * dt), TILE, TILE);
      monster.ok = 1;
      }
    }
  }

  function renderTreasure(ctx, frame) {
    ctx.fillStyle   = COLOR.GOLD;
    ctx.globalAlpha = 0.25 + tweenTreasure(frame, 60);
    var n, max, t;
    for(n = 0, max = treasure.length ; n < max ; n++) {
      t = treasure[n];
      if (!t.collected)
        ctx.fillRect(t.x, t.y + TILE/3, TILE, TILE*2/3);
    }
    ctx.globalAlpha = 1;
  }

  function tweenTreasure(frame, duration) {
    var half  = duration/2
        pulse = frame%duration;
    return pulse < half ? (pulse/half) : 1-(pulse-half)/half;
  }

  //setInterval(function newMonster(ctx, dt) {
   // ctx.fillRect(player.x + (player.dx * dt), player.y + (player.dy * dt), TILE, TILE);
  //}, 100);

//}

  /*function renderPotion(ctx, dt) {
  	ctx.fillStyle = COLOR.RED;
  	ctx.fillRect(2020, 1520, TILE*3, TILE*2);
  }*/
