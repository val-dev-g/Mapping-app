define(null, [
    "esri/widgets/Editor"
], function (Editor) {
    // // Create a map from the referenced webmap item id
    // let webmap = new WebMap({
    //     portalItem: {
    //         id: "6c5d657f1cb04a5eb78a450e3c699c2a"
    //     }
    // });

    // let view = new MapView({
    //     container: "viewDiv",
    //     map: webmap
    // }); 
    
    var editorContainer = document.getElementById("EditorDiv")
    var addEditor = function (view) {
        // view.when(function () {
        view.popup.autoOpenEnabled = false;
        // console.log("view", view)
        
        // Create the Editor
        let editor = new Editor({
            view: view,
            container: editorContainer,
        });

        // view.ui.add(basicEditorDiv, "bottom-right");
        // });

    };
    return {
        addEditor: addEditor
    }

});
