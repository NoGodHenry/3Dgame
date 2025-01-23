import { Mesh } from "../geometry/mesh";

export class MeshVAO {
  private positions: WebGLBuffer;
  private indicies: WebGLBuffer;
  private normal: WebGLBuffer;
  private textureCoords: WebGLBuffer;
  private size: number;
  private gl: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
  }

  public addData(mesh: Mesh): void {
    let positionFloatBuffer: number[] = [],
      positionIndex: number = 0;
    
    this.size = mesh.vertices.length;
    this.positions = this.gl.createBuffer();
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positions);
    mesh.vertices.forEach((e) => {
      positionFloatBuffer[positionIndex * 3] = e.position[0];
      positionFloatBuffer[positionIndex * 3 + 1] = e.position[1];
      positionFloatBuffer[positionIndex * 3 + 2] = e.position[2];
      positionIndex++;
    });

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(positionFloatBuffer),
      this.gl.STATIC_DRAW,
    );

    this.indicies = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indicies);
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(mesh.indicies),
      this.gl.STATIC_DRAW,
    );
  }

  public draw(): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positions);
    this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(0);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indicies);
    this.gl.drawElements(
      this.gl.TRIANGLES,
      this.size,
      this.gl.UNSIGNED_SHORT,
      0,
    );
    this.gl.disableVertexAttribArray(0);
  }
}
