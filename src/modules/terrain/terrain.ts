import { vec2 } from "gl-matrix";
import { TerrainNode } from "../../sceneGraph/impl/terrain/terrainNode";
import { GameObject } from "../../sceneGraph/gameObject";
import { TerrainNodeImpl } from "./terrainNodeImpl";
import { Camera } from "../../camera";

export class Terrain extends GameObject {
  private nodes: TerrainNode[] = [];
  
  constructor(camera: Camera) {
    super();
    
    this.nodes.push(new TerrainNodeImpl(camera));
  }
  
  render(): void { 
    this.nodes.forEach(e => e.render()); // TODO: maybe TerrainNode::render ??? 
  }
}