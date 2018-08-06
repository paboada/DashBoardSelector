/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function pie_selector(){
    
    var width = 300,
        height = 300,
        outerRadius = Math.min(width, height) / 2,
        innerRadius = outerRadius * .999,   
	// for animation
	innerRadiusFinal = outerRadius * .5,
	innerRadiusFinal3 = outerRadius* .45,
	color = d3.scale.category20()
        ;
        
        

                                
    d3.json("data/Categorias.json", function(datos) 
    {
        var vis = d3.select("#pieChart_fijo")
                    .append("svg")
                    .data([datos])    
                    .attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
                    .attr("height", height)
                    .append("g")
	            .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
	            .attr("id", "piefijoplot")  
	    
        
        var arc = d3.svg
                    .arc()              
        	    .outerRadius(outerRadius).innerRadius(innerRadius);
   
        // for animation
        var arcFinal = d3.svg.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);
	var arcFinal3 = d3.svg.arc().innerRadius(innerRadiusFinal3).outerRadius(outerRadius);

        var pie = d3.layout
                    .pie()           
                    .value(function(d) { return d.measure; }); 

   //crear arcos para los nuevos elementos de los datos
        var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
                      .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
                      .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
                      .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                      .attr("class", "slice")    //allow us to style things in the slices (like text)
                      .on("mouseover", mouseover)
                      .on("mouseout", mouseout)
                      .on("click", up);
              
        arcs.append("svg:path")
               .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
               .attr("d", arc)     //this creates the actual SVG path using the associated data (pie) with the arc drawing function
	       //.append("svg:title") //mouseover title showing the figures
	       //.text(function(d) { return d.data.category + ": " + formatAsPercentage(d.data.measure); })
       ;			

        d3.selectAll("g.slice").selectAll("path").transition()
			    .duration(750)
			    .delay(10)
			    .attr("d", arcFinal )
			    ;
        // Add a label to the larger arcs, translated to the arc centroid and rotated.
	  // source: http://bl.ocks.org/1305337#index.html
	  arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; })
	  		.append("svg:text")
	      .attr("dy", ".35em")
	      .attr("text-anchor", "middle")
	      .attr("transform", function(d) { return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")"; })
	      //.text(function(d) { return formatAsPercentage(d.value); })
	      .text(function(d) { return d.data.category; })
              .style("font-size", "13px")
	      ;
	   
	   // Computes the label angle of an arc, converting from radians to degrees.
		function angle(d) {
		    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
		    return a > 90 ? a - 180 : a;
		}
		    
		
		// Pie chart title			
		vis.append("svg:text")
	     	.attr("dy", ".35em")
	      .attr("text-anchor", "middle")
	      .text("Seleccione la Categoria")
	      .attr("class","title")
	      ;	                    
        function mouseover() {
	  d3.select(this).select("path").transition()
	      .duration(750)
	        		.attr("d", arcFinal3)
	        		;
	}
	
        function mouseout() {
	 d3.select(this).select("path").transition()
	   .duration(750)
	        		.attr("d", arcFinal)
	        		;
	}
        
        function up(d, i) {
	                   updateBarChart(d.data.category, color(i));
			   updateLineChart(d.data.category, color(i));
			 
	}
                            
                      
    
    
    });
    
    
    
}


