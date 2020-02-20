function setup(map) {
    var data    = map.layers[0].data, //the platforms
        objects = map.layers[1].objects, //the entities
        n, obj, entity;

    for(n = 0 ; n < objects.length-1 ; n++) {
      obj = objects[n];
      entity = setupEntity(obj);
      switch(obj.type) {
      case "player"   : player = entity; break;
      case "monster"  : monsters.push(entity); break;
      case "treasure" : treasure.push(entity); break;
      }
    }

    obj = objects[objects.length-1];
    entity = setupEntity(obj);
    monsters.push(entity);
    MonstersLength = monsters.length-1;
    cells = data;
  }

  function setupEntity(obj) {
    var entity = {};
    entity.x        = obj.x;
    entity.y        = obj.y;
    entity.dx       = 0;
    entity.dy       = 0;
    entity.gravity  = METER * (obj.properties.gravity || GRAVITY);
    entity.maxdx    = METER * (obj.properties.maxdx   || MAXDX);
    entity.maxdy    = METER * (obj.properties.maxdy   || MAXDY);
    entity.impulse  = METER * (obj.properties.impulse || IMPULSE);
    entity.accel    = entity.maxdx / (obj.properties.accel    || ACCEL);
    entity.friction = entity.maxdx / (obj.properties.friction || FRICTION);
    entity.monster  = obj.type == "monster";
    entity.player   = obj.type == "player";
    entity.lives    = LIVES;
    if(LIVES === 3)
      entity.lives    = obj.properties.lives;
    entity.treasure = obj.type == "treasure";
    entity.left     = obj.properties.left;
    entity.right    = obj.properties.right;
    entity.pause    = obj.pause;
    entity.start    = { x: obj.x, y: obj.y }
    entity.killed   = entity.collected = 0;
    entity.name     = NAME;
    entity.score    = 0;
    entity.ok       = 1;
    return entity;
  }