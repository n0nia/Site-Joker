  var MAP      = { tw: 64, th: 48 },//dimensiunea hartii in tiles
      TILE     = 32,//dimensiunea fiecarui tile(in game piexels)
      METER    = TILE,//alegere arbitrara pt 1m
      GRAVITY  = 9.8 * 6, // default (exagerated) gravity
      MAXDX    = 15,      // default max horizontal speed (15 tiles per second)
      MAXDY    = 60,      // default max vertical speed   (60 tiles per second)
      ACCEL    = 1/2,     // default take 1/2 second to reach maxdx (horizontal acceleration)
      FRICTION = 1/6,     // default take 1/6 second to stop from maxdx (horizontal friction)
      IMPULSE  = 1500,    // default player jump impulse
      //COLOR palette
      //array of COLORS to represent each tile type
      COLOR    = { BLACK: '#000000', YELLOW: '#ECD078', BRICK: '#D95B43', PINK: '#C02942', PURPLE: '#542437', GREY: '#333', SLATE: '#53777A', GOLD: 'gold', RED: 'red', LIGHTGREEN: '#e6ffe6', DARKBLUE: '#000d1a', MAROON: '#663300', GREEN: '#003300', BLUEVIOLET: '#8A2BE2' },
      COLORS   = [ COLOR.YELLOW, COLOR.BRICK, COLOR.PINK, COLOR.PURPLE, COLOR.GREY ],
      KEY      = { SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, PAUSE: 80 },
      PAUSED   = false;
      startBtn = document.getElementById("startBtn");

  //game canvas and our player
  var fps      = 60,
      step     = 1/fps,
      canvas   = document.getElementById('canvas'),
      //drawing context on the canvas, null if the context identifier
      //is not supported
      ctx      = canvas.getContext('2d'),
      width    = canvas.width  = MAP.tw * TILE,
      height   = canvas.height = MAP.th * TILE,
      player   = {},
      monsters = [],
      treasure = [],
      cells    = [];
  
  //utility methods for converting between tile and pixel coord
  var t2p      = function(t)     { return t*TILE;                  },
      p2t      = function(p)     { return Math.floor(p/TILE);      },
      cell     = function(x,y)   { return tcell(p2t(x),p2t(y));    },
      tcell    = function(tx,ty) { return cells[tx + (ty*MAP.tw)]; };

  var PLAYING = false;
   
   var AUDIOP = new Audio('audio/ouch.mp3'),
        AUDIOC = new Audio('audio/coins.wav');

   var currX = 0,
       currY = IMAGE_START_EAST_Y,
       CHAR_WIDTH = 24,
       CHAR_HEIGHT = 32,
       IMAGE_START_EAST_Y = 32,
       IMAGE_START_WEST_Y = 96,
       SPRITE_WIDTH = 72;


   var updateDiv = document.getElementById("updateDiv"),
       Instr     = document.getElementById("instructions");

   var CHEAT = false,
       hardLevel = false;

   var NAME  = "Anonymous",
       LIVES = 3,
       MOOD  = "Night",
       ENEMIESCOLOR = COLOR.SLATE;

   var mousePosition,
       offset = [0, 0],
       div,
       isDown = false,
       JOKERCOLOR = COLOR.BLUEVIOLET,
       players = [],
       MonstersLength,
       ok = 0;