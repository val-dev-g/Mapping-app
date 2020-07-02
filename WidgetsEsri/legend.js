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
              // {
              //   // layer: featureLayer,
              //   title: "NY Educational Attainment"
              // }
            ]
          });
          // btnLegend.addEventListener("click", function () {
          //   legend.classList.toggle("hidden");
          // });

          // Add widget to the bottom right corner of the view
          // view.ui.add(legend, "top-right");
          // view.ui.add(btnLegend, "top-right");
      
        const editExpand = new Expand({
          expandIconClass: "esri-icon-labels",
          expandTooltip: "Legend",
          expanded: false,
          view: view,
          content: legend
        });
        view.ui.add(editExpand, "top-left");
         };
        // var expand = new Expand({
        //   expandIconClass: "esri-icon-labels",
        //   view: view,
        //   content: legendWidget
        // });
        // view.ui.add(expand, "top-left");

        return {
            addLegend : addLegend
        }
        
      });


