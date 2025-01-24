import { mat4, vec3 } from "gl-matrix";
import { gl } from "./index";
import { Input } from "./input";

export class Camera { 
  fov: number = 45;
  position: vec3;
  rotation: vec3;
  input: Input;
  movementSpeed: number = 0.2;
  
  constructor(input: Input, position: vec3, rotation: vec3) { 
    this.position = position;
    this.rotation = rotation;
    this.input = input;
  }
  
  move() { 
    // TODO: deltaTime, keybinds
    const localMovementSpeed: number = this.movementSpeed * (this.input.isDown("Control") ? 2 : 1);
    
    this.rotation[1] = this.input.getMouseCoordinates()[0] * 0.02;
    
    if (this.input.isDown("w")) { 
      this.position[0] += Math.sin(this.rotation[1]) * localMovementSpeed;
      this.position[2] += -Math.cos(this.rotation[1]) * localMovementSpeed;
      console.log(Math.sin(this.rotation[1]) + " " + -Math.cos(this.rotation[1]));
    }
    
    if (this.input.isDown("s")) { 
      this.position[0] -= Math.sin(this.rotation[1]) * localMovementSpeed;
      this.position[2] -= -Math.cos(this.rotation[1]) * localMovementSpeed;
    }
    
    if (this.input.isDown("a")) { 
      this.position[0] -= -Math.cos(this.rotation[1]) * localMovementSpeed;
      this.position[2] -= Math.sin(this.rotation[1]) * localMovementSpeed;
    }
    
    if (this.input.isDown("d")) { 
      this.position[0] += -Math.cos(this.rotation[1]) * localMovementSpeed;
      this.position[2] += Math.sin(this.rotation[1]) * localMovementSpeed;
    }
    
    if (this.input.isDown(" ")) { 
      this.position[1] += localMovementSpeed;
    }
    
    if (this.input.isDown("Shift")) { 
      this.position[1] -= localMovementSpeed;
    }
  }
  
  projectionMatrix(): mat4 {
    const fieldOfView = (this.fov * Math.PI) / 180; // in radians
    const aspect = gl.canvas.width / gl.canvas.height;
    const zNear = 0.01;
    const zFar = 10000.0;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
    
    return projectionMatrix;
  }
  
  viewMatrix(): mat4 {
    const matrix: mat4 = mat4.create();
    mat4.rotateX(matrix, matrix, this.rotation[0]);
    mat4.rotateY(matrix, matrix, this.rotation[1]);
    mat4.rotateZ(matrix, matrix, this.rotation[2]);
   
    mat4.translate(matrix, matrix, vec3.fromValues(
      -this.position[0],
      -this.position[1],
      -this.position[2]
    ));
    
    
    return matrix;
  }
  
  viewProjectionMatrix(): mat4 {
    const matrix: mat4 = mat4.create();
    mat4.mul(matrix, this.projectionMatrix(), this.viewMatrix());
    
    return matrix;
  }
}