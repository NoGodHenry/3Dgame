import { vec2 } from "gl-matrix";
import { TerrainNode } from "../../sceneGraph/impl/terrain/terrainNode";
import { Camera } from "../../camera";
import Noise from "noisejs";

export class TerrainNodeImpl extends TerrainNode { 
  private noise: Noise;
  
  constructor(camera: Camera, noise: Noise) { 
    super(camera);
    
    this.noise = noise;
  }
  
  public heightAtPoint(point: vec2): number { 
    return this.noise.simplex2(point[0] / 100, point[1] / 100) * 2;
  }
}