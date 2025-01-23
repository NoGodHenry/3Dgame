import { vec2 } from "gl-matrix";
import { TerrainNode } from "../../sceneGraph/impl/terrain/terrainNode";
import { Camera } from "../../camera";

export class TerrainNodeImpl extends TerrainNode { 
  
  public heightAtPoint(point: vec2): number { 
    return 0;
  }
}