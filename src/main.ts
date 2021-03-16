import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene, SceneLoader, Vector3 } from "@babylonjs/core"

const canvasElement = document.createElement('canvas')
canvasElement.id = "renderCanvas"

const createScene = (engine: Engine, canvas: HTMLCanvasElement) => {
  const scene = new Scene(engine)
  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);
  const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
  SceneLoader.ImportMeshAsync("semi_house", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");

  return scene;
}



const engine = new Engine(canvasElement, true)
const scene = createScene(engine, canvasElement)

engine.runRenderLoop(() => {
  scene.render()
})

const rootEl = document.getElementById('root')!
rootEl.appendChild(canvasElement)


window.addEventListener("resize", () => {
  engine.resize()
})