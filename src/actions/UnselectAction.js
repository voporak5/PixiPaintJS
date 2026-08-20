import SelectionManager from "../managers/SelectionManager.js";

export class UnselectAction {

    constructor(objs) {        
        this.objs = objs;
    }

    execute() {
        for(let i = 0; i < this.objs.length; i++) {
            SelectionManager.removeFromSelected(this.objs[i]);
        }
    }

    redo() {
        this.execute()
    }

    undo() {                
        for(let i = 0; i < this.objs.length; i++) {
            SelectionManager.addToSelected(this.objs[i]);
        }
    }

    destroy(){}
}