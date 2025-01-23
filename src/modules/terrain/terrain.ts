import { vec2 } from "gl-matrix";
import { TerrainNode } from "../../sceneGraph/impl/terrain/terrainNode";
import { GameObject } from "../../sceneGraph/gameObject";
import { TerrainNodeImpl } from "./terrainNodeImpl";
import { Camera } from "../../camera";
import Noise from "noisejs";

export class Terrain extends GameObject {
  private nodes: TerrainNode[] = [];
  private noise: Noise;
  
  constructor(camera: Camera) {
    super();
    
    this.noise = new Noise(Math.random());
    this.nodes.push(new TerrainNodeImpl(camera, this.noise));
  }
  
  render(): void { 
    this.nodes.forEach(e => e.render()); // TODO: maybe TerrainNode::render ??? 
  }
}