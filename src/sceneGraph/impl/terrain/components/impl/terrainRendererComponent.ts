import { Component } from "../../../../components/component";
import { ComponentType } from "../../../../components/componentType";
import { MeshConstructorComponent } from "../../../../components/impl/meshConstructorComponent";
import { RendererComponent } from "../../../../components/impl/rendererComponent";
import { ShaderComponent } from "../../../../components/impl/shaderComponent";
import { GameObject } from "../../../../gameObject";
import { TerrainNode } from "../../terrainNode";

export class TerrainRendererComponent extends RendererComponent<TerrainNode> { 
  
  constructor(object: TerrainNode) { 
    super(object);
  }

  render(): void { 
    const shader: ShaderComponent<GameObject> = this.object.get(ComponentType.shader);
    const meshConstructor: MeshConstructorComponent<GameObject> = this.object.get(ComponentType.meshConstructor);
    
    shader.bind();
    shader.updateUniforms();
    meshConstructor.getMeshVBO().draw();
    shader.unbind();
  }
}