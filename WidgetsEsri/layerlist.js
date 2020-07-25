define(null,[
    "esri/widgets/LayerList",
    "esri/core/watchUtils",
    "esri/widgets/Expand"
  ], function(LayerList, watchUtils, Expand) {

    var addLayerList = function(view){
        const layerList = new LayerList({
            view: view,
            container: LayerListDiv
          });
          view.ui.add(layerList, "top-right");
    
          var btnLayerList = document.getElementById("viewLayerList");
          var layerlistDiv = document.getElementById("LayerListDiv");

    function fadeVisibilityOn(layer, view) {
      let animating = true;
      let opacity = 0;

      const finalOpacity = layer.opacity;
      layer.opacity = opacity;

      view.whenLayerView(layer).then(function(layerView) {
        function incrementOpacityByFrame() {
          if (opacity >= finalOpacity && animating) {
            animating = false;
            return;
          }

          layer.opacity = opacity;
          opacity += 0.05;

          requestAnimationFrame(incrementOpacityByFrame);
        }

        // Wait for tiles to finish loading before beginning the fade
        watchUtils.whenFalseOnce(layerView, "updating", function(updating) {
          requestAnimationFrame(incrementOpacityByFrame);
        });
      });
    }

    view.when().then(function() {
      // When the user toggles a layer on, transition
      // the layer's visibility using opacity
      layerList.operationalItems.forEach(function(item) {
        item.watch("visible", function(visible) {
          if (visible) {
            fadeVisibilityOn(item.layer);
          }
        });
      });
    });
    const editExpand = new Expand({
      expandIconClass: "esri-icon-visible",
      expandTooltip: "LayersList",
      expanded: false,
      view: view,
      content: LayerListDiv
    });
    view.ui.add(editExpand, "top-left");
     console.log("toto", view)
  }
  
    return {
        addLayerList : addLayerList,
    }
  });
