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

var enemyUpdate = function(enemyCoordinates){
  //JOIN Data to DOM elements
  var enemies = d3.select('svg').selectAll('.enemy')
    .data(enemyCoordinates, function(d){
      return d.name;
    })
  //UPDATE
  enemies.transition().duration(1500)
    .attr('cx', function(d){
      d.x = Math.random()*width;
      return d.x})
    .attr('cy', function(d){
      d.y = Math.random()*height;
      return d.y})

  
  //ENTER
  enemies.enter()
    .append('circle')
    .attr('r',10)
    .attr('cx', function(d){return d.x})
    .attr('cy', function(d){return d.y})
    .attr('class','enemy');

}
//initial call to setup enemies
enemyUpdate(enemyObjects);


//enemy movement

setInterval(function(){ enemyUpdate(enemyObjects)},1000);

//score

var count = 0;

setInterval(function(){
  count++;
  d3.select('.current').text('Current Score: ' + count);
},50)


//initial update




















