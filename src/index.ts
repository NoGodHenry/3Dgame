import { Terrain } from "./modules/terrain/terrain";
import { SceneGraph } from "./sceneGraph/sceneGraph";
import { shaderInit } from "./shader/shaderManager";

const canvas: HTMLCanvasElement = document.getElementById("gameWindow")! as HTMLCanvasElement;
export const gl: WebGL2RenderingContext = canvas.getContext("webgl2")! as WebGL2RenderingContext; // TODO: use proper type
const sceneGraph: SceneGraph = new SceneGraph();

function init() { 
  shaderInit(gl);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  sceneGraph.add(new Terrain(sceneGraph.camera));
  gl.createBuffer();
  
  function render() { 
    sceneGraph.render();
    requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render);
}

init();
