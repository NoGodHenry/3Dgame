import { Shader } from "../../shader";

export class TerrainShader extends Shader {
  constructor(gl: WebGL2RenderingContext) {
    super(gl);

    this.addVertexShader(`
      attribute vec4 vertexPosition;

      uniform mat4 projectionViewMatrix;
      uniform mat4 worldMatrix;

      void main(void) {
        gl_Position = projectionViewMatrix * worldMatrix * vertexPosition;
      }
    `);
    this.addFragmentShader(`
      void main(void) {
        gl_FragColor = vec4(1,0,0,1);
      }
    `);

    this.bindAttributeLocation("vertexPosition", 0);
    this.compileShader();

    this.addUniform("projectionViewMatrix");
    this.addUniform("worldMatrix");
  }
}
