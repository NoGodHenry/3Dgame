import { Component } from "./components/component";
import { ComponentType } from "./components/componentType";
import { RendererComponent } from "./components/impl/rendererComponent";
import { SceneGraph } from "./sceneGraph";

export class GameObject { 
  // TODO: dont use any
  private components: Map<ComponentType<any>, Component<any>> = new Map<ComponentType<any>, Component<any>>();
  
  update(): void { 
    //this.components.forEach(e => e.update())
  }
  
  render(): void { 
    this.get(ComponentType.renderer).render();
  }
  
  addComponent<T extends Component<any>>(type: ComponentType<T>, component: T) { 
    this.components.set(type, component as T);
  }
  
  get<T>(type: ComponentType<T>): T {
    return this.components.get(type)! as T;
  }
}