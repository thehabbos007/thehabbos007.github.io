

function doKast($scope){

 	$scope.do = function() {
    	kast($scope.value);
    	$scope.num = num;
		$scope.proc = [];
		for (var i = 0; i < num.length; i++) {
			$scope.proc.push((num[i]/$scope.value)*100);
		}
		console.log($scope.proc);
    };
    $scope.graph = function() {
    	  $("#visualisation").empty();
  		  $("#visualisation").show();

		  var barData = [{
		    'x': 1,
		    'y': $scope.proc[0]
		  }, {
		    'x': 2,
		    'y': $scope.proc[1]
		  }, {
		    'x': 3,
		    'y': $scope.proc[2]
		  }, {
		    'x': 4,
		    'y': $scope.proc[3]
		  }, {
		    'x': 5,
		    'y': $scope.proc[4]
		  }, {
		    'x': 6,
		    'y': $scope.proc[5]
		  }];

		  var vis = d3.select('#visualisation'),
		    WIDTH = 1000,
		    HEIGHT = 500,
		    MARGINS = {
		      top: 20,
		      right: 20,
		      bottom: 20,
		      left: 50
		    },
		    xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(barData.map(function (d) {
		      return d.x;
		    })),


		    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
		      d3.max(barData, function (d) {
		        return d.y;
		      })
		    ]),

		    xAxis = d3.svg.axis()
		      .scale(xRange)
		      .tickSize(5)
		      .tickSubdivide(true),

		    yAxis = d3.svg.axis()
		      .scale(yRange)
		      .tickSize(5)
		      .orient("left")
		      .tickFormat(function(d) { return d + "%"; })
		      .tickSubdivide(true);


		  vis.append('svg:g')
		    .attr('class', 'x axis')
		    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
		    .call(xAxis);

		  vis.append('svg:g')
		    .attr('class', 'y axis')
		    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
		    .call(yAxis);

		  vis.selectAll('rect')
		    .attr('class', 'rect')
		    .data(barData)
		    .enter()
		    .append('rect')
		    .attr('x', function (d) {
		      return xRange(d.x);
		    })
		    .attr('y', function (d) {
		      return yRange(d.y);
		    })
		    .attr('width', xRange.rangeBand())
		    .attr('height', function (d) {
		      return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
		    })
		    .attr('fill', '#26A3D9')

   			.on("mouseover", function (d) {
   		  d3.select(this)
    		.attr('fill', '#6ADCD8')
    		.classed("active", true );
    	  d3.select("#tooltips")
	        .style("left", d3.event.pageX + "px")
	        .style("top", d3.event.pageY + "px")
	        .style("opacity", 1)
	        .select("#values")
	        .html("<span>Slået " + $scope.num[d.x-1] + " gange</span><br/><span>Procentdel:" + String(d.y).substring(0,9) + "%</span>")
	      d3.select("#titles")
	        .text("Nummer: " + d.x)
	    	})
	    	.on("mouseout",  function() {
  		  d3.select(this)
    		.classed("active", false)
    		.attr('fill', '#26A3D9')
  			});
 	}
		
}

var num = [0,0,0,0,0,0];
function kast(times){
	var nu = [0,0,0,0,0,0];
	while( times > 0 ){
		dice = Math.floor(Math.random() * 6);
		nu[dice]++;
		times--;
	}
	return num = nu;
}


$("#1").keyup(function(event){
    if(event.keyCode == 13){
        $("#2").click();
    }
})
	   .on("input", function() {
    if(this.value > 1000000000){
        this.value = "1000000000";
    }
  
});

$(document).ready(function() {
	$("#visualisation").hide();
	var boring = new Konami();
	boring.load('http://pastebin.com/4A5gimJ9')
});