define([
    "jquery",
    "d3",
    "backbone"
], function($, d3, backbone) {
    
    var NetworkView = backbone.View.extend({
        
        width: 960,
        height: 500,

        initialize: function(){
            // must pass in model property to work.
            // Create a d3 svg region
            this.svg = d3.select("body").append("svg")
                .attr("width", this.width)
                .attr("height", this.height);
        },

        build: function() {
            // Initialize a force simulation. 
            this.force = d3.layout.force()
                .charge(this.model.get("charge"))
                .linkDistance(this.model.get("distance"))
                .size([this.width, this.height])
                .nodes(this.model.get("nodes"))
                .links(this.model.get("links"))
                .start();

        },

        draw_nodes: function(){
            var color = d3.scale.category20();
            
            this.nodes = this.svg.selectAll(".node")
                .data(this.model.get("nodes"))
                .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 5)
                    .style("fill", function(d) { return color(d.group); })
                    .call(this.force.drag);
            
            // Add node name is wanted.
            this.nodes.append("title")
                    .text(function(d) { return d.name; });
        },
        
        draw_links: function(){
            
            this.links = this.svg.selectAll(".link")
                .data(this.model.get("links"))
                .enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", function(d) { return Math.sqrt(d.value); });
        },
        
        
        start: function() {            
            // set initial positions
            var links = this.links;
            var nodes = this.nodes; 
            
            this.force.on("tick", function() {
                links.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                nodes.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
            });

        },
        
        draw: function() {
            this.build()
            this.draw_links();
            this.draw_nodes();
            this.start()
        },
        
    });
    
    return NetworkView;
});