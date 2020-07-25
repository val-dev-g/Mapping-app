      define(null,[
        "esri/widgets/Legend",
        "esri/widgets/Expand"
      ], function(Legend, Expand) {
        var btnLegend = document.getElementById("buttonLegend");
        var legend = document.getElementById("LegendDiv");

        
        var addLegend = function(view){

          var legend = new Legend({
            view: view,
            container: legend,
            layerInfos: [

            ]
          });

        const editExpand = new Expand({
          expandIconClass: "esri-icon-labels",
          expandTooltip: "Legend",
          expanded: false,
          view: view,
          content: legend
        });
        view.ui.add(editExpand, "top-left");
         };

        return {
            addLegend : addLegend
        }
        
      });


