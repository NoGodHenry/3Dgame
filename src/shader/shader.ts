import { mat4 } from "gl-matrix";

export class Shader {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private uniforms: Map<string, WebGLUniformLocation> = new Map<
    string,
    WebGLUniformLocation
  >();

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.program = gl.createProgram();
  }

  public addVertexShader(text: string): void {
    this.addShader(text, this.gl.VERTEX_SHADER);
  }

  public addFragmentShader(text: string): void {
    this.addShader(text, this.gl.FRAGMENT_SHADER);
  }

  public bind(): void {
    this.gl.useProgram(this.program);
  }

  public unbind(): void {
    this.gl.useProgram(this.program);
  }

  protected addUniform(text: string): void {
    this.uniforms.set(text, this.gl.getUniformLocation(this.program, text));
  }

  protected bindAttributeLocation(attribute: string, id: number): void {
    this.gl.bindAttribLocation(this.program, id, attribute);
  }

  public getUniform(text: string): WebGLUniformLocation {
    return this.uniforms.get(text);
  }

  public setUniformMatrix4f(text: string, matrix: mat4): void {
    this.gl.uniformMatrix4fv(this.getUniform(text), false, matrix);
  }

  public compileShader(): void {
    this.gl.linkProgram(this.program);
    this.gl.validateProgram(this.program);
  }

  private addShader(text: string, type: GLenum): void {
    const shader: WebGLShader = this.gl.createShader(type);
    this.gl.shaderSource(shader, text);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      this.gl.deleteShader(shader);
      throw new Error("Failed to load shader");
    }

    this.gl.attachShader(this.program, shader);
  }
}
