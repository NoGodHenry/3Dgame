import { Shader } from "../../shader";

export class TerrainShader extends Shader {
  constructor(gl: WebGL2RenderingContext) {
    super(gl);

    this.addVertexShader(`
      attribute vec4 aVertexPosition;
      attribute vec3 aNormal;

      uniform mat4 projectionViewMatrix;
      uniform mat4 worldMatrix;
      
      varying vec3 normal;

      void main(void) {
        gl_Position = projectionViewMatrix * worldMatrix * aVertexPosition;
        normal = aNormal;
      }
    `);
    this.addFragmentShader(`
      precision mediump float;
      varying vec3 normal;
      void main(void) {
        gl_FragColor = vec4(normal,1);
      }
    `);

    this.bindAttributeLocation("aVertexPosition", 0);
    this.bindAttributeLocation("aNormal", 1);
    this.compileShader();

    this.addUniform("projectionViewMatrix");
    this.addUniform("worldMatrix");
  }
}
