require.config({
    paths: {
        jquery: './jquery',
        lodash: './lodash',
        backbone: './backbone'
    },
    map: {
        '*': {
            // Backbone requires underscore. This forces requireJS to load lodash instead:
            'underscore': 'lodash'
        }
    }
});

// Now we're ready to require JointJS and write our application code.
require(['joint'], function(joint) {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ width: 600, height: 400, model: graph });

    var elApp = document.getElementById('app');
    elApp.appendChild(paper.el);

    var rect = new joint.shapes.basic.Rect({
        position: { x: 50, y: 50 },
        size: { width: 100, height: 100 }
    });
    graph.addCell(rect);
});