// start slingin' some d3 here.
var width = 800;
var height = 500;

var canvas = d3.select('body').append('svg').attr('width',width).attr('height', height);

var enemyObjects = [];
for(var i = 0; i < 10; i++){
  enemyObjects.push(
    {
      name: i,
      x: Math.floor(Math.random()*width),
      y: Math.floor(Math.random()*height)
    }
  );
};



var checkCollision = function(currentEnemyPosition){
    //enemyPositions array of object

    var player = playerPosition[0];
      var xDiff = currentEnemyPosition.x - player.x;
      var yDiff = currentEnemyPosition.y - player.y;
      var separation = Math.pow(xDiff,2) + Math.pow(yDiff,2);
      if(separation < 1600){
        if(currentScore>highscore){
          highscore = currentScore;
        }
        currentScore = 0;
        collisions++;
        updateScore(currentScore, highscore, collisions);
      }
}

var enemyUpdate = function(enemyCoordinates){

  var tweenWithCollisionDetection = function (endPosition){
    //closure shit
    console.log(endPosition);
    var enemy = d3.select(this);
    return function(t){
      var currentEnemyPosition = {
        x:enemy.attr('cx'),
        y:enemy.attr('cy')
      }
      checkCollision(currentEnemyPosition);
    }
  }


  //JOIN Data to DOM elements
  var enemies = d3.select('svg').selectAll('.enemy')
    .data(enemyCoordinates, function(d){
      return d.name;
    })
  //UPDATE
  enemies
    .transition()
    .duration(1500)
    .attr('cx',function(d){
      return d.x;
    })
    .attr('cy', function(d){
      return d.y;
    })
    .tween('custom', tweenWithCollisionDetection)
  
  //ENTER
  enemies.enter()
    .append('circle')
    .attr('r',20)
    .attr('cx', function(d){return d.x})
    .attr('cy', function(d){return d.y})
    .attr('class','enemy');

}
//initial call to setup enemies
enemyUpdate(enemyObjects);


//enemy movement
setInterval(function(){
 for (var i = enemyObjects.length - 1; i >= 0; i--) {
    enemyObjects[i].x = Math.random() * width
    enemyObjects[i].y = Math.random() * height
 }
 enemyUpdate(enemyObjects)}
 ,1500);

//score
var currentScore = 0;
var highscore = 0;
var collisions = 0;
setInterval(function(){
  currentScore++;
  updateScore(currentScore, highscore, collisions);
},50)


//initial update

var updateScore = function(currentScore, highscore, collisions){
  d3.select('.current').text('Current Score: ' + currentScore);
  d3.select('.highscore').text('High Score: ' + highscore);
  d3.select('.collisions').text('Collisions: ' + collisions);
}



















