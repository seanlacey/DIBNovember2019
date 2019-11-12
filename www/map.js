//Set Height and Width Vars;
const w=400;
const h=250;

//Initialize SVG;
const svg = d3.select("#plot")
			  .append("svg")
				.attr("width",w)
				.attr("height",h);
				
//Define projection;
let projection = d3.geoAlbersUsa()
				   .translate([w/2,h/2])
				   .scale([500]);
				
//Define Path Generator;
let path = d3.geoPath()
			 .projection(projection);
			 
//Center of Country (Roughly);
const center = projection([-97.0, 39.0]);
	 
//Initialize Variables;
let usdata;
let radioVal="avg";

d3.json("www/data/us-states.json").then(function(json){
	d3.json("www/data/us_avg_best.json").then(function(data){

		for(let i=0; i < data.length; i++){
			let dataState=data[i].state;
			let avgSec1=data[i].avgSeconds1;
			let avgSec2=data[i].avgSeconds2;
			let avgSec3=data[i].avgSeconds3;
			let avgName1=data[i].avgName1;
			let avgName2=data[i].avgName2;
			let avgName3=data[i].avgName3;
			let bestSec1=data[i].bestSeconds1;
			let bestSec2=data[i].bestSeconds2;
			let bestSec3=data[i].bestSeconds3;
			let bestName1=data[i].avgName1;
			let bestName2=data[i].bestName2;
			let bestName3=data[i].bestName3;
			
			for(let j=0; j < json.features.length; j++){
				let jsonState=json.features[j].properties.name;
				
				if(dataState === jsonState){
					json.features[j].properties.avgSec1=avgSec1;
					json.features[j].properties.avgSec2=avgSec2;
					json.features[j].properties.avgSec3=avgSec3;
					json.features[j].properties.avgName1=avgName1;
					json.features[j].properties.avgName2=avgName2;
					json.features[j].properties.avgName3=avgName3;							
					json.features[j].properties.bestSec1=bestSec1;
					json.features[j].properties.bestSec2=bestSec2;
					json.features[j].properties.bestSec3=bestSec3;
					json.features[j].properties.bestName1=bestName1;
					json.features[j].properties.bestName2=bestName2;
					json.features[j].properties.bestName3=bestName3;
					break;
				}
			}
		}
		
		usdata=data;
		
		//Define Color Scale;									 
		let colScale = d3.scaleLinear()
						 .domain([
							d3.min(usdata,function(d){ return d.avgSeconds1; }),
							d3.max(usdata,function(d){ return d.avgSeconds1; })
						 ])
						 .range([90,10]);
		
		svg.selectAll("path")
			 .data(json.features)
			 .enter()
		   .append("path")
			 .attr("class","state")
			 .attr("id",function(d){
				return d.properties.name;
			 })
			 .attr("d",path)
			 .attr("stroke","#000")
			 .style("fill",function(d){
				if(d.properties.avgSec1){
					return "hsl(220,100%, " + Math.round(colScale(d.properties.avgSec1)) + "%)";
				} else{
					return "#777";
				}
			 });
			 
		//Hover Update;
		svg.selectAll(".state")
		   .on("mouseover",function(d){		

				let Sec1,Name1,Sec2,Name2,Sec3,Name3,stateName;
				
				stateName = d.properties.name;
				
				if(stateName === "Mississippi"){
					//Hover Color;
					d3.select(this)
					  .transition()
					  .style("fill",function(d){
						if(Sec1 && Sec1 !== "-"){
							return "red";
						} else{
							return "#CCC";
						}
					 });
					 
					//Hide Text;
					d3.select("#hideText").classed("hidden",true);
					
					//Unhide missExplain;
					d3.select("#missExplain").classed("hidden",false);	
				}else{
					//Grab text for div update;
					if(radioVal === "avg"){
						if(d.properties.avgSec1){
							Name1=d.properties.avgName1;
							Sec1=d.properties.avgSec1;
						}else{
							Name1="-";
							Sec1="-";
						}
						
						if(d.properties.avgSec2){
							Name2=d.properties.avgName2;
							Sec2=d.properties.avgSec2;
						}else{
							Name2="-";
							Sec2="-";
						}
						
						if(d.properties.avgSec3){
							Name3=d.properties.avgName3;
							Sec3=d.properties.avgSec3;
						}else{
							Name3="-";
							Sec3="-";
						}
					} else if(radioVal === "best"){
						if(d.properties.bestSec1){
							Name1=d.properties.bestName1;
							Sec1=d.properties.bestSec1;
						}else{
							Name1="-";
							Sec1="-";
						}
						
						if(d.properties.bestSec2){
							Name2=d.properties.bestName2;
							Sec2=d.properties.bestSec2;
						}else{
							Name2="-";
							Sec2="-";
						}
						
						if(d.properties.bestSec3){
							Name3=d.properties.bestName3;
							Sec3=d.properties.bestSec3;
						}else{
							Name3="-";
							Sec3="-";
						}					
					}
					
					//Hover Color;
					d3.select(this)
					  .transition()
					  .style("fill",function(d){
						if(Sec1 && Sec1 !== "-"){
							return "red";
						} else{
							return "#CCC";
						}
					 });
					
					//Update Row 1;
					d3.select("#name1")
						.text(Name1);
						
					d3.select("#sec1")
						.text(Sec1);
						
					//Update Row 1;
					d3.select("#name2")
						.text(Name2);
						
					d3.select("#sec2")
						.text(Sec2);
						
					//Update Row 1;
					d3.select("#name3")
						.text(Name3);
						
					d3.select("#sec3")
						.text(Sec3);
						
					//Update State Name;
					d3.select("#titleState")
						.text(stateName);
						
					//Hide Text;
					d3.select("#hideText").classed("hidden",true);
					
					//Unhide Table;
					d3.select("#table table").classed("hidden",false);	
				}
		   })
		   .on("mouseout",function(d){
			   if(d.properties.name === "Mississippi"){
					//Unhide Text;
					d3.select("#hideText").classed("hidden",false);
					
					//Hide Table;
					d3.select("#missExplain").classed("hidden",true);				   
			   } else{
					//Update Row 1;
					d3.select("#name1")
						.text("-");
						
					d3.select("#sec1")
						.text("-");
						
					//Update Row 1;
					d3.select("#name2")
						.text("-");
						
					d3.select("#sec2")
						.text("-");
						
					//Update Row 1;
					d3.select("#name3")
						.text("-");
						
					d3.select("#sec3")
						.text("-");
						
					//Update State Name;
					d3.select("#titleState")
						.text("State");
					
					//Unhide Text;
					d3.select("#hideText").classed("hidden",false);
					
					//Hide Table;
					d3.select("#table table").classed("hidden",true);				   
			   }
				
				//Reset Color;
				if(radioVal === "avg"){
					d3.select(this)
					  .transition()
					  .style("fill",function(d){
						if(d.properties.avgSec1){
							return "hsl(220,100%, " + Math.round(colScale(d.properties.avgSec1)) + "%)";
						} else{
							return "#777";
						}
					 });
				} else if(radioVal === "best"){
					d3.select(this)
					  .transition()
					  .style("fill",function(d){
						if(d.properties.bestSec1){
							return "hsl(220,100%, " + Math.round(colScale(d.properties.bestSec1)) + "%)";
						} else{
							return "#777";
						}
					 });							
				}
		   });
		   
		//Radio Button;
		d3.selectAll("input")
			.on("click", function() {
				radioVal = d3.select(this).node().value;

				if(radioVal === "avg"){
					//Update Color Scale;							 
					colScale = d3.scaleLinear()
								 .domain([
									d3.min(usdata,function(d){ return d.avgSeconds1; }),
									d3.max(usdata,function(d){ return d.avgSeconds1; })
								 ])
								 .range([90,10]);
								 
					//Update Colors;
					svg.selectAll(".state")
						 .style("fill",function(d){
							if(d.properties.avgSec1){
								return "hsl(220,100%, " + Math.round(colScale(d.properties.avgSec1)) + "%)";
							} else{
								return "#777";
							}
						 });
						 
					//Update Table Title;
					d3.select("#tableTitle")
						.text("Average");
				
				} else if(radioVal === "best"){
					//Update Color Scale;							 
					colScale = d3.scaleLinear()
								 .domain([
									d3.min(usdata,function(d){ return d.bestSeconds1; }),
									d3.max(usdata,function(d){ return d.bestSeconds1; })
								 ])
								 .range([90,10]);
								 
					//Update Colors;
					svg.selectAll(".state")
						 .style("fill",function(d){
							if(d.properties.bestSec1){
								return "hsl(220,100%, " + Math.round(colScale(d.properties.bestSec1)) + "%)";
							} else{
								return "#777";
							}
						 });
						 
					//Update Table Title;
					d3.select("#tableTitle")
						.text("Best");
				}
			});
	})
})