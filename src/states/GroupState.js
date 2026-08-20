import SelectionManager from "../managers/SelectionManager.js";
import HistoryManager from "../managers/HistoryManager.js";
import { GroupAction } from "../actions/GroupAction.js";

export class GroupState {

    constructor() {
        let selected = SelectionManager.getSelected();
        if(selected.length <= 1) return;
        
        HistoryManager.addAction(
            new GroupAction(selected)
        );
    }

    pointerDown(x,y) {}

    pointerMove(x,y) {}

    pointerUp(x,y) {}

}

