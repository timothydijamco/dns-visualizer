var stage = new Konva.Stage({
   container: 'canvasContainer',
   width: document.getElementById("canvasContainer").clientWidth,
   height: window.innerHeight
});

var nodeLayer = new Konva.Layer();
var arrowLayer = new Konva.Layer();
stage.add(nodeLayer);
stage.add(arrowLayer);

var nodes = {
   hostA: {
      type: "HOST",
      name: "Host A",
      x: 100,
      y: 450
   },
   localNS: {
      type: "SERVER",
      name: "Local NS",
      x: 300,
      y: 450
   },
   rootNS: {
      type: "SERVER",
      name: "Root NS",
      x: 900,
      y: 50
   },
   eduNS: {
      type: "SERVER",
      name: ".edu NS",
      x: 750,
      y: 250
   },
   comNS: {
      type: "SERVER",
      name: ".com NS",
      x: 1050,
      y: 250
   },
   umassNS: {
      type: "SERVER",
      name: "umass.edu NS",
      x: 600,
      y: 450
   },
   googleNS: {
      type: "SERVER",
      name: "google.com NS",
      x: 1200,
      y: 450
   }
};

var packets = [
   {
      type: "REQUEST",
      startNode: nodes.hostA,
      endNode: nodes.localNS
   },
   {
      type: "RESPONSE",
      startNode: nodes.localNS,
      endNode: nodes.hostA
   }
]


var imageSources = ["./image/desktop.png", "./image/server.png"];
loadImages(imageSources, (imageObjs) => {
   const hostImageObj = imageObjs[0];
   const serverImageObj = imageObjs[1];

   for (var key in nodes) {
      if (nodes.hasOwnProperty(key)) {
         var imageObj;
         if (nodes[key].type == "HOST") {
            imageObj = hostImageObj;
         } else if (nodes[key].type == "SERVER") {
            imageObj = serverImageObj;
         }
         var image = new Konva.Image({
            x: nodes[key].x,
            y: nodes[key].y,
            image: imageObj,
            width: 96,
            height: 96
         });
         var text = new Konva.Text({
            x: nodes[key].x-48,
            y: nodes[key].y + 96 + 16,
            width: 192,
            align: "center",
            fontFamily: "Open Sans",
            fontSize: 18,
            text: nodes[key].name,
         })
         nodeLayer.add(image);
         nodeLayer.add(text);
      }
   }

   nodeLayer.draw();
});


for (var i = 0; i < packets.length; i++) {
   console.log(packets[i].startNode);
   drawArrow(packets[i].startNode, packets[i].endNode, packets[i].type);
}



function drawArrow(startNode, endNode, type) {
   if (startNode.x <= endNode.x) {
      var arrowStartX = startNode.x + 96 + 16;
      var arrowEndX = endNode.x - 16;
   } else {
      var arrowStartX = startNode.x - 16;
      var arrowEndX = endNode.x + 96 + 16;
   }
   if (type === "REQUEST") {
      var arrowStartY = startNode.y + 96/3;
      var arrowEndY = endNode.y + 96/3;
   } else {
      var arrowStartY = startNode.y + 2*96/3;
      var arrowEndY = endNode.y + 2*96/3;
   }
   var arrow = new Konva.Arrow({
      x: arrowStartX,
      y: arrowStartY,
      points: [0,0, arrowEndX-arrowStartX, arrowEndY-arrowStartY],
      pointerLength: 15,
      pointerWidth : 10,
      fill: 'red',
      stroke: 'red',
      strokeWidth: 4
   });
   arrowLayer.add(arrow);
   arrowLayer.draw();
}



function loadImages(sources, callback) {
   var numImagesLoaded = 0;
   var callbackCalled = false;
   var imageObjs = [];
   for (var i = 0; i < sources.length; i++) {
      imageObjs.push(new Image());
      imageObjs[i].src = sources[i];
      imageObjs[i].onload = function() {
         numImagesLoaded++;
         if (numImagesLoaded == sources.length && !callbackCalled) {
            callbackCalled = true;
            callback(imageObjs);
         }
      }
   }
}
