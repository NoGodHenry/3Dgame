import { mat4, vec3 } from "gl-matrix";
import { terrainShader } from "../../../../../shader/shaderManager";
import { Component } from "../../../../components/component";
import { ComponentType } from "../../../../components/componentType";
import { ShaderComponent } from "../../../../components/impl/shaderComponent";
import { TerrainNode } from "../../terrainNode";

export class TerrainShaderComponent extends ShaderComponent<TerrainNode> {
  public updateUniforms(): void {
    terrainShader.setUniformMatrix4f(
      "projectionViewMatrix",
      this.object.camera.viewProjectionMatrix(),
    );
    terrainShader.setUniformMatrix4f(
      "worldMatrix",
      this.object.get(ComponentType.transform).worldMatrix(),
    );
    terrainShader.setUniform3f(
      "directionalLight",
      vec3.fromValues(-1, -0.0, 0.0)
    );
  }

  public bind(): void {
    terrainShader.bind();
  }

  public unbind(): void {
    terrainShader.unbind();
  }
}
