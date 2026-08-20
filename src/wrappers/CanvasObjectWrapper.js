import { Graphics } from "pixi.js";
import LayerManager from "../managers/LayerManager.js";

export class CanvasObjectWrapper {

    constructor(obj) {
        obj.setPosition = this.setPosition;
        obj.setScale = this.setScale;
        obj.addScale = this.addScale;
        obj.select = this.select;
        obj.unselect = this.unselect;
        obj.rebuildSelectionGraphic = this.rebuildSelectionGraphic;
        obj.wrapperDestroy = this.wrapperDestroy;
        
        let width = obj.width + 6;
        let height = obj.height + 6;
        
        obj.selectionGraphic = new Graphics().rect(-width / 2, -height / 2, width, height).stroke({ width: 2, color: 0xffffff });
        obj.selectionGraphic.alpha = 0;
        LayerManager.LAYERS.SELECTION.addChild(obj.selectionGraphic);
        
        return obj;
    }
    
    rebuildSelectionGraphic() {

        this.selectionGraphic.clear();

        let width = this.width + 6;
        let height = this.height + 6;
        
        this.selectionGraphic.rect(-width / 2, -height / 2, width, height).stroke({ width: 2, color: 0xffffff });
        
    }
    
    setPosition(x,y){
        this.x = x;
        this.y = y;
        
        this.selectionGraphic.x = x;
        this.selectionGraphic.y = y;
    }
    
    setScale(x,y){
        this.scale.set(x,y);
        this.rebuildSelectionGraphic();
    }
    
    addScale(x,y){               
        this.scale.set(this.scale.x + x, this.scale.y + y);       
        this.rebuildSelectionGraphic();
    }
    
    select(){
        this.selectionGraphic.alpha = 1;
    }
    
    unselect(){
        this.selectionGraphic.alpha = 0;
    }

    wrapperDestroy(){
        this.selectionGraphic.destroy();
    }
}