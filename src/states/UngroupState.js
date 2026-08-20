import SelectionManager from "../managers/SelectionManager.js";
import HistoryManager from "../managers/HistoryManager.js";
import { UngroupAction } from "../actions/UngroupAction.js";

export class UngroupState {

    constructor() {
        let selected = SelectionManager.getSelected();
        if(selected.length == 0) return;
        
        let shouldConstruct = false;
        //Go through selected and check that at least 1 selected is a group
        for(let i = 0; i< selected.length; i++){
            if(selected[i].children.length > 0) {
                shouldConstruct = true;
                break;
            } 
        }
        
        if(shouldConstruct == false) return;
        
        HistoryManager.addAction(
            new UngroupAction(selected)
        );
    }

    pointerDown(x,y) {}

    pointerMove(x,y) {}

    pointerUp(x,y) {}

}

