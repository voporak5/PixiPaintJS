import SelectionManager from "../managers/SelectionManager.js";
import HistoryManager from "../managers/HistoryManager.js";
import { MoveAction } from "../actions/MoveAction.js";
import InputManager from "../managers/InputManager.js";

export class MoveState {

    constructor() {
        
        this.startX = 0;
        this.startY = 0;
        
        this.prevX = 0;
        this.prevY = 0;
    }

    pointerDown(x,y) {     
        
        this.startX = x;
        this.startY = y;
        
        this.prevX = x;
        this.prevY = y;
    }
    
    pointerMove(x,y) {
        
        if(InputManager.getIsMouseDown() == false) return;
        
        let selected = SelectionManager.getSelected();
        if(selected.length == 0) return;
        
        let deltaX = x - this.prevX;
        let deltaY = y - this.prevY;
        this.prevX = x;
        this.prevY = y;
        
        
        for(let i = 0; i < selected.length; i++){
            let obj = selected[i];
            obj.setPosition(obj.x + deltaX, obj.y + deltaY);
        }

    }

    pointerUp(x,y) {  
        
        let selected = SelectionManager.getSelected();        
        if(selected.length == 0) return;
        
        let deltaX = x - this.startX;
        let deltaY = y - this.startY;                
                         
        //Undo changes from pointerMove so that the MoveAction can control the final movements
        for(let i = 0; i < selected.length; i++){
            let obj = selected[i];
            obj.setPosition(obj.x - deltaX, obj.y - deltaY);
        }
        
        HistoryManager.addAction(
            new MoveAction(selected,deltaX,deltaY)
        );
    }

}