define(null, [
    "esri/widgets/Editor"
], function (Editor) {

    var editorContainer = document.getElementById("EditorDiv")
    var addEditor = function (view) {
        view.popup.autoOpenEnabled = false;
 
        // Create the Editor
        let editor = new Editor({
            view: view,
            container: editorContainer,
        });
    };
    return {
        addEditor: addEditor
    }

});
