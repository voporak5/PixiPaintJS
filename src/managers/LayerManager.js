import { Container } from 'pixi.js';

class LayerManager {

    constructor() {
        this.app = null;
        this.initialized = false;
        
        this.LAYERS = {
            DRAW: new Container(),
            SELECTION: new Container(),
            PREVIEW: new Container()
        };
        
    }
    
    initialize(app) {
        if (this.initialized) {
            return;
        }

        this.app = app;
        this.initialized = true;        
        this.app.stage.addChild(this.LAYERS.DRAW);
        this.app.stage.addChild(this.LAYERS.SELECTION);
        this.app.stage.addChild(this.LAYERS.PREVIEW);
    }

}

export default new LayerManager();