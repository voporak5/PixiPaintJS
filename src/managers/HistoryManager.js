class HistoryManager {

    constructor() {
        this.history = [];
        this.queuedActions = [];
    }
    
    addAction(action) {
        this.clearQueuedActions();
        
        this.history.push(action);
        action.execute();
    }
    
    redoAction () {
        if(this.queuedActions.length == 0) return;
        let action = this.queuedActions.pop();
        action.redo();
        this.history.push(action);
    }
    
    undoAction () {
        if(this.history.length == 0) return;
        let action = this.history.pop();
        action.undo();
        this.queuedActions.push(action);
    }
    
    clearQueuedActions() {
        
        if(this.queuedActions.length == 0) return;
        
        for(let i = 0; i < this.queuedActions.length; i++) {
            this.queuedActions[i].destroy();
        }
        
        this.queuedActions = [];
    }

}

export default new HistoryManager();