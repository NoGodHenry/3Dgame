import { vec2 } from "gl-matrix";
import { ComponentType } from "../../components/componentType";
import { TransformComponent } from "../../components/impl/transformComponent";
import { GameObject } from "../../gameObject";
import { TerrainRendererComponent } from "./components/impl/terrainRendererComponent";
import { TerrainMeshConstructorComponent } from "./components/impl/terrainMeshConstructorComponent";
import { TerrainShaderComponent } from "./components/impl/terrainShaderComponent";
import { Camera } from "../../../camera";

export abstract class TerrainNode extends GameObject { 
  camera: Camera;
  
  constructor(camera: Camera) { 
    super();
    
    this.camera = camera;
    
    this.addComponent(ComponentType.renderer, new TerrainRendererComponent(this));
    this.addComponent(ComponentType.meshConstructor, new TerrainMeshConstructorComponent(this, 800, 800));
    this.addComponent(ComponentType.shader, new TerrainShaderComponent(this));
    this.addComponent(ComponentType.transform, new TransformComponent(this));
  }
  
  public abstract heightAtPoint(point: vec2): number;
}