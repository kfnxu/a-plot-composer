import * as d3 from 'd3';
import * as topojson from 'topojson';
import React from 'react';
import ReactDOM from 'react-dom';


export default class DataMap extends React.Component {
    constructor(props){
      super(props);
      this.dm = null;
    }

    updateData(){ 
       return; 
    }

    renderMap(){

        var width = 400,
        height = 300;

        var projection = d3.geoMercator()
                  .scale(width / 2 / Math.PI)
                  //.scale(100)
                  .translate([width / 2, height / 2])

        var path = d3.geoPath()
            .projection(projection);

        var svg = d3.select("#dm-container").append("svg")
                    .attr("width", width)
                    .attr("height", height);

        d3.json("/world.topo.json", function(error, geoData) {
           console.log(geoData.objects.national, geoData);
           svg.append("path")
              .datum(topojson.feature(geoData, geoData.objects.national))
              .attr('width', '100%') 
              .attr('height', '100%')
              .attr("d", path);
        });
   }
  
    componentDidMount(){
      //const mapContainer = d3.select('#dm-container');
      this.dm = this.renderMap();
    }
 
    componentDidUpdate(){
       //this.dm.updateChoropleth(this.updateData());
    }
 
    componentWillUnmount(){
       d3.select('svg').remove();
    }
 
    render() {
      return (
         <div id="dm-container" style={{position: 'relative', width: '500px', height: '450px', offsetWidth: '520px', offsetHeight: '470px' }}></div>
      );
    }
 
}



