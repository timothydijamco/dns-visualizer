// Constants
const imageSources = ["./image/desktop.png", "./image/server.png"];



// State
var detailedView = false;
var packetBeingViewed;
var nodeBeingViewed;



// Collections of views

var nodeViews = {};
var arrows = [];



// Konva setup

var stage = new Konva.Stage({
   container: 'canvasContainer',
   width: $("#canvasContainer").width(),
   height: window.innerHeight
});

var nodeLayer = new Konva.Layer();
var arrowLayer = new Konva.Layer();
stage.add(nodeLayer);
stage.add(arrowLayer);



// Functions

function enableDetailedView() {
   detailedView = true;

   if (packetBeingViewed) {
      updatePacketDetailsView(packetBeingViewed);
   }

   if (nodeBeingViewed) {
      updateNameserverDetailsView(nodeBeingViewed);
   }
}

function disableDetailedView() {
   detailedView = false;

   if (packetBeingViewed) {
      updatePacketDetailsView(packetBeingViewed);
   }

   if (nodeBeingViewed) {
      updateNameserverDetailsView(nodeBeingViewed);
   }
}

function createBoard(nodes) {
   let maxCol = 0;
   let maxRow = 0;
   for (const key in nodes) {
      maxCol = Math.max(maxCol, nodes[key].col);
      maxRow = Math.max(maxRow, nodes[key].row);
   }
   return new Board(
      $("#canvasContainer").width(),
      $("#canvasContainer").height(),
      maxCol + 1,
      maxRow + 1
   );
}

function createNodeViews(nodes, board) {
   loadImages(imageSources, (imageObjs) => {
      const hostImageObj = imageObjs[0];
      const serverImageObj = imageObjs[1];

      for (const key in nodes) {
         if (nodes.hasOwnProperty(key)) {
            let imageObj;
            if (nodes[key].type == "HOST") {
               imageObj = hostImageObj;
            } else if (nodes[key].type == "SERVER") {
               imageObj = serverImageObj;
            }
            let image = new Konva.Image({
               x: board.getCellContentsTopLeftX(nodes[key].col),
               y: board.getCellContentsTopLeftY(nodes[key].row),
               image: imageObj,
               width: board.getCellContentsWidth(),
               height: board.getCellContentsHeight(),
               id: key
            });
            let text = new Konva.Text({
               x: board.getCellContentsTopLeftX(nodes[key].col),
               y: board.getCellContentsTopLeftY(nodes[key].row) + board.getCellContentsHeight() + 16,
               width: board.getCellContentsWidth(),
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

      if (startNode.col <= endNode.col) {
         var arrowStartX = board.getCellContentsTopLeftX(startNode.col) + board.getCellContentsWidth() + 16;
         var arrowEndX = board.getCellContentsTopLeftX(endNode.col) - 16;
      } else {
         var arrowStartX = board.getCellContentsTopLeftX(startNode.col) - 16;
         var arrowEndX = board.getCellContentsTopLeftX(endNode.col) + board.getCellContentsWidth() + 16;
      }
      if (packetType === "REQUEST") {
         var arrowStartY = board.getCellContentsTopLeftY(startNode.row) + board.getCellContentsWidth()/3;
         var arrowEndY = board.getCellContentsTopLeftY(endNode.row) + board.getCellContentsWidth()/3;
      } else {
         var arrowStartY = board.getCellContentsTopLeftY(startNode.row) + 2*board.getCellContentsWidth()/3;
         var arrowEndY = board.getCellContentsTopLeftY(endNode.row) + 2*board.getCellContentsWidth()/3;
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
   packetBeingViewed = packet;

   let startNode = nodes[packet.startNodeKey];
   let endNode = nodes[packet.endNodeKey];

   $("#packetDetailsSourceDestTable").html("");
   if (!detailedView) {
      $("#packetDetailsSourceDestTable").append("<tr><td><b>Source</b></td><td>" + startNode.name + "</td></tr>");
      $("#packetDetailsSourceDestTable").append("<tr><td><b>Destination</b></td><td>" + endNode.name + "</td></tr>");

      $("#packetDetailsTable").html("");
      $("#packetDetailsTable").append("<tr><td>" + packet.description + "</td></tr>");
   } else {
      $("#packetDetailsSourceDestTable").append("<tr><td><b>Source</b></td><td>" + startNode.name + " (" + startNode.ipAddress + ")</td></tr>");
      $("#packetDetailsSourceDestTable").append("<tr><td><b>Destination</b></td><td>" + endNode.name + " (" + endNode.ipAddress + ")</td></tr>");

      $("#packetDetailsTable").html("");
      let sections = [
         {key: "questionSection", name: "Question Section"},
         {key: "answerSection", name: "Answer Section"},
         {key: "authoritativeSection", name: "Authoritative Section"},
         {key: "additionalSection", name: "Additional Section"}
      ];
      for (const section of sections) {
         if (packet.hasOwnProperty(section.key)) {
            $("#packetDetailsTable").append("<tr><td colspan='4'>" + section.name + "</td></tr>");
            if (packet[section.key].length == 0) {
               $("#packetDetailsTable").append("<tr><td>Empty</td></tr>");
            } else {
               for (let i = 0; i < packet[section.key].length; i++) {
                  $("#packetDetailsTable").append("<tr><td>" + packet[section.key][i].hostname + "</td><td>" + packet[section.key][i].type + "</td><td>" + packet[section.key][i].ipAddress + "</td></tr>");
               }
            }
         }
      }
   }



   if (packet.type == "REQUEST") {
      $("#packetDetailsHeader").html("DNS Request");
   } else {
      $("#packetDetailsHeader").html("DNS Response");
   }
}

function updateNameserverDetailsView(node) {
   nodeBeingViewed = node;

   $("#nameserverDetailsHeader").html(node.name);

   if (!detailedView) {
      $("#nameserverDetailsHostnameIpTable").html("");
   } else {
      $("#nameserverDetailsHostnameIpTable").html("");
      $("#nameserverDetailsHostnameIpTable").append("<tr><td>Hostname</td><td>" + node.hostname + "</td></tr>");
      $("#nameserverDetailsHostnameIpTable").append("<tr><td>IP Address</td><td>" + node.ipAddress + "</td></tr>");
   }

   $("#nameserverDetailsTable").html("");
   if (node.records.length > 0) {
      $("#nameserverDetailsTable").append("<tr><td colspan='3'>Records</td></tr>");
   }
   for (let i = 0; i < node.records.length; i++) {
      let record = node.records[i];
      $("#nameserverDetailsTable").append("<tr><td>" + record.hostname + "</td><td>" + record.type + "</td><td>" + record.ipAddress + "</td></tr>");
   }
}

function emptyPacketDetailsView() {
   packetBeingViewed = null;

   $("#packetDetailsSourceDestTable").html("");
   $("#packetDetailsTable").html("");
   $("#packetDetailsHeader").html("");
}

function emptyNameserverDetailsView() {
   nodeBeingViewed = null;

   $("#nameserverDetailsHeader").html("");
   $("#nameserverDetailsHostnameIpTable").html("");
   $("#nameserverDetailsTable").html("");
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


// Classes

var Board = function(width, height, cols, rows) {
   this.width = width;
   this.height = height;

   this.colWidth = this.width / cols;
   this.rowHeight = (this.height - 120) / rows;
   this.cellWH = Math.min(this.colWidth, this.rowHeight);
   this.cellContentsWH = this.cellWH * 0.6;
   this.cellPadding = this.cellWH * 0.2;

   this.getCellContentsTopLeftX = function(col) {
      return this.cellPadding + col*this.colWidth;
   }

   this.getCellContentsTopLeftY = function(row) {
      return this.cellPadding + row*this.rowHeight;
   }

   this.getCellContentsWidth = function() {
      return this.cellContentsWH;
   }

   this.getCellContentsHeight = function() {
      return this.cellContentsWH;
   }
}
