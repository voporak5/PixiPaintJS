import { Container } from 'pixi.js';
import LayerManager from "../managers/LayerManager.js";
import SelectionManager from "../managers/SelectionManager.js";
import { CanvasObjectWrapper } from "../wrappers/CanvasObjectWrapper.js";

export class GroupAction {

    constructor(objects) {
        this.objects = objects;
        this.siblingIndexes = [];
        this.group = new Container();
        new CanvasObjectWrapper(this.group);
        
        for(let i = 0; i < objects.length; i++) {
            let obj = objects[i];
            this.siblingIndexes.push(obj.parent.getChildIndex(obj));
        }
        
        let left;
        let right;
        let top;
        let bottom;
        
        for(let i = 0; i < objects.length; i++){            
            let obj = objects[i];
            
            let _left = obj.x - (obj.width / 2);
            let _right = obj.x + (obj.width / 2);
            let _top = obj.y - (obj.height / 2);
            let _bottom =  obj.y + (obj.height / 2);
            
            if( _left < left || left == undefined) left = _left;
            if( _right > right || right == undefined) right = _right;
            if( _top < top || top == undefined) top = _top;
            if( _bottom > bottom || bottom == undefined) bottom = _bottom;
        }
        
        this.offsetX = left + ((right - left) / 2);
        this.offsetY = top + ((bottom - top) / 2);
        
        this.group.setPosition(this.offsetX,this.offsetY);

    }

    execute() {     
        
        LayerManager.LAYERS.DRAW.addChild(this.group);
        
        for(let i = 0; i < this.objects.length; i++){
            let obj = this.objects[i];
            SelectionManager.removeFromSelected(obj);
            this.group.addChild(this.objects[i]);  
            
            obj.setPosition(obj.x - this.offsetX,obj.y - this.offsetY);
        }
        
        this.group.rebuildSelectionGraphic();
        SelectionManager.addToSelected(this.group);
    }

    redo() {
        this.execute();
    }

    undo() {       
        
        SelectionManager.removeFromSelected(this.group);
        LayerManager.LAYERS.DRAW.removeChild(this.group);
        
        for(let i = 0; i < this.objects.length; i++){
            let obj = this.objects[i];
            obj.setPosition(obj.x + this.offsetX,obj.y + this.offsetY);
            
            LayerManager.LAYERS.DRAW.addChild(obj);
            LayerManager.LAYERS.DRAW.setChildIndex(obj,this.siblingIndexes[i]);
            SelectionManager.addToSelected(obj);
        }
    }

    destroy(){
        this.group.destroy();
        this.group.wrapperDestroy();
    }
}