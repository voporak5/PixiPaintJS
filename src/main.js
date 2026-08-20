import { Application, Assets, Sprite, Rectangle  } from "pixi.js";
import InputManager from "./managers/InputManager.js";
import ToolsManager from "./managers/ToolsManager.js";
import SelectionManager from "./managers/SelectionManager.js";
import LayerManager from "./managers/LayerManager.js";
import CanvasController from "./managers/CanvasController.js";
import HistoryManager from "./managers/HistoryManager.js";
import { DrawRectState } from "./states/DrawRectState.js";
import { DrawStarState } from "./states/DrawStarState.js";
import { DrawEllipseState } from "./states/DrawEllipseState.js";
import { DrawLineState } from "./states/DrawLineState.js";

import "../style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SelectState } from "./states/SelectState.js";
import { MoveState } from "./states/MoveState.js";
import { ScaleState } from "./states/ScaleState.js";
import { DeleteState } from "./states/DeleteState.js";
import { GroupState } from "./states/GroupState.js";
import { UngroupState } from "./states/UngroupState.js";


(async () => {
    // Create a new application
    const app = new Application();

    // Initialize the application
    const container = document.getElementById("pixi-container");
    
    await app.init({
        background: "#aaaaaa",
        resizeTo: container
    });

    InputManager.initialize(app);
    LayerManager.initialize(app);
    
    ToolsManager.addToolGroup("Shapes",["fa-solid","fa-shapes"], [
        ToolsManager.getTool("Ellipse",["fa-regular","fa-circle"], () => {
            SelectionManager.showPreview = true;
            CanvasController.setState(new DrawEllipseState(fillColorPicker,strokeColorPicker,strokeInput));
        }),
        ToolsManager.getTool("Rectangle",["fa-regular","fa-square"], () => {
            SelectionManager.showPreview = true;
            CanvasController.setState(new DrawRectState(fillColorPicker,strokeColorPicker,strokeInput));
        }),
        ToolsManager.getTool("Line",["fa-solid","fa-lines-leaning"], () => {
            SelectionManager.showPreview = true;
            CanvasController.setState(new DrawLineState(fillColorPicker,strokeInput));
        }),
        ToolsManager.getTool("Star",["fa-regular","fa-star"], () => {
            SelectionManager.showPreview = true;
            CanvasController.setState(new DrawStarState(fillColorPicker,strokeColorPicker,strokeInput));
        })
    ]);
    
    let fillColorPicker = ToolsManager.getColorPicker("Fill Color");
    let strokeColorPicker = ToolsManager.getColorPicker("Stroke Color");
    let strokeInput = document.getElementById("stroke");

    ToolsManager.addTool(fillColorPicker);
    ToolsManager.addTool(strokeColorPicker);
    
    ToolsManager.addTool(ToolsManager.getTool("Select Tool",["fa-solid","fa-arrow-pointer"], () => {
        SelectionManager.showPreview = true;
        CanvasController.setState(new SelectState());
    }));
    
    ToolsManager.addTool(ToolsManager.getTool("Move Tool",["fa-solid","fa-up-down-left-right"], () => {
        SelectionManager.showPreview = false;
        CanvasController.setState(new MoveState());
    }));
    
    ToolsManager.addTool(ToolsManager.getTool("Scale Tool",["fa-solid","fa-up-right-and-down-left-from-center"], () => {
        SelectionManager.showPreview = false;
        CanvasController.setState(new ScaleState());
    }));
    
    ToolsManager.addTool(ToolsManager.getTool("Delete Tool",["fa-solid","fa-trash-can"], () => {        
        //do composite unselect and delete action
        SelectionManager.showPreview = true;
        CanvasController.setState(new DeleteState());
    }));
    
    ToolsManager.addTool(ToolsManager.getTool("Group Tool",["fa-solid","fa-object-group"], () => {        
        //do composite unselect and delete action
        SelectionManager.showPreview = true;
        CanvasController.setState(new GroupState());
    }));
    
    ToolsManager.addTool(ToolsManager.getTool("Ungroup Tool",["fa-regular","fa-object-group"], () => {        
        //do composite unselect and delete action
        SelectionManager.showPreview = true;
        CanvasController.setState(new UngroupState());
    }));
    
    container.appendChild(app.canvas);

    let undoBtn = document.getElementById("undo");
    let redoBtn = document.getElementById("redo");
        
    undoBtn.addEventListener("click",() => {
        HistoryManager.undoAction();
    });
    
    redoBtn.addEventListener("click",() => {
        HistoryManager.redoAction();
    });
    
    

    // Load the bunny texture
    /*const texture = await Assets.load("./assets/bunny.png");

    // Create a bunny Sprite
    const bunny = new Sprite(texture);

    // Center the sprite's anchor point
    bunny.anchor.set(0.5);

    // Move the sprite to the center of the screen
    bunny.position.set(app.screen.width / 2, app.screen.height / 2);

    // Add the bunny to the stage
    app.stage.addChild(bunny);

    // Listen for animate update
    app.ticker.add((time) => {
        // Just for fun, let's rotate mr rabbit a little.
        // * Delta is 1 if running at 100% performance *
        // * Creates frame-independent transformation *
        bunny.rotation += 0.1 * time.deltaTime;
    });*/
})();
