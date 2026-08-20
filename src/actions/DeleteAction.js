
export class DeleteAction {

    constructor(objects) {
        this.objects = objects;
    }

    execute() {                        
        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].visible = false;            
        }
    }

    redo() {
        this.execute();
    }

    undo() {                
        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].visible = true;            
        }
    }

    destroy(){}
}