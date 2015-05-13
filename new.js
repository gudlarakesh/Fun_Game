var memory_array = ['A' , 'A', 'B', 'B', 'C', 'C', 'D' , 'D','E','E', 'F', 'F', 'G','G','H','H','I','I','J','J','K','K','L','L'];
var memory_values = [];
var memory_title_ids = [];
var tiles_flipped = 0;

Array.prototype.memory_title_shuffle = function(){
  var i = this.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
}

function newBoard(){
  titles_flipped = 0;
  var output = '';
  memory_array.memory_title_shuffle();
  for(var i=0; i< memory_array.length ; i++){
    output += '<div id="title_'+i+'" class="tile" onclick="memoryFlipTile(this, \''+memory_array[i]+'\')"></div>'; 
  }
  document.getElementById('memory_board').innerHTML = output;
}

function memoryFlipTile(title,val){
  if(title.innerHTML == "" && memory_values.length < 2){
    title.style.background = '#FFF';
    title.innerHTML = val;
    if(memory_values.length == 0){
      memory_values.push(val);
      memory_title_ids.push(title.id);
    }
    else if(memory_values.length == 1){
      memory_values.push(val);
      memory_title_ids.push(title.id);
      if(memory_values[0] == memory_values[1]){
        tiles_flipped += 2;
        memory_values = [];
        memory_title_ids = [];
        if(tiles_flipped == memory_array.length){
          alert("Board Cleared... generating new board");
          document.getElementById('memory_board').innerHTML = "";
          newBoard();
        }
      }else {
        function flip2Back() {
          var title_1 = document.getElementById(memory_title_ids[0]);
          var title_2 = document.getElementById(memory_title_ids[1]);
          title_1.style.background = 'url(icons/a1.png) no-repeat';
          title_1.style.backgroundSize = 'cover';
          title_1.innerHTML = "";
          title_2.style.background = 'url(icons/a1.png) no-repeat';
          title_2.style.backgroundSize = 'cover';
          title_2.innerHTML = "";

          memory_values = [];
          memory_title_ids = [];
        }
        setTimeout(flip2Back, 700);
      }
    }
  }
}