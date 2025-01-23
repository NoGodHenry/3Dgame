import { vec3 } from "gl-matrix";
import { Vertex } from "./vertex";

export class Mesh { 
  vertices: Vertex[];
  indicies: number[];
  
  constructor(vertices: Vertex[], indicies: number[]) { 
    this.vertices = vertices;
    this.indicies = indicies;
  }
}