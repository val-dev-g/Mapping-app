define(null, [], function () {
    
        var state = {
            sidebaropen: false,
            widgetsPanelOpen: false,
            editorShown: false,
            galleryShown: false,
            animalsShown: false
        };
    
        var getMapClass = function () {
            if (state.sidebaropen && state.widgetsPanelOpen) {
                return ["col-md-8", "col-12"]
            }
            if (state.sidebaropen || state.widgetsPanelOpen) {
                return ["col-md-10", "col-12"]
            }
            return ["col-md-12", "col-12"]
        }
    
        var getSidebarClass = function () {
            if (state.sidebaropen && !state.widgetsPanelOpen) {
                return ["col-12", "col-md-2"]
            }
            if (state.widgetsPanelOpen && state.sidebaropen) {
                return ["col-6", "col-md-2"]
            }
            if (!state.sidebaropen) {
                return ["hidden"]
            }
        }
    
        var getWidgetsPanelClass = function () {
            if (state.sidebaropen && state.widgetsPanelOpen) {
                return ["col-6", "col-md-2"]
            }
            if (state.widgetsPanelOpen && !state.sidebaropen) {
                return ["col-12", "col-md-2"]
            }
            if (!state.widgetsPanelOpen) {
                return ["hidden"]
            }
        }

        var getAnimalsContainerClass = function () {
            return !state.animalsShown ? ["hidden"] : ["visible"]
        }
        var getEditorContainerClass = function () {
            return !state.editorShown ? ["hidden"] : ["visible"]
        }
        var getGalleryContainerClass = function () {
            return !state.galleryShown ? ["hidden"] : ["visible"]
        }
    
    
        //self.state = initialState;
        state.getWidgetsPanelClass = getWidgetsPanelClass;
        state.getMapClass = getMapClass;
        state.getSidebarClass = getSidebarClass;
        state.getAnimalsContainerClass = getAnimalsContainerClass;
        state.getEditorContainerClass = getEditorContainerClass;
        state.getGalleryContainerClass = getGalleryContainerClass;
    
    
        return state;
    
    }
);
