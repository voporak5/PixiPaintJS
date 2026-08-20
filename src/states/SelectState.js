import SelectionManager from "../managers/SelectionManager.js";
import HistoryManager from "../managers/HistoryManager.js";
import { SelectAction } from "../actions/SelectAction.js";
import { UnselectAction } from "../actions/UnselectAction.js";
import { CompositeAction } from "../actions/CompositeAction.js";
import Utils from "../managers/Utils.js";
import LayerManager from "../managers/LayerManager.js";

export class SelectState {

    constructor() {
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
        
        let selected = SelectionManager.getSelected();
        let newSelected = [];
        
        let cornerX = x > this.startX ? this.startX : x;
        let cornerY = y > this.startY ? this.startY : y;
        let width = Math.abs(x - this.startX);
        let height = Math.abs(y - this.startY);
        let centerX = cornerX + (width/2);
        let centerY = cornerY + (height/2);
        
        let selectionRect = {x:centerX,y:centerY,width:width,height:height};
        
        let sceneObjs = LayerManager.LAYERS.DRAW.children;

        for(let i = 0; i < sceneObjs.length; i++) {
            if(sceneObjs[i].visible == false) continue;
            if(Utils.checkAABB(sceneObjs[i],selectionRect)) newSelected.push(sceneObjs[i]);
        }
                    
        //if no selected and newly selected do a select action
        if(selected.length == 0) {
            HistoryManager.addAction(
                new SelectAction(newSelected)
            );
        }
        else {
            //if selected and no selected do a unselect action
            if(newSelected.length == 0) {
                HistoryManager.addAction(
                    new UnselectAction(selected)
                );
            }
            //if selected and newly selected do a composite unselect and select action
            else {
                HistoryManager.addAction(
                    new CompositeAction([
                        new UnselectAction(selected),
                        new SelectAction(newSelected)
                    ])
                );
            }
        }             
    }

}