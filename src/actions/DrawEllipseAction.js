import { Graphics } from 'pixi.js';
import LayerManager from "../managers/LayerManager.js";
import { CanvasObjectWrapper } from "../wrappers/CanvasObjectWrapper.js";

export class DrawEllipseAction {

    constructor(strokeThickness,fillColor,strokeColor,startX,startY,endX,endY) {
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeThickness = strokeThickness;
        
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }

    execute() {
        let cornerX = this.endX > this.startX ? this.startX : this.endX;
        let cornerY = this.endY > this.startY ? this.startY : this.endY;
        let width = Math.abs(this.endX - this.startX);
        let height = Math.abs(this.endY - this.startY);
        
        this.graphics = new Graphics().ellipse(0,0,width/2,height/2).fill(this.fillColor);       
        if(this.strokeThickness > 0) this.graphics.stroke({width:this.strokeThickness,color:this.strokeColor});
                
        new CanvasObjectWrapper(this.graphics);
        
        this.graphics.setPosition(cornerX + (width/2),cornerY + (height/2));
        LayerManager.LAYERS.DRAW.addChild(this.graphics);
    }

    redo() {
        LayerManager.LAYERS.DRAW.addChild(this.graphics);
    }

    undo(x,y) {                
        LayerManager.LAYERS.DRAW.removeChild(this.graphics);
    }

    //If history should be tossed then call destroy to have action clean itself up
    destroy(){
        this.graphics.destroy();
        this.graphics.wrapperDestroy();
    }
}