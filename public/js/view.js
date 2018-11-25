// Constants
const imageSources = ["./image/desktop.png", "./image/server.png"];



// Collections of views
var nodeViews = {};
var arrows = [];



// Konva setup

var stage = new Konva.Stage({
   container: 'canvasContainer',
   width: document.getElementById("canvasContainer").clientWidth,
   height: window.innerHeight
});

var nodeLayer = new Konva.Layer();
var arrowLayer = new Konva.Layer();
stage.add(nodeLayer);
stage.add(arrowLayer);



// Functions

function createNodeViews(nodes) {
   loadImages(imageSources, (imageObjs) => {
      const hostImageObj = imageObjs[0];
      const serverImageObj = imageObjs[1];

      for (let key in nodes) {
         if (nodes.hasOwnProperty(key)) {
            let imageObj;
            if (nodes[key].type == "HOST") {
               imageObj = hostImageObj;
            } else if (nodes[key].type == "SERVER") {
               imageObj = serverImageObj;
            }
            let image = new Konva.Image({
               x: nodes[key].x,
               y: nodes[key].y,
               image: imageObj,
               width: 96,
               height: 96,
               id: key
            });
            let text = new Konva.Text({
               x: nodes[key].x-48,
               y: nodes[key].y + 96 + 16,
               width: 192,
               align: "center",
               fontFamily: "Open Sans",
               fontSize: 18,
               text: nodes[key].name,
               id: key + "Text"
            });
            image.on('click', function() {
               unhighlightAllNodeViews();
               highlightNodeView(nodes[image.id()], image.id());
               updateNameserverDetailsView(nodes[image.id()]);
            });
            nodeLayer.add(image);
            nodeLayer.add(text);
         }
      }

      nodeLayer.draw();
   });
}

function createPacketViews(packets, nodes) {
   for (var i = 0; i < packets.length; i++) {
      let startNodeKey = packets[i].startNodeKey;
      let endNodeKey = packets[i].endNodeKey;
      let startNode = nodes[startNodeKey];
      let endNode = nodes[endNodeKey];
      let packetType = packets[i].type;

      if (startNode.x <= endNode.x) {
         var arrowStartX = startNode.x + 96 + 16;
         var arrowEndX = endNode.x - 16;
      } else {
         var arrowStartX = startNode.x - 16;
         var arrowEndX = endNode.x + 96 + 16;
      }
      if (packetType === "REQUEST") {
         var arrowStartY = startNode.y + 96/3;
         var arrowEndY = endNode.y + 96/3;
      } else {
         var arrowStartY = startNode.y + 2*96/3;
         var arrowEndY = endNode.y + 2*96/3;
      }
      let arrow = new Konva.Arrow({
         x: arrowStartX,
         y: arrowStartY,
         points: [0,0, arrowEndX-arrowStartX, arrowEndY-arrowStartY],
         pointerLength: 15,
         pointerWidth : 10,
         fill: 'black',
         stroke: 'black',
         strokeWidth: 4,
         opacity: 0.0
      });
      arrows.push(arrow);
      arrowLayer.add(arrow);
      arrowLayer.draw();
   }
}

function highlightPacketView(packetId) {
   arrows[packetId].fill("red");
   arrows[packetId].stroke("red");
   arrows[packetId].opacity(1.0);
   arrowLayer.draw();
}

function unhighlightAllPacketViews() {
   for (var i = 0; i < packets.length; i++) {
      if (arrows[i].opacity() != 0.0) {
         arrows[i].fill("black");
         arrows[i].stroke("black");
         arrows[i].opacity(0.2);
      }
   }
   arrowLayer.draw();
}

function hidePacketView(packetId) {
   arrows[packetId].opacity(0.0);
   arrowLayer.draw();
}

function highlightNodeView(node, nodeId) {
   nodeLayer.find("#" + nodeId + "Text").fill("red");
   nodeLayer.find("#" + nodeId + "Text").fontStyle("bold");
   nodeLayer.draw();
}

function unhighlightAllNodeViews() {
   nodeLayer.find("Text").fill("black");
   nodeLayer.find("Text").fontStyle("normal");
   nodeLayer.draw();
}

function updatePacketDetailsView(packet) {
   let startNode = nodes[packet.startNodeKey];
   let endNode = nodes[packet.endNodeKey];

   $("#sourceNodeText").html("Source: " + startNode.name);
   $("#destinationNodeText").html("Destination: " + endNode.name);

   if (packet.type == "REQUEST") {
      $("#packetDetailsHeader").html("DNS Request");
   } else {
      $("#packetDetailsHeader").html("DNS Response");
   }
}

function updateNameserverDetailsView(node) {
   $("#nameserverDetailsHeader").html(node.name);
   $("#nameserverDetails").html("");
   for (let i = 0; i < node.records.length; i++) {
      let record = node.records[i];
      $("#nameserverDetails").append(record.hostname + " " + record.type + " " + record.ipAddress + "<br />");
   }
}

function loadImages(sources, callback) {
   let numImagesLoaded = 0;
   let callbackCalled = false;
   let imageObjs = [];
   for (let i = 0; i < sources.length; i++) {
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
