require(["dojo/ready"], function (ready) {

  ready(

    require([
      "esri/Map",
      "esri/views/MapView",
      "esri/widgets/Search",
      "esri/widgets/BasemapGallery",
      "esri/widgets/ScaleBar",
      "esri/widgets/Home",
      "esri/widgets/CoordinateConversion",
      "esri/widgets/Bookmarks",
      "esri/widgets/Expand",
      "esri/widgets/DistanceMeasurement2D",
      "esri/widgets/AreaMeasurement2D",
      "esri/WebMap",
      "./state.js",
      "./WidgetsEsri/BasicEditor.js",
      "./WidgetsEsri/deadanimal.js",
      "./WidgetsEsri/legend.js",
      "./WidgetsEsri/layerlist.js",
    ],
      function (
        Map,
        MapView,
        Search,
        BasemapGallery,
        ScaleBar,
        Home,
        CoordinateConversion,
        Bookmarks,
        Expand,
        DistanceMeasurement2D,
        AreaMeasurement2D,
        WebMap,
        state,
        Editor,
        DeadAnimal,
        Legend,
        LayerList      
      ) {

        let webMap = new WebMap({
          portalItem: {
            id: "6c5d657f1cb04a5eb78a450e3c699c2a",
          }
        });

        let map = new Map({

        });
      
        // console.clear()

        // get ui elements references 

        var WidgetDiv = document.getElementById("widgetPanelDiv");
        var viewDiv = document.getElementById("ViewDiv");
        var mapcolumn = document.getElementById("mapcolumn");
        var btnsidebar = document.getElementById("sidebarCollapse");
        var sidebar = document.getElementById("sidebar");
        var galleryContainer = document.getElementById("GalleryDiv")
        var animalsContainer = document.getElementById("AnimalsDiv")
        var editorContainer = document.getElementById("EditorDiv")

        btnsidebar.addEventListener("click", function () {

          // console.log("state beeing used", state)

          state.sidebaropen = !state.sidebaropen,
            state.widgetsPanelOpen = state.widgetsPanelOpen,

            updateUi()

        });
        //--------------------------------------------------------------
        var view = new MapView({
          scale: 123456789,
          container: viewDiv,
          map: map,
          // italy
          // zoom: 5,
          // center: [12, 43], // longitude, latitude
          // usa
          center: [-117.18, 34.06],
          zoom: 15
        });

        // var animalExpand = DeadAnimal.createExpand(view)
        // DeadAnimal.addExpand(view)
        //add featreLayer to the map. Not the viewMap
        DeadAnimal.addFeatureLayer(map)
        DeadAnimal.addFeatureForm(view)
        DeadAnimal.selectExistingFeature(view)
        DeadAnimal.addTemplateHander(view)
        DeadAnimal.addButtonsHandlers(view)
        DeadAnimal.addFeatureForm(view)
        DeadAnimal.applyEditsToIncidents(view)
        DeadAnimal.selectFeature(view)
        DeadAnimal.toggleEditingDivs(view)
        DeadAnimal.unselectFeature(view)
        Legend.addLegend(view)
        LayerList.addLayerList(view)
        view.map = webMap
        Editor.addEditor(view)

        // ------------------------- SEARCH ---------------------------
        // An open data address search API for France
        var buttonsearchLink = document.getElementById("viewSearchLink");
        var searchWidget = new Search({
          view: view,
          container: "SearchDiv"
        });

        // ----------------------- BaseMapGallery ---------------------------
        var buttongalleryLink = document.getElementById("viewGalleryLink");
        let basemapGallery = new BasemapGallery({

          view: view,
          container: galleryContainer,
        });


        buttongalleryLink.addEventListener("click", function () {
          toggleWidget("gallery");
        })

        var closeAllWidgets = function () {
          // console.log("close all widgets")
          state.animalsShown = false;
          state.galleryShown = false;
          state.animalsShown = false;
          state.widgetsPanelOpen = false;
          updateUi();
        }
        var closeWidgetsPanelButton = document.getElementById("galleryClose");
        closeWidgetsPanelButton.addEventListener("click", closeAllWidgets)

        // update Ui classes

        var updateUi = function () {

          // console.log("update Ui")
          // console.log("state in update ui", state)

          WidgetDiv.className = ""
          var newGalleryClass = state.getWidgetsPanelClass()
          newGalleryClass.forEach(function (el) {
            WidgetDiv.classList.add(el)
          })

          sidebar.className = ""
          var newSidebarClass = state.getSidebarClass()
          newSidebarClass.forEach(function (el) {
            sidebar.classList.add(el)
          })

          mapcolumn.className = ""
          var newclass = state.getMapClass()
          newclass.forEach(function (el) {
            mapcolumn.classList.add(el)
          })

          editorContainer.className = ""
          var newEditorClass = state.getEditorContainerClass()
          // console.log("newEditorClass", newEditorClass)
          // console.log("editorContainer", editorContainer)
          newEditorClass.forEach(function (el) {
            editorContainer.classList.add(el);
          })

          animalsContainer.className = ""
          var newAnimalsClass = state.getAnimalsContainerClass()
          newAnimalsClass.forEach(function (el) {
            animalsContainer.classList.add(el)
          })

          galleryContainer.className = ""
          var newGalleryClass = state.getGalleryContainerClass()
          // console.log("galleryContainer", galleryContainer)
          // console.log("newGalleryClasses", newGalleryClass)
          newGalleryClass.forEach(function (el) {
            console.log(el)
            galleryContainer.classList.add(el)
          })

        }

        // ------------------ Basic Editor & panel--------------------------
        var toggleWidget = function (widgetName) {
          if (widgetName == "editor"){
            view.map = webMap
          } 
          if (widgetName == "animals"){
            view.map = map
          }
          console.log("toggleWidget function closing :", widgetName)
          
          if (state.widgetsPanelOpen == false) {
            // if panel closed open it and show widget (hide others)
            state.widgetsPanelOpen = true
            state.editorShown = (widgetName == "editor")
            state.galleryShown = (widgetName == "gallery")
            state.animalsShown = (widgetName == "animals")

          } else {

            switch (widgetName) { 
              case "editor": 
                if (state.editorShown == true) { 
                  state.editorShown = false
                  state.widgetsPanelOpen = false
                } else { 
                  state.editorShown = (widgetName == "editor") // ouvre l'éditor
                  state.galleryShown = (widgetName == "gallery") // cache
                  state.animalsShown = (widgetName == "animals") // cache
                  state.widgetsPanelOpen = true
                }
                break; 
              case "gallery": 
                if (state.galleryShown == true) { 
                  state.galleryShown = false
                  state.widgetsPanelOpen = false
                } else {
                  state.editorShown = (widgetName == "editor")
                  state.galleryShown = (widgetName == "gallery")
                  state.animalsShown = (widgetName == "animals")
                  state.widgetsPanelOpen = true
                }
                break;
              case "animals":
                if (state.animalsShown == true) {
                  state.animalsShown = false
                  state.widgetsPanelOpen = false
                } else {
                  state.editorShown = (widgetName == "editor")
                  state.galleryShown = (widgetName == "gallery")
                  state.animalsShown = (widgetName == "animals")
                  state.widgetsPanelOpen = true
                }
                break;

              default: 
                break;

            }
          }

          updateUi()
        }

        var Editorbtn = document.getElementById("viewBasicEditor");
        Editorbtn.addEventListener("click", function () {
          toggleWidget("editor");
        });
        // ------------------------ Feature template -----------------------

        var Featurebtn = document.getElementById("viewFeatureTemplate");
        Featurebtn.addEventListener("click", function () {
          toggleWidget("animals");
        });
        // -------------------------- Scale Bar ----------------------------
        var scaleBar = new ScaleBar({
          view: view,
          unit: "metric" // The scale bar displays both metric and non-metric units.
        });
        view.ui.add(scaleBar,"bottom-left")

        // -------------------------- HOME ------------------------------
        var homeWidget = new Home({
          view: view,
          container: HomeDiv,

        })
        view.ui.add(homeWidget, "top-left");

        //----------------------- Coordinate Conversion -------------------------
        var btncoordinate = document.getElementById("viewCoordinateLink");
        var coordinateDiv = document.getElementById("CoordinateDiv");
        var ccWidget = new CoordinateConversion({

          view: view,
          container: coordinateDiv,
        });

        var coordinateClose = document.getElementById("coordinateClose");
        coordinateClose.addEventListener("click", function () {
          coordinateDiv.classList.toggle("hidden");
        });

        btncoordinate.addEventListener("click", function () {
          coordinateDiv.classList.toggle("hidden");

        });

        view.ui.add(coordinateDiv, "top-right");

        //-------------- Bookmarks  ---------------------------------

        const bookmarks = new Bookmarks({
          view: view,
          // container: BookmarksDiv,
          // allows bookmarks to be added, edited, or deleted
          editingEnabled: true
        });

        const bkExpand = new Expand({
          view: view,
          content: bookmarks,
          expanded: false,
        });

        // Add the widget to the top-right corner of the view
        view.ui.add(bkExpand, "top-left");

        // ----------------------- Measurement 2D ---------------------------
        var topBarDiv = document.getElementById("topbar");
        var measurmentLink = document.getElementById("MeasurmentLink");
        measurmentLink.addEventListener("click", function () {
          // console.log("togle top bar", topBarDiv);
          topBarDiv.classList.toggle("hidden");
        });

        var measureClose = document.getElementById("measureClose");
        measureClose.addEventListener("click", function () {
          topBarDiv.classList.toggle("hidden");
        });

        var activeWidget = null;
        view.ui.add("topbar", "top-right");

        document.getElementById("distanceButton").addEventListener("click", function () {
          setActiveWidget(null);
          if (!this.classList.contains("active")) {
            setActiveWidget("distance");
          } else {
            setActiveButton(null);
          }
        });

        document.getElementById("areaButton").addEventListener("click", function () {
          setActiveWidget(null);
          if (!this.classList.contains("active")) {
            setActiveWidget("area");
          } else {
            setActiveButton(null);
          }
        });

        function setActiveWidget(type) {
          switch (type) {
            case "distance":
              activeWidget = new DistanceMeasurement2D({
                view: view
              });

              activeWidget.viewModel.newMeasurement();

              view.ui.add(activeWidget, "top-right");
              setActiveButton(document.getElementById("distanceButton"));
              break;
            case "area":
              activeWidget = new AreaMeasurement2D({
                view: view
              });

              activeWidget.viewModel.newMeasurement();

              view.ui.add(activeWidget, "top-right");
              setActiveButton(document.getElementById("areaButton"));
              break;
            case null:
              if (activeWidget) {
                view.ui.remove(activeWidget);
                activeWidget.destroy();
                activeWidget = null;
              }
              break;
          }
        }

        function setActiveButton(selectedButton) {
          // focus the view to activate keyboard shortcuts for sketching
          view.focus();
          var elements = document.getElementsByClassName("active");
          for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("active");
          }
          if (selectedButton) {
            selectedButton.classList.add("active");
          }
        };
        // ------------------- Get coordinate -------------------------------

        //*** Add div element to show coordates ***//
        var coordsWidget = document.createElement("div");
        coordsWidget.id = "coordsWidget";
        coordsWidget.className = "esri-widget esri-component";
        coordsWidget.style.padding = "7px 15px 5px";
        view.ui.add(coordsWidget, "bottom-right");

        //*** Update lat, lon, zoom and scale ***//
        function showCoordinates(pt) {
          var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
            " | Scale 1:" + Math.round(view.scale * 1) / 1 +
            " | Zoom " + view.zoom;
          coordsWidget.innerHTML = coords;
        }

        //*** Add event and show center coordinates after the view is finished moving e.g. zoom, pan ***//
        view.watch(["stationary"], function () {
          showCoordinates(view.center);
        });

        //*** Add event to show mouse coordinates on click and move ***//
        view.on(["pointer-down", "pointer-move"], function (evt) {
          showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
        });
      })

  )

})