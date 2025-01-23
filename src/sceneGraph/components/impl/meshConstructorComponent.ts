import { vec3 } from "gl-matrix";
import { Mesh } from "../../../geometry/mesh";
import { Vertex } from "../../../geometry/vertex";
import { GameObject } from "../../gameObject";
import { Component } from "../component";
import { MeshVAO } from "../../../buffers/MeshVAO";
import { gl } from "../../../index";

export class MeshConstructorComponent<T extends GameObject> extends Component<T> { 
  private mesh?: Mesh;
  private meshVBO?: MeshVAO;
  
  constructor(object: T) { 
    super(object);
  }
  
  public constructMesh(): void { 
    this.mesh = new Mesh(
      [
        // Front face
        new Vertex(vec3.fromValues(-1, -1,  1), vec3.fromValues( 0,  0,  1)),
        new Vertex(vec3.fromValues( 1, -1,  1), vec3.fromValues( 0,  0,  1)),
        new Vertex(vec3.fromValues( 1,  1,  1), vec3.fromValues( 0,  0,  1)),
        new Vertex(vec3.fromValues(-1,  1,  1), vec3.fromValues( 0,  0,  1)),
    
        // Back face
        new Vertex(vec3.fromValues(-1, -1, -1), vec3.fromValues( 0,  0, -1)),
        new Vertex(vec3.fromValues( 1, -1, -1), vec3.fromValues( 0,  0, -1)),
        new Vertex(vec3.fromValues( 1,  1, -1), vec3.fromValues( 0,  0, -1)),
        new Vertex(vec3.fromValues(-1,  1, -1), vec3.fromValues( 0,  0, -1)),
    
        // Top face
        new Vertex(vec3.fromValues(-1,  1, -1), vec3.fromValues( 0,  1,  0)),
        new Vertex(vec3.fromValues( 1,  1, -1), vec3.fromValues( 0,  1,  0)),
        new Vertex(vec3.fromValues( 1,  1,  1), vec3.fromValues( 0,  1,  0)),
        new Vertex(vec3.fromValues(-1,  1,  1), vec3.fromValues( 0,  1,  0)),
    
        // Bottom face
        new Vertex(vec3.fromValues(-1, -1, -1), vec3.fromValues( 0, -1,  0)),
        new Vertex(vec3.fromValues( 1, -1, -1), vec3.fromValues( 0, -1,  0)),
        new Vertex(vec3.fromValues( 1, -1,  1), vec3.fromValues( 0, -1,  0)),
        new Vertex(vec3.fromValues(-1, -1,  1), vec3.fromValues( 0, -1,  0)),
    
        // Right face
        new Vertex(vec3.fromValues( 1, -1, -1), vec3.fromValues( 1,  0,  0)),
        new Vertex(vec3.fromValues( 1,  1, -1), vec3.fromValues( 1,  0,  0)),
        new Vertex(vec3.fromValues( 1,  1,  1), vec3.fromValues( 1,  0,  0)),
        new Vertex(vec3.fromValues( 1, -1,  1), vec3.fromValues( 1,  0,  0)),
    
        // Left face
        new Vertex(vec3.fromValues(-1, -1, -1), vec3.fromValues(-1,  0,  0)),
        new Vertex(vec3.fromValues(-1,  1, -1), vec3.fromValues(-1,  0,  0)),
        new Vertex(vec3.fromValues(-1,  1,  1), vec3.fromValues(-1,  0,  0)),
        new Vertex(vec3.fromValues(-1, -1,  1), vec3.fromValues(-1,  0,  0))
      ],
      [
        0,
        1,
        2,
        0,
        2,
        3, // front
        4,
        5,
        6,
        4,
        6,
        7, // back
        8,
        9,
        10,
        8,
        10,
        11, // top
        12,
        13,
        14,
        12,
        14,
        15, // bottom
        16,
        17,
        18,
        16,
        18,
        19, // right
        20,
        21,
        22,
        20,
        22,
        23, // left
      ]
    );
    
    this.meshVBO = new MeshVAO(gl);
    this.meshVBO.addData(this.mesh)
  }
  
  public getMesh(): Mesh {
    if (this.mesh == null)
      this.constructMesh();
    
    return this.mesh;
  }
  
  public getMeshVBO(): MeshVAO {
    if (this.mesh == null)
      this.constructMesh();
    
    return this.meshVBO;
  }
}