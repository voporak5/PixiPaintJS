import { Graphics } from 'pixi.js';
import LayerManager from "../managers/LayerManager.js";
import { CanvasObjectWrapper } from "../wrappers/CanvasObjectWrapper.js";

export class DrawLineAction {

    constructor(strokeThickness, fillColor, startX, startY, endX, endY) {
        this.fillColor = fillColor;
        this.strokeThickness = strokeThickness;

        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;

        // Signed dimensions / direction
        this.width = this.endX - this.startX;
        this.height = this.endY - this.startY;

        // Actual midpoint between start and end
        this.centerX = (this.startX + this.endX) / 2;
        this.centerY = (this.startY + this.endY) / 2;
    }

    execute() {
        this.graphics = new Graphics()
            .moveTo(-this.width / 2, -this.height / 2)
            .lineTo(this.width / 2, this.height / 2)
            .stroke({
                color: this.fillColor,
                width: this.strokeThickness
            });

        new CanvasObjectWrapper(this.graphics);
        
        this.graphics.setPosition(this.centerX,this.centerY);
        
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