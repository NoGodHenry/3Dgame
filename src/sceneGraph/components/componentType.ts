import { GameObject } from "../gameObject";
import { MeshConstructorComponent } from "./impl/meshConstructorComponent";
import { RendererComponent } from "./impl/rendererComponent";
import { ShaderComponent } from "./impl/shaderComponent";
import { TransformComponent } from "./impl/transformComponent";

export class ComponentType<T> { 
  static meshConstructor: ComponentType<MeshConstructorComponent<GameObject>> = new ComponentType();
  static renderer: ComponentType<RendererComponent<GameObject>> = new ComponentType();
  static transform: ComponentType<TransformComponent> = new ComponentType();
  static shader: ComponentType<ShaderComponent<GameObject>> = new ComponentType();
  
  private constructor() { 
    
  }
}