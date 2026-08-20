import SelectionManager from "../managers/SelectionManager.js";
import HistoryManager from "../managers/HistoryManager.js";
import { ScaleAction } from "../actions/ScaleAction.js";
import InputManager from "../managers/InputManager.js";

export class ScaleState {

    constructor() {
        
        this.startX = 0;
        this.startY = 0;
        
        this.prevX = 0;
        this.prevY = 0;
        
        this.scaleRate = 0.01;
        
        this.totalX = 0;
        this.totalY = 0;
    }

    pointerDown(x,y) {     
        
        this.startX = x;
        this.startY = y;
        
        this.prevX = x;
        this.prevY = y;
        
        this.totalX = 0;
        this.totalY = 0;
    }
    
    pointerMove(x,y) {
        
        if(InputManager.getIsMouseDown() == false) return;
        
        let selected = SelectionManager.getSelected();
        if(selected.length == 0) return;
        
        let deltaX = (x - this.prevX) * this.scaleRate;
        let deltaY = (y - this.prevY) * this.scaleRate;
        this.prevX = x;
        this.prevY = y;        

        this.totalX += deltaX;
        this.totalY += deltaY;
        
        for(let i = 0; i < selected.length; i++){
            let obj = selected[i];
            obj.addScale(deltaX, deltaY);
        }

    }

    pointerUp(x,y) {  
            
        let selected = SelectionManager.getSelected();        
        if(selected.length == 0) return;
        
        //Undo changes from pointerMove so that the MoveAction can control the final movements
        for(let i = 0; i < selected.length; i++){
            let obj = selected[i];
            obj.addScale(-this.totalX, -this.totalY);
        }
        
        HistoryManager.addAction(
            new ScaleAction(selected,this.totalX,this.totalY)
        );
    }

}