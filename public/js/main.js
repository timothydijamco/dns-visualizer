var stage = new Konva.Stage({
   container: 'canvasContainer',
   width: document.getElementById("canvasContainer").clientWidth,
   height: window.innerHeight
});

var nodeLayer = new Konva.Layer();
stage.add(nodeLayer);

var nodes = [
   {
      type: "HOST",
      name: "Host A",
      x: 100,
      y: 450
   },
   {
      type: "SERVER",
      name: "Local NS",
      x: 300,
      y: 450
   },
   {
      type: "SERVER",
      name: "Root NS",
      x: 900,
      y: 50
   },
   {
      type: "SERVER",
      name: ".edu NS",
      x: 750,
      y: 250
   },
   {
      type: "SERVER",
      name: ".com NS",
      x: 1050,
      y: 250
   },
   {
      type: "SERVER",
      name: "google.com NS",
      x: 600,
      y: 450
   },
   {
      type: "SERVER",
      name: "umass.edu NS",
      x: 1200,
      y: 450
   }
]

var imageSources = ["./image/desktop.png", "./image/server.png"];
loadImages(imageSources, (imageObjs) => {
   const hostImageObj = imageObjs[0];
   const serverImageObj = imageObjs[1];

   for (var i = 0; i < nodes.length; i++) {
      var imageObj;
      if (nodes[i].type == "HOST") {
         imageObj = hostImageObj;
      } else if (nodes[i].type == "SERVER") {
         imageObj = serverImageObj;
      }
      var image = new Konva.Image({
         x: nodes[i].x,
         y: nodes[i].y,
         image: imageObj,
         width: 96,
         height: 96
      });
      var text = new Konva.Text({
         x: nodes[i].x-48,
         y: nodes[i].y + 96 + 16,
         width: 192,
         align: "center",
         fontFamily: "Open Sans",
         fontSize: 18,
         text: nodes[i].name,
      })
      nodeLayer.add(image);
      nodeLayer.add(text)
   }

   nodeLayer.draw();
});


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
