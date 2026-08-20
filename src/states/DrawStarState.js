import HistoryManager from "../managers/HistoryManager.js";
import { DrawStarAction } from "../actions/DrawStarAction.js";

export class DrawStarState {

    constructor(fillColorPicker,strokeColorPicker,strokeInput) {
        this.fillColorPicker = fillColorPicker;
        this.strokeColorPicker = strokeColorPicker;
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
            new DrawStarAction(
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