let currentPacket = -1;

let board = createBoard(nodes);
createNodeViews(nodes, board);
createPacketViews(packets, nodes);

$("#nextStepButton").click(function() {
   if (currentPacket < packets.length-1) {
      currentPacket++;

      var endNodeKey = packets[currentPacket].endNodeKey;
      var endNode = nodes[endNodeKey];

      unhighlightAllPacketViews();
      highlightPacketView(currentPacket);
      updatePacketDetailsView(packets[currentPacket]);

      if (packets[currentPacket].type =="REQUEST") {
         unhighlightAllNodeViews();
         highlightNodeView(endNode, endNodeKey);
         updateNameserverDetailsView(endNode);
      }
   }
});

$("#previousStepButton").click(function() {
   if (currentPacket >= 0) {
      hidePacketView(currentPacket);
      unhighlightAllNodeViews();

      currentPacket--;

      if (currentPacket != -1) {
         var endNodeKey = packets[currentPacket].endNodeKey;
         var endNode = nodes[endNodeKey];

         highlightPacketView(currentPacket);
         updatePacketDetailsView(packets[currentPacket]);

         highlightNodeView(endNode, endNodeKey);
         updateNameserverDetailsView(endNode);
      } else {
         emptyPacketDetailsView();
         emptyNameserverDetailsView();
      }
   }
});

$("#toggleCheckbox").change(function() {
   if (this.checked) {
      enableDetailedView();
   } else {
      disableDetailedView();
   }
});
