import InputManager from "./InputManager.js";
import { Graphics } from 'pixi.js';
import LayerManager from "../managers/LayerManager.js";
import Utils from "../managers/Utils.js";

class SelectionManager {

    constructor() {
        this.initialized = false;
        this.isShowingPreview = true;
        this.showPreview = true;
        this.selected = [];
        
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);

        InputManager.PointerDownEvent.addListener(this.onPointerDown);
        InputManager.PointerMoveEvent.addListener(this.onPointerMove);
        InputManager.PointerUpEvent.addListener(this.onPointerUp);
        
        this.preview = new Graphics().rect(0,0,0,0);
        LayerManager.LAYERS.PREVIEW.addChild(this.preview);
    }


    onPointerDown(event) {
        this.isShowingPreview = this.showPreview;

        this.startX = event.x;
        this.startY = event.y;
    }

    onPointerMove(event) {
        
        if(this.isShowingPreview == false) return;
        
        this.preview.clear();

        let cornerX = event.x  > this.startX ? this.startX : event.x;
        let cornerY = event.y > this.startY ? this.startY : event.y;
        let width = Math.abs(event.x - this.startX);
        let height = Math.abs(event.y - this.startY);
        
        this.preview.rect(
            cornerX,
            cornerY,
            width,
            height
        ).stroke({
            width: 2,
            color: 0xffffff
        });
 
    }

    onPointerUp(event) {
        this.isShowingPreview = false;
        this.preview.clear();
    }
    
    addToSelected(obj) {
        this.selected.push(obj);
        obj.select();
    }
    
    removeFromSelected(obj) {
        Utils.removeFromArray(this.selected,obj);
        obj.unselect();
    }
    
    getSelected() {
        //Shallow clone
        return [...this.selected];
    }
}

export default new SelectionManager();