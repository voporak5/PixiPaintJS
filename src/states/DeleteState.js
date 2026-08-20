import SelectionManager from "../managers/SelectionManager.js";
import HistoryManager from "../managers/HistoryManager.js";
import { DeleteAction } from "../actions/DeleteAction.js";
import { UnselectAction } from "../actions/UnselectAction.js";
import { CompositeAction } from "../actions/CompositeAction.js";

export class DeleteState {

    constructor() {
        let selected = SelectionManager.getSelected();
        if(selected.length == 0) return;
        
        HistoryManager.addAction(
            new CompositeAction([
                new UnselectAction(selected),
                new DeleteAction(selected)
            ])
        );
    }

    pointerDown(x,y) {}

    pointerMove(x,y) {}

    pointerUp(x,y) {}

}