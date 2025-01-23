export class Input {
  private keyMap: Map<string, boolean> = new Map<string, boolean>();
  
  constructor(element: Document) { 
    element.addEventListener("keyup", e => this.keyUp(e));
    element.addEventListener("keydown", e => this.keyDown(e));
  }
  
  private keyUp(event: KeyboardEvent) { 
    console.log(event.key);
    this.keyMap.set(event.key, false);
  }
  
  private keyDown(event: KeyboardEvent) { 
    console.log(event.key);
    this.keyMap.set(event.key, true);
  }
  
  public isDown(key: string): boolean { 
    return this.keyMap.get(key);
  }
}