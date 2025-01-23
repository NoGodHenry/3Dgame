import { TerrainShader } from "./impl/terrain/terrainShader";

export let terrainShader: TerrainShader;

export function shaderInit(gl: WebGL2RenderingContext): void { 
  terrainShader = new TerrainShader(gl);
}