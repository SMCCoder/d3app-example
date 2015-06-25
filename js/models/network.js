define([
    "jquery",
    "d3",
    "backbone"
], function($, d3, backbone) {
    
    var NetworkModel = backbone.Model.extend({
         
        defaults: {
            "nodes": [],
            "links": [],
            "charge": -120,
            "distance": 30
            
        },
        
        initialize: function(data){
            this.set({
                "nodes": data.nodes,
                "links": data.links
            })
        },
    });
    
    return NetworkModel;
});