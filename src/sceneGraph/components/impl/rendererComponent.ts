import { Component } from "../component";
import { GameObject } from "../../gameObject";

export abstract class RendererComponent<T extends GameObject> extends Component<T> { 
  abstract render(): void;
}