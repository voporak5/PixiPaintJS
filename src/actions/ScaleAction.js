
export class ScaleAction {

    constructor(objects,scaleDeltaX,scaleDeltaY) {
        this.objects = objects;
        this.scaleX = scaleDeltaX;
        this.scaleY = scaleDeltaY;
        
        console.log(this);
    }

    execute() {        
        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].addScale(this.scaleX,this.scaleY);
        }
    }

    redo() {
        this.execute();
    }

    undo() {        
        
        console.log(this);
        
        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].addScale(-this.scaleX,-this.scaleY);            
        }
    }

    destroy(){}
}