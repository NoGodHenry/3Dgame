import { vec3 } from "gl-matrix";
import { Camera } from "./camera";
import { Terrain } from "./modules/terrain/terrain";
import { SceneGraph } from "./sceneGraph/sceneGraph";
import { shaderInit } from "./shader/shaderManager";
import { Input } from "./input";

export const canvas: HTMLCanvasElement = document.getElementById("gameWindow")! as HTMLCanvasElement;
export const gl: WebGL2RenderingContext = canvas.getContext("webgl2")! as WebGL2RenderingContext; // TODO: use proper type
const sceneGraph: SceneGraph = new SceneGraph();
const camera: Camera = new Camera(new Input(document), vec3.create(), vec3.create());

function init() { 
  shaderInit(gl);
  sceneGraph.add(new Terrain(camera));
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  function render() { 
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    sceneGraph.render();
    camera.move();
    requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render);
}

init();
