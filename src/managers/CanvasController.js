import InputManager from "./InputManager.js";
import { DummyState } from "../states/DummyCanvasState.js";

class CanvasController {

    constructor() {
        this.state = new DummyState();
        
        //We have to do this otherwise the actual instance gets lost and calling "this" inside
        //the event handlers is undefined which is. Bind assigns a "this" reference to the function
        //and we are going to use this instance as the "this" reference
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);

        InputManager.PointerDownEvent.addListener(this.onPointerDown);
        InputManager.PointerMoveEvent.addListener(this.onPointerMove);
        InputManager.PointerUpEvent.addListener(this.onPointerUp);
    }

    setState(state) {
        this.state = state;
    }

    onPointerDown(event) {
        this.state.pointerDown(event.x,event.y);
    }

    onPointerMove(event) {
        this.state.pointerMove(event.x,event.y);
    }

    onPointerUp(event) {
        this.state.pointerUp(event.x,event.y);
    }

}

export default new CanvasController();