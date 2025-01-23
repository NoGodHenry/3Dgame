import { vec3 } from "gl-matrix";
import { Mesh } from "../../../geometry/mesh";
import { Vertex } from "../../../geometry/vertex";
import { GameObject } from "../../gameObject";
import { Component } from "../component";
import { MeshVAO } from "../../../buffers/MeshVAO";
import { gl } from "../../../index";

export abstract class MeshConstructorComponent<T extends GameObject> extends Component<T> { 
  private mesh?: Mesh;
  private meshVBO?: MeshVAO;
  
  constructor(object: T) { 
    super(object);
  }
  
  protected abstract constructMesh(): Mesh;
  
  public constructMeshData(): void { 
    this.mesh = this.constructMesh();
    this.meshVBO = new MeshVAO(gl);
    this.meshVBO.addData(this.mesh)
  }
  
  public getMesh(): Mesh {
    if (this.mesh == null)
      this.constructMeshData();
    
    return this.mesh;
  }
  
  public getMeshVBO(): MeshVAO {
    if (this.mesh == null)
      this.constructMeshData();
    
    return this.meshVBO;
  }
}