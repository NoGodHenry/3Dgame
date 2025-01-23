import { vec2, vec3 } from "gl-matrix";

export class Vertex { 
  position: vec3;
  normal: vec3;
  textureCoords: vec2;
  
  constructor(position: vec3, normal?: vec3, textureCoords?: vec2) { 
    this.position = position;
    this.normal = normal ?? vec3.create();
    this.textureCoords = textureCoords ?? vec2.create();
  }
}