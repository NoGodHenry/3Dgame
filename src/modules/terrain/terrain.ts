import { vec2 } from "gl-matrix";
import { TerrainNode } from "../../sceneGraph/impl/terrain/terrainNode";
import { GameObject } from "../../sceneGraph/gameObject";
import { TerrainNodeImpl } from "./terrainNodeImpl";
import { Camera } from "../../camera";
import Perlin from "../../util/perlinNoise";

export class Terrain extends GameObject {
  private nodes: TerrainNode[] = [];
  private noise: Perlin;
  
  constructor(camera: Camera) {
    super();
    
    this.noise = new Perlin(Math.random());
    this.nodes.push(new TerrainNodeImpl(camera, this.noise));
  }
  
  render(): void { 
    this.nodes.forEach(e => e.render()); // TODO: maybe TerrainNode::render ??? 
  }
}