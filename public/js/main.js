var currentPacket = -1;

createNodeViews(nodes);
createPacketViews(packets, nodes);

$("#nextStepButton").click(function() {
   if (currentPacket < packets.length-1) {
      currentPacket++;

      var endNodeKey = packets[currentPacket].endNodeKey;
      var endNode = nodes[endNodeKey];

      unhighlightAllPacketViews();
      highlightPacketView(currentPacket);

      unhighlightAllNodeViews();
      highlightNodeView(endNode, endNodeKey);
      updateNameserverDetailsView(endNode);

      updatePacketDetailsView(packets[currentPacket]);
   }
});

$("#previousStepButton").click(function() {
   if (currentPacket >= 0) {
      hidePacketView(currentPacket);

      currentPacket--;

      if (currentPacket != -1) {
         var endNodeKey = packets[currentPacket].endNodeKey;
         var endNode = nodes[endNodeKey];
         highlightPacketView(currentPacket);
         unhighlightAllNodeViews();
         highlightNodeView(endNode, endNodeKey);
         updateNameserverDetailsView(endNode);
      }
   }
});
