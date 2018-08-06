/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function dsLineChart_fijo() {
    d3.json("data/EvolucionCasosSemanales.json", function(datos) 
    {       
	var firstDatasetLineChart = datos; 
        //console.log("firstDatasetLineChart");
        //console.log(firstDatasetLineChart);        
	var basics = dsLineChartBasics();	
	var margin = basics.margin,
                     width = basics.width,
                     height = basics.height;

	var xScale = d3.scale.linear()
	    .domain([0, d3.max(firstDatasetLineChart, function(d) { return d.category; })])
	    .range([0, width]) ;

	var yScale = d3.scale.linear()
	    .domain([0, d3.max(firstDatasetLineChart, function(d) { return d.measure + 50; })])
	    .range([height, 0]);
    
        //console.log("maximo valor y" +  d3.max(firstDatasetLineChart, function(d) { return d.measure; }));
        //console.log("maximo valor x" +  d3.max(firstDatasetLineChart, function(d) { return d.category; }));   
        var line = d3.svg.line()
	    .x(function(d) { return xScale(d.category); })
	    .y(function(d) { return yScale(d.measure); });
	
	var svg = d3.select("#lineChart_fijo").append("svg")
	    .datum(firstDatasetLineChart)
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    
	var plot = svg
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	    .attr("id", "lineChartPlot_fijo");

	/* Sirve para poner un titulo dentro del plot
         plot.append("text")
		.text("Tickets x Semana")
		.attr("id","lineChartTitle2")
		.attr("x",width/2)
		.attr("y",height/2)
                .style("font-size", "15px");*/
	    
	plot.append("path")
	    .attr("class", "line")
	    .attr("d", line)	
	    // add color
		.attr("stroke", "lightgrey")
	    ;
	  
	plot.selectAll(".dot")
	    .data(firstDatasetLineChart)
	  	 .enter().append("circle")
	    .attr("class", "dot")
	    //.attr("stroke", function (d) { return d.measure==datasetMeasureMin ? "red" : (d.measure==datasetMeasureMax ? "green" : "steelblue") } )
	    .attr("fill", function (d) { return d.measure==d3.min(firstDatasetLineChart, function(d) { return d.measure; }) ? "blue" : (d.measure==d3.max(firstDatasetLineChart, function(d) { return d.measure; }) ? "red" : "white") } )
	    //.attr("stroke-width", function (d) { return d.measure==datasetMeasureMin || d.measure==datasetMeasureMax ? "3px" : "1.5px"} )
	    .attr("cx", line.x())
	    .attr("cy", line.y())
	    //.attr("r", 3.5)
            .attr("r", function (d) { return d.measure==d3.min(firstDatasetLineChart, function(d) { return d.measure; }) ? "6" : (d.measure==d3.max(firstDatasetLineChart, function(d) { return d.measure; }) ? "6" : "3.5") } )
            .attr("transform", "translate(" + 0 + "," + -margin.top + ")")
	    .attr("stroke", "lightgrey")
            .append("title")
	    .text(function(d) { return formatAsInteger(d.measure); })	
	    ;

	/*svg.append("text")
		.text("Performance 2012")
		.attr("id","lineChartTitle1")	
		.attr("x",margin.left + ((width + margin.right)/2))
		.attr("y", 10)
		;*/
    
    //BOAA01 inicio creacion de ejes
    var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .ticks(4)
                    .orient("bottom");
    var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left");
            
    var svg = d3.select("#lineChart_fijo").selectAll("svg");
    
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + margin.left + "," + height + ")")
      .call(xAxis)
      .append("text") 
      .text("Semana") 
      .attr("transform", "translate(" + (width-margin.left-15) + "," + margin.top + ")")
      .style("font-size", "12px")
      ;
      
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .attr("transform", "rotate(0)")
      .attr("transform", "translate(" + margin.left + "," + 0 + ")") //muevo el eje Y
      .append("text")      
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Tickets por Semana")
      .style("font-size", "12px")
      .attr("transform", "translate(" + 3*margin.left + "," + 0 + ")"); //muevo la etiqueta de tickets
   //BOAA01 fin creacion de ejes
   
   //BOAA01 inicio posicionar la linea respecto a las margenes
   d3.select(".line")
     .attr("transform", "translate(" + 0 + "," + -margin.top + ")")
   //BOAA01 fin posicionar la linea respecto a las margenes
   
   //BOAA01 inicio valores en los circulos
   d3.select("#lineChartPlot_fijo").selectAll("g")
     .data(firstDatasetLineChart)
     .enter().append("text")
     .text(function(d) { return formatAsInteger(d.measure); })
     .style("fill", "blue")
     .attr("x", function(d) { return xScale(d.category)-10; })
     .attr("y", function(d) { return yScale(d.measure)-30; })
     ;
   //BOAA01 fin valores en los circulos
   
   
    });  
   

}

function dsLineChartBasics() {

	var margin = {top: 20, right: 10, bottom: 0, left: 45},
	    width = 600 - margin.left - margin.right,
	    height = 300 - margin.top - margin.bottom
	    ;
		
		return {
			margin : margin, 
			width : width, 
			height : height
		}			
		;
}

