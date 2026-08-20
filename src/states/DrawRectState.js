import HistoryManager from "../managers/HistoryManager.js";
import { DrawRectAction } from "../actions/DrawRectAction.js";

export class DrawRectState {

    constructor(fillColorPicker,strokeColorPicker,strokeInput) {
        this.fillColorPicker = fillColorPicker;
        this.strokeColorPicker = strokeColorPicker;
        this.strokeInput = strokeInput;
        
        this.startX = 0;
        this.startY = 0;
    }

    pointerDown(x,y) {        
        this.startX = x;
        this.startY = y;
    }

    pointerMove(x,y) {

    }

    pointerUp(x,y) {        
        
        HistoryManager.addAction(
            new DrawRectAction(
                this.strokeInput.value,
                this.fillColorPicker.getDecimal(),
                this.strokeColorPicker.getDecimal(),
                this.startX,
                this.startY,
                x,
                y
            )
        );
    }

}