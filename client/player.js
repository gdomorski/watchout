
//DATA
var playerPosition = [{
  name: 1,
  cx: width/2,
  cy: height/2
}]

var drag = d3.behavior.drag()
    .on("drag", function(event){
      updatePlayer(playerPosition, d3.event); 
    });

//UPDATE (Updates visually where the player is on the page)
var updatePlayer = function(player, event){
  //JOIN

  var playerDOM = d3.select('svg').selectAll('.player')
    .data(player, function(d){
      return d.name 
    })

  //UPDATE
  playerDOM.attr('cx',function(d){
    if(event === undefined){
      return d.x;
    }
    d.x = event.x;
    return d.x;
  })
  .attr('cy',function(d){
    if(event === undefined){
      return d.x;
    }
    d.y = event.y;
    return d.y;
  })

  //ENTER
  playerDOM.enter()
    .append('circle')
    .attr('r',20)
    .attr('cx',width/2)
    .attr('cy',height/2)
    .attr('class','player')
    .call(drag)
}

updatePlayer(playerPosition);

var playerSelection = d3.select("svg").selectAll(".player");









