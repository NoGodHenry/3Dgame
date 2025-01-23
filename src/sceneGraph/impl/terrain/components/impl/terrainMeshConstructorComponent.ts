import { Component } from "../../../../components/component";
import { MeshConstructorComponent } from "../../../../components/impl/meshConstructorComponent";
import { TerrainNode } from "../../terrainNode";

export class TerrainMeshConstructorComponent extends MeshConstructorComponent<TerrainNode> { 
  
  constructor(object: TerrainNode) { 
    super(object);
  }

  public constructMesh(): void { 
    console.log("terrain mesh");
    super.constructMesh();
  }
}