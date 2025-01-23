import { Component } from "../component";
import { GameObject } from "../../gameObject";

export abstract class ShaderComponent<T extends GameObject> extends Component<T> { 
  abstract updateUniforms(): void;
  
  abstract bind(): void;
  abstract unbind(): void;
}
