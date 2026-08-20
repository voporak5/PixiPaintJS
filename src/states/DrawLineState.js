import HistoryManager from "../managers/HistoryManager.js";
import { DrawLineAction } from "../actions/DrawLineAction.js";

export class DrawLineState {

    constructor(fillColorPicker,strokeInput) {
        this.fillColorPicker = fillColorPicker;
        this.strokeInput = strokeInput;
        
        this.startX = 0;
        this.startY = 0;
    }

    pointerDown(x,y) {
        //console.log({x:x,y:y});
        
        this.startX = x;
        this.startY = y;
    }

    pointerMove(x,y) {

    }

    pointerUp(x,y) {            
                
        HistoryManager.addAction(
            new DrawLineAction(
                this.strokeInput.value,
                this.fillColorPicker.getDecimal(),
                this.startX,
                this.startY,
                x,
                y
            )
        );

    }

}