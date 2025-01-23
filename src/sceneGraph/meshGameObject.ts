import { Mesh } from "../geometry/mesh";
import { ComponentType } from "./components/componentType";
import { GameObject } from "./gameObject";

export class MeshGameObject extends GameObject { 
  getMesh(): Mesh { 
    return this.get(ComponentType.meshConstructor).getMesh();
  }
}