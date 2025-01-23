import { mat4, vec3 } from "gl-matrix";
import { gl } from "./index";

export class Camera { 
  fov: number = 45;
  position: vec3;
  rotation: vec3;
  
  constructor(position: vec3, rotation: vec3) { 
    this.position = position;
    this.rotation = rotation;
  }
  
  projectionMatrix(): mat4 {
    const fieldOfView = (this.fov * Math.PI) / 180; // in radians
    const aspect = gl.canvas.width / gl.canvas.height;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
    
    return projectionMatrix;
  }
  viewMatrix(): mat4 {
    const matrix: mat4 = mat4.create();
    mat4.rotateX(matrix, matrix, this.rotation[0]);
    mat4.rotateY(matrix, matrix, this.rotation[1]);
    mat4.rotateZ(matrix, matrix, this.rotation[2]);
   
    mat4.translate(matrix, matrix, this.position);
    mat4.invert(matrix, matrix);
    
    return matrix;
  }
  
  viewProjectionMatrix(): mat4 {
    const matrix: mat4 = mat4.create();
    mat4.mul(matrix, this.projectionMatrix(), this.viewMatrix());
    
    return matrix;
  }
}