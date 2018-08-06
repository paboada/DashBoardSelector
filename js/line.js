/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function dsLineChart() {
    
    d3.json("data/EvolucionCasosCategoria.json", function(datos)
    {    
       var datasetLineChart_json = datos;
       var group = "All";
	//var firstDatasetLineChart = datasetLineChartChosen(group); 
        
       var firstDatasetLineChart = datasetLineChartChosen_json(group, datasetLineChart_json);
       var basics = dsLineChartBasics();
        
	var margin = basics.margin,
	    width = basics.width,
	    height = basics.height		;

	var xScale = d3.scale.linear()
	    .domain([0, d3.max(firstDatasetLineChart, function(d) { return d.category; })])
	    .range([0, width]) ;

	var yScale = d3.scale.linear()
	    .domain([0, d3.max(firstDatasetLineChart, function(d) { return d.measure + 50; })])
	    .range([height, 0]);
	
	var line = d3.svg.line()
	    .x(function(d) { //console.log(d.category);
                             //console.log((xScale(d.category)));
                             return xScale(d.category); })
	    .y(function(d) {  //console.log(d.measure);
                               // console.log(yScale(d.measure))
                                return yScale(d.measure); });
	
	var svg = d3.select("#lineChart").append("svg")
	    .datum(firstDatasetLineChart)
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    
	var plot = svg
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	    .attr("id", "lineChartPlot")
	    ;

		/* descriptive titles as part of plot -- start */
	var dsLength=firstDatasetLineChart.length;

	/*plot.append("text")
		.text(firstDatasetLineChart[dsLength-1].measure)
		.attr("id","lineChartTitle2")
		.attr("x",width/2)
		.attr("y",height/2)	
		;*/
	/* descriptive titles -- end */
	    
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
	    .attr("r", 3.5)
            .attr("r", function (d) { return d.measure==d3.min(firstDatasetLineChart, function(d) { return d.measure; }) ? "6" : (d.measure==d3.max(firstDatasetLineChart, function(d) { return d.measure; }) ? "6" : "3.5") } )
	    .attr("stroke", "lightgrey")
            .attr("transform", "translate(" + 0 + "," + -margin.top + ")")
	    .append("title")
	    .text(function(d) { return d.category + ": " + formatAsInteger(d.measure); })
	    ;

	//BOAA01 inicio creacion de ejes
    var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .ticks(4)
                    .orient("bottom");
    var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left");
            
    var svg = d3.select("#lineChart").selectAll("svg");
    
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + margin.left + "," + height + ")")
      .call(xAxis)
      .append("text") 
      .text("Semana") 
      .attr("transform", "translate(" + (width-margin.left-15) + "," + (margin.top) + ")")
      .style("font-size", "12px")
      ;
      
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .attr("transform", "rotate(0)")
      .attr("transform", "translate(" + margin.left + "," + 0 + ")") //muevo el eje Y
      .append("text") 
      .attr("id", "tit_line")     
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Tickets por Semana :" + group)
      .style("font-size", "12px")
      .attr("transform", "translate(" + 4.5*margin.left + "," + 0 + ")"); //muevo la etiqueta de tickets
   //BOAA01 fin creacion de ejes
   
   
   
   //BOAA01 inicio valores en los circulos
   d3.select("#lineChartPlot").selectAll("g")
     .data(firstDatasetLineChart)
     .enter().append("text")
     .text(function(d) { return formatAsInteger(d.measure); })
     .style("fill", "blue")
     .attr("x", function(d) { return xScale(d.category)-10; })
     .attr("y", function(d) { return yScale(d.measure)-30; })
     ;
   //BOAA01 fin valores en los circulos
   
   //BOAA01 inicio posicionar la linea respecto a las margenes
   d3.select("#lineChartPlot").select(".line")
     .attr("transform", "translate(" + 0 + "," + -margin.top + ")")
   //BOAA01 fin posicionar la linea respecto a las margenes
   
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


/* updates bar chart on request */
function updateLineChart(group, colorChosen) {
    
    d3.json("data/EvolucionCasosCategoria.json", function(datos)
    { 
	var currentDatasetLineChart = datasetLineChartChosen_json(group, datos);
        //console.log("Filtrados:");
        //console.log(currentDatasetLineChart);
	var basics = dsLineChartBasics();	
	var margin = basics.margin,
		     width = basics.width,
	             height = basics.height;

	var xScale = d3.scale.linear()
	    .domain([0, d3.max(currentDatasetLineChart, function(d) { return d.category; })])
	    .range([0, width]) ;
    
        var val_max = 127;
        var val_datos_max = d3.max(currentDatasetLineChart, function(d) { return d.measure;})
        var factor = val_max-val_datos_max;
        
	var yScale = d3.scale.linear()
	    .domain([0, d3.max(currentDatasetLineChart, function(d) { return d.measure + factor; })])
	    .range([height, 0]);
	//console.log("new max " + d3.max(currentDatasetLineChart, function(d) { return d.measure + 50; }));   
    
    //actualizo los valores a los titulos y su posicion en eje y
   d3.select("#lineChartPlot")
            .selectAll("text")
            .data(currentDatasetLineChart)
            .transition()
	    .duration(750)
            .attr("y", function(d) { return yScale(d.measure)-30; })
            .text(function(d) { return d.measure;});
            
    //actualizo posicion de circulos y su posicion en eje y
    d3.select("#lineChartPlot")
            .selectAll(".dot")
            .data(currentDatasetLineChart)
            .transition()
	    .duration(750)
            .attr("cy",function(d) { //console.log(d.measure);
                                    return yScale(d.measure); })
            .attr("fill", function (d) { return d.measure==d3.min(currentDatasetLineChart, function(d) { return d.measure; }) ? "blue" : (d.measure==d3.max(currentDatasetLineChart, function(d) { return d.measure; }) ? "red" : "white") } )
            .attr("r", function (d) { return d.measure==d3.min(currentDatasetLineChart, function(d) { return d.measure; }) ? "6" : (d.measure==d3.max(currentDatasetLineChart, function(d) { return d.measure; }) ? "6" : "3.5") } );
     

          
 //console.log(plot);
        var line = d3.svg.line()
	    .x(function(d) { //console.log((d.category));
                             //console.log(xScale(d.category));
                             return xScale(d.category); })
	    .y(function(d) { 
                //console.log(d.measure);
                //console.log(yScale(d.measure));
                return yScale(d.measure);});
        
        //console.log(line);    
	d3.select("#lineChartPlot").selectAll("path")            
	    .transition()
	    .duration(750)			    
	    .attr("class", "line")
            .attr("d", line(currentDatasetLineChart))	
	    .attr("stroke", colorChosen);
    
    //actualizo eje y
    var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left");
    d3.select("#lineChart").select(".y.axis").call(yAxis);
    d3.select("#lineChart").select("#tit_line").text("Tickets por Semana :" + group);
 
    });
           
}

function datasetLineChartChosen_json(group,datasetLineChart_json) {
    
    //console.log("inicio funcion datasetLineChartChosen_json");
    var ds = [];
       for (x in datasetLineChart_json) {
               //console.log(datasetLineChart_json[x].group);
		 if(datasetLineChart_json[x].group==group){
                        //console.log(datasetLineChart_json[x]);
		 	ds.push(datasetLineChart_json[x]);
		 } 
		}             
                return ds;
}