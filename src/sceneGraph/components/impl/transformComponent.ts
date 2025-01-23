import { vec3, mat4 } from "gl-matrix";
import { Component } from "../component";
import { GameObject } from "../../gameObject";

export class TransformComponent extends Component<GameObject> {
  translation: vec3 = vec3.create();
  rotation: vec3 = vec3.create();
  scaling: vec3 = vec3.fromValues(1, 1, 1);

  constructor(object: GameObject) {
    super(object);
  }

  worldMatrix(): mat4 {
    let translationMatrix: mat4 = mat4.create();
    mat4.translate(translationMatrix, translationMatrix, this.translation);

    let rotationMatrix: mat4 = mat4.create();
    mat4.rotateX(rotationMatrix, rotationMatrix, this.rotation[0]);
    mat4.rotateY(rotationMatrix, rotationMatrix, this.rotation[1]);
    mat4.rotateZ(rotationMatrix, rotationMatrix, this.rotation[2]);

    let scalingMatrix: mat4 = mat4.create();
    mat4.scale(scalingMatrix, scalingMatrix, this.scaling);

    let scaleRotMatrix: mat4 = mat4.create();
    let outputMatrix: mat4 = mat4.create();
    mat4.mul(scaleRotMatrix, scalingMatrix, rotationMatrix);
    mat4.mul(outputMatrix, translationMatrix, scaleRotMatrix);

    return translationMatrix;
  }

  modelMatrix(): mat4 {
    let rotationMatrix: mat4 = mat4.create();
    mat4.rotateX(rotationMatrix, rotationMatrix, this.rotation[0]);
    mat4.rotateY(rotationMatrix, rotationMatrix, this.rotation[1]);
    mat4.rotateZ(rotationMatrix, rotationMatrix, this.rotation[2]);

    return rotationMatrix;
  }
}
