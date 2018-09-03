// You must learn Object Oriented Programming prototype of JavaScript on: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects
// Your goal is to replace every comment block with your code. :p

var body = document.getElementsByTagName("body")[0];
var container = body.getElementsByClassName("container")[0];

function start(){
  var img = document.createElement("img");
  img.src = "sprites/mario-start.png"
  container.style.position = "relative";
  img.style.position = "absolute";
  img.style.top = "0px";
  img.style.left = "450px";
  img.style.width = "35%";
  img.style.cursor = "pointer";
  var zIndex = parseInt(window.getComputedStyle(img).getPropertyValue("z-index"));
  img.style.zIndex = 1;
  container.appendChild(img);
  img.addEventListener("click", function(){
  container.removeChild(img);
});
}

var Cell = function (y, x, image) {
   this.checkCollision = function (cell) {
      if(this.x == cell.x && this.y == cell.y){
        return true;
      }else {
        return false;
      }
       // if x and y of this are equal to x and y of cell
       // return true
       // else
       // return false
   };
   this.update = function () {
       this.image.style.left = this.x * scale + 'px';
       this.image.style.top = this.y * scale + 'px';
   };
   this.x = x;
   this.y = y;
   this.image = document.createElement("img");
   this.image.src = image;
   this.image.style.position = 'absolute';
   this.image.style.width = scale + 'px';
   document.body.appendChild(this.image);
   this.update();
};

Cell.prototype.die = function () {
   map.delete(this);
   document.body.removeChild(this.image);
};

var Peach = function (y, x, image) {
   Cell.call(this, y, x, image);
};

var Mario = function (y, x, image) {
   Cell.call(this, y, x, image);
   this.jumpPower = 0;
   this.falling = false;
   var mario = this;
   this.makeJump = function () {
     if(mario.jumpPower !== 0){
       mario.y -= 1;
       var objectAtCellDestination = map.checkCollision(mario);
       if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Cell"){
         mario.y +=1;
         mario.jumpPower = 0;
       } else if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Koopa"){
         mario.die();
     }else if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Peach"){
       mario.win();
     }else{
       mario.image["src"] = "sprites/mario-jump.png";
       mario.jumpPower -= 1;
     }
   }
       // Mario go up by one block if possible and if he has power
       // then decrement power
   };
   this.fall = function () {
     if(mario.jumpPower === 0){
       mario.y += 1;
       var objectAtCellDestination = map.checkCollision(mario);
       if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Cell"){
         mario.y -= 1;
       } else if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Koopa"){
        //map.map.push(this)
        mario.image["src"] = "sprites/mario-win.png";
         objectAtCellDestination.die();
       }else if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Peach"){
         mario.win();
       }
       else {
         mario.image["src"] = "sprites/mario.png";
         mario.falling = true;
       }
     }
       // Mario falls of one block if possible
   };
   function moveLateral() {
     if(inputs.ArrowLeft !== undefined){
       if(inputs.ArrowLeft["isPressed"]){
         mario.x -= 1;
         var objectAtCellDestination = map.checkCollision(mario);
           if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Koopa"){
             mario.die();
           } else if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Peach"){
             mario.win();
           } else if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Cell"){
             mario.x += 1;
           } else if(Number.isInteger(mario.x / 2)){
             mario.image["src"] = "sprites/mario-right.png";
           }else{
             mario.image["src"] = "sprites/mario.png";
           }
         }
       }

      if(inputs.ArrowRight != undefined){
       if(inputs.ArrowRight["isPressed"]){
         mario.x += 1;
         var objectAtCellDestination = map.checkCollision(mario);
           if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Koopa"){
             Cell.prototype.die.call(mario);
           } else if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Peach"){
             mario.win();
           } else if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Cell"){
             mario.x -= 1;
           } else if(Number.isInteger(mario.x / 2)){
             mario.image["src"] = "sprites/mario-right.png";
           } else {
             mario.image["src"] = "sprites/mario.png";
           }
         }
       }
     }

  // Mario go left or right if possible
  // when user press left arrow or right arrow

  // If he encounters a koopa, Mario die
  // If he encounters Peach, Mario wins

   function moveVertical() {
     if(inputs.Space != undefined){
       if(inputs.Space["isPressed"]) {
         mario.jumpPower += 3;
      }
     }
       // Mario gets 3 power
       // when user press space key

       mario.fall();
       mario.makeJump();


       // If Mario falls on a koopa, Mario kills the koopa
       // If he jumps a koopa, Mario die
       // If he jumps or falls on Peach, Mario wins
   }
   this.move = function () {
       moveLateral();
       moveVertical();
   };
   this.win = function () {
     var img = document.createElement("img");
     img.src = "sprites/mario-win.png";
     container.style.position = "relative";
     img.style.position = "absolute";
     img.style.top = "150px";
     img.style.left = "450px";
     img.style.width = "35%";
     img.style.cursor = "pointer";
     var zIndex = parseInt(window.getComputedStyle(img).getPropertyValue("z-index"));
     img.style.zIndex = 1;
     container.appendChild(img);
     img.addEventListener("click", function(){
     location.reload();
   });
   };
   this.die = function () {
       clearInterval(this.interval);
       Cell.prototype.die.call(this);
       var img = document.createElement("img");
       img.src = "sprites/mario-start-again.png";
       container.style.position = "relative";
       img.style.position = "absolute";
       img.style.top = "150px";
       img.style.left = "450px";
       img.style.width = "35%";
       img.style.cursor = "pointer";
       var zIndex = parseInt(window.getComputedStyle(img).getPropertyValue("z-index"));
       img.style.zIndex = 1;
       container.appendChild(img);
       img.addEventListener("click", function(){
       location.reload();
     });

   };
   this.interval = setInterval(function () {
       mario.move();
       mario.update();
   }, 100);
};

var Koopa = function (y, x, image) {
   Cell.call(this, y, x, image);
   this.directionLeft = true;
   var koopa = this;
   this.move = function () {
     if(koopa.directionLeft === true){
       koopa.x -= 1;
       var objectAtCellDestination = map.checkCollision(koopa);
       if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Cell"){

         koopa.x += 1;
         koopa.directionLeft = false;
         return koopa.directionLeft;
       } else if (objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Mario"){
         objectAtCellDestination.die();
       }
     }
     if(koopa.directionLeft === false){
       koopa.x += 1;
       var objectAtCellDestination = map.checkCollision(koopa);
       if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Cell"){
         koopa.x -= 1;
         koopa.directionLeft = true;
         return koopa.directionLeft;
       }else if (objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Mario"){
         objectAtCellDestination.die();
       }
     }
       // Koopa move left to right until he encounters a wall then right to left and so on
       // If he encounters Mario, Mario die

       this.fall();
   };
   this.fall = function () {
     koopa.y += 1;
     var objectAtCellDestination = map.checkCollision(koopa);
     if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Cell"){
       koopa.y -= 1;
     }
       else if(objectAtCellDestination !== undefined && objectAtCellDestination.constructor["name"] === "Mario"){
         mario.die();
     } else {
     }

       // Koopa falls of a block if possible
       // If he encounters Mario, Mario die
   };
   this.die = function () {
       clearInterval(this.interval);
       Cell.prototype.die.call(this);
   };
   this.interval = setInterval(function () {
       koopa.move();
       koopa.update();
   }, 200);
};



var Map = function (map_path) {
   var xmlHttp = new XMLHttpRequest();
   xmlHttp.open("GET", map_path, false);
   xmlHttp.send();
   var model = xmlHttp.responseText;
   //var model = JSON.parse(xmlHttp.responseText); // Fonctionne pas
   this.map = [];
   map = model.split("\n");;
    this.generateMap = function () {
      for (var i = 0; i < map.length; i++)
      {
        for (var j = 0; j < map[i].length; j++)
        {
          if(map[i][j] == "w") {
           this.map.push(new Cell(i, j, "sprites/cell_sprites.png"));
          }
          else if(map[i][j] == "k") {
           this.map.push(new Koopa(i, j, "sprites/koopa.png"));
          }
          else if(map[i][j] == "m") {
           this.map.push(new Mario(i, j, "sprites/mario.png"));
          }
          else if(map[i][j] == "p") {
           this.map.push(new Peach(i, j, "sprites/peach.png"));
         }
        }
      }
       // run through the map line by line then character by character
       // instantiate a cell's child for each letter:
       //      w => Cell
       //      k => Koopa
       //      m => Mario
       //      p => Peach
       // push this instance in map

   };

   this.generateMap(model);
   this.checkCollision = function (cell) {
     for (var i = 0; i < this.map.length; i++) {
       if(this.map[i] != cell && this.map[i].checkCollision(cell)){
         return(this.map[i])
       }
     }return false;
   };

       // run through the map and return the cell at the coordinates
       // by using checkCollision of Cell


   this.delete = function (cell) {
     for (var i = 0; i < this.map.length; i++) {
       if(this.map[i] == cell && this.map[i].checkCollision(cell)){
         //console.log(this.map[i])
         this.map.splice(i,1);
       }
     }

       // delete the Cell cell of the map
   };
};

var inputs = {};
window.addEventListener("keydown", function (e) {
   e = e || window.event;
   inputs[e.code] = {
       hasBeenPressed: true,
       isPressed: true
   };
   console.log(inputs);
});
window.addEventListener("keyup", function (e) {
   e = e || window.event;
   if (typeof inputs[e.code] !== 'undefined') {
       inputs[e.code].isPressed = false;
   }
});
var scale = 40;
var map = new Map('assets/map.json');
var objectName;
