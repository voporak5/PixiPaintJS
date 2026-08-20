import { Container } from 'pixi.js';
import LayerManager from "../managers/LayerManager.js";
import SelectionManager from "../managers/SelectionManager.js";

export class UngroupAction {

    constructor(objects) {
        
        this.objects = objects;
        this.siblingIndexes = [];
        this.parents = [];
                
        for(let i = 0; i < objects.length; i++) { 
            let obj = objects[i];
            this.siblingIndexes.push(obj.parent.getChildIndex(obj));
            
            this.parents.push([...obj.children]);
        
        }
        
    }

    execute() {     

        for(let i = 0; i < this.objects.length; i++) {
            let obj = this.objects[i];
          
            if(obj.children.length == 0) continue;
            
            SelectionManager.removeFromSelected(obj);
            LayerManager.LAYERS.DRAW.removeChild(obj);
            
            for(let j = 0; j < this.parents[i].length; j++) {
                let child = this.parents[i][j];            
                
                child.setScale(child.scale.x * obj.scale.x,child.scale.y * obj.scale.y);
                child.setPosition((child.x * obj.scale.x)  + obj.x,(child.y * obj.scale.y) + obj.y);
                LayerManager.LAYERS.DRAW.addChild(child);                
                SelectionManager.addToSelected(child);
            }
            
        }
        
    }

    redo() {
        this.execute();
    }

    undo() {       
        

        //First remove all children and attach to groups
        for(let i = 0; i < this.objects.length; i++) {
            let obj = this.objects[i];
            let children = this.parents[i];

            if(children.length == 0) continue;
            
            for(let j = 0; j < children.length; j++) {
                let child = children[j];
                obj.addChild(child);   
                child.setScale(child.scale.x / obj.scale.x,child.scale.y / obj.scale.y);
                child.setPosition((child.x - obj.x) / obj.scale.x,(child.y - obj.y) / obj.scale.y);
                
                SelectionManager.removeFromSelected(child);
            }            
        }
        
        //Reattach groups
        for(let i = 0; i < this.objects.length; i++) {
            let obj = this.objects[i];        
            if(obj.children.length == 0) continue;

            let index = this.siblingIndexes[i];
            LayerManager.LAYERS.DRAW.addChild(obj);
            LayerManager.LAYERS.DRAW.setChildIndex(obj,this.siblingIndexes[i]);
            SelectionManager.addToSelected(obj);
            
        }
        
    }

    destroy(){ }
}