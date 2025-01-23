import { vec3 } from "gl-matrix";
import { Camera } from "../camera";
import { GameObject } from "./gameObject";

export class SceneGraph { 
  private objects: GameObject[] = []
  
  render() { 
    this.objects.forEach(e => e.render());
  }
  
  update() { 
    this.objects.forEach(e => e.update());
  }
  
  add(object: GameObject) { 
    this.objects.push(object);
  }
}