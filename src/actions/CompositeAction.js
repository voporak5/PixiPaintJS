export class CompositeAction {

    constructor(actions) {        
        this.actions = actions;
    }

    execute() {
        for(let i = 0; i < this.actions.length; i++) {
            this.actions[i].execute();
        }
    }

    redo() {
        for(let i = 0; i < this.actions.length; i++) {
            this.actions[i].redo();
        }
    }

    undo() {                
        for(let i = this.actions.length - 1; i >= 0; i--) {
            this.actions[i].undo();
        }
    }

    destroy(){
        for(let i = 0; i < this.actions.length; i++) {
            this.actions[i].destroy();
        }
    }
}