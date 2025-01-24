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
      varying vec3 pos;

      void main(void) {
        gl_Position = projectionViewMatrix * worldMatrix * aVertexPosition;
        normal = aNormal;
        pos = vec3(worldMatrix * vec4(aVertexPosition.xyz, 1.0));
      }
    `);
    this.addFragmentShader(`
      precision mediump float;
      uniform vec3 directionalLight;
      
      varying vec3 normal;
      varying vec3 pos;
      
      float diffuse(vec3 dir, vec3 normal, float intensity) {
        return max(0.1, dot(normal, -dir) * intensity);
      }
      
      void main(void) {
        vec3 norm = normalize(normal);
        gl_FragColor = vec4(vec3(1,1,0) * diffuse(directionalLight, norm, 2.0), 1);
      }
    `);

    this.bindAttributeLocation("aVertexPosition", 0);
    this.bindAttributeLocation("aNormal", 1);
    this.compileShader();

    this.addUniform("projectionViewMatrix");
    this.addUniform("worldMatrix");
    this.addUniform("directionalLight");
  }
}
