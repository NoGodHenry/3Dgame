import { vec2 } from "gl-matrix";
import { canvas } from "./index";

export class Input {
  private keyMap: Map<string, boolean> = new Map<string, boolean>();
  private mouseX: number;
  private mouseY: number;
  
  constructor(element: Document) { 
    element.addEventListener("keyup", e => this.keyUp(e));
    element.addEventListener("keydown", e => this.keyDown(e));
    element.addEventListener("mousemove", e => this.mouseDrag(e));
  }
  
  private keyUp(event: KeyboardEvent) { 
    console.log(event.key);
    this.keyMap.set(event.key, false);
  }
  
  private keyDown(event: KeyboardEvent) { 
    console.log(event.key);
    this.keyMap.set(event.key, true);
  }
  
  private mouseDrag(event: MouseEvent) { 
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
  
  public getMouseCoordinates(): vec2 { 
    return vec2.fromValues(this.mouseX, this.mouseY);
  }
  
  public isDown(key: string): boolean { 
    return this.keyMap.get(key);
  }
}