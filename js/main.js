/* 
/ Main script that acts as the entry point for the application
*/

requirejs.config({
    baseUrl:'',
    paths: {
        backbone: 'lib/backbone/backbone-min',
        bootstrap: 'lib/bootstrap/js/bootstrap.min',
        d3: 'lib/d3/d3.min',
        jquery: 'lib/jquery/jquery.min',
        jqueryui: 'lib/jquery-ui/jquery-ui.min',
        underscore: 'lib/underscore/underscore-min'
    }
})

// Main application single entry point
requirejs([ 
    'jquery', 
    'd3',
    'js/data',
    'js/models/network',
    'js/views/network',
], function($, d3, graph, NetworkModel, NetworkView) {
    
    var network_model = new NetworkModel(graph);
    
    var network_view = new NetworkView({ model: network_model });
    
    network_view.draw();
    
});