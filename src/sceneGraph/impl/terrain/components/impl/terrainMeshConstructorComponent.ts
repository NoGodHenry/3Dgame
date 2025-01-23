import { vec2, vec3 } from "gl-matrix";
import { Mesh } from "../../../../../geometry/mesh";
import { Vertex } from "../../../../../geometry/vertex";
import { Component } from "../../../../components/component";
import { MeshConstructorComponent } from "../../../../components/impl/meshConstructorComponent";
import { TerrainNode } from "../../terrainNode";

export class TerrainMeshConstructorComponent extends MeshConstructorComponent<TerrainNode> {
  private vertexDimension: number;
  private terrainSize: number;

  constructor(object: TerrainNode, vertexCount: number, terrainSize: number) {
    super(object);

    this.vertexDimension = vertexCount;
    this.terrainSize = terrainSize;
  }

  protected constructMesh(): Mesh {
    let vertices: Vertex[] = [];
    let indices: number[] = [];
    let index: number = 0;
    for (let i = 0; i < this.vertexDimension; i++) {
      for (let j = 0; j < this.vertexDimension; j++) {
        vertices[index++] = new Vertex(
          vec3.fromValues(
            (j / (this.vertexDimension - 1)) * this.terrainSize,
            this.object.heightAtPoint(vec2.fromValues(i, j)),
            (i / (this.vertexDimension - 1)) * this.terrainSize
          ),
          this.calculateNormal(i, j),
          vec2.fromValues(
            j / (this.vertexDimension - 1),
            i / (this.vertexDimension - 1)
          )
        );
      }
    }

    index = 0;

    for (let gz = 0; gz < this.vertexDimension - 1; gz++) {
      for (let gx = 0; gx < this.vertexDimension - 1; gx++) {
        let topLeft = gz * this.vertexDimension + gx;
        let topRight = topLeft + 1;
        let bottomLeft = (gz + 1) * this.vertexDimension + gx;
        let bottomRight = bottomLeft + 1;

        indices[index++] = topLeft;
        indices[index++] = bottomLeft;
        indices[index++] = topRight;
        indices[index++] = topRight;
        indices[index++] = bottomLeft;
        indices[index++] = bottomRight;
      }
    }
    return new Mesh(vertices, indices);
  }
  
 	private calculateNormal(x: number, z: number): vec3 {
		const heightL: number = this.object.heightAtPoint(vec2.fromValues(x - 1, z));
		const heightR: number = this.object.heightAtPoint(vec2.fromValues(x + 2, z));
		const heightD: number = this.object.heightAtPoint(vec2.fromValues(x, z - 1));
		const heightU: number = this.object.heightAtPoint(vec2.fromValues(x, z + 1));
		
		let normal: vec3 = vec3.fromValues(heightL - heightR, 2, heightD - heightU);
    vec3.normalize(normal, normal);
		return normal;
	}
}
