import { GameObject } from "../gameObject"

export class Component<T extends GameObject> {
  protected object: T;
  
  constructor(object: T) {
    this.object = object;
  }
}