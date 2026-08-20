
export class MoveAction {

    constructor(objects,deltaX,deltaY) {
        this.objects = objects;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }

    execute() {        
        for(let i = 0; i < this.objects.length; i++){
            let obj = this.objects[i];
            obj.setPosition(obj.x + this.deltaX, obj.y + this.deltaY);
        }
    }

    redo() {
        this.execute();
    }

    undo(x,y) {                
        for(let i = 0; i < this.objects.length; i++){
            let obj = this.objects[i];
            obj.setPosition(obj.x - this.deltaX, obj.y - this.deltaY);
        }
    }

    destroy(){}
}