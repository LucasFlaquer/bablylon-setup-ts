import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/loaders/glTF";
import { ArcRotateCamera, Color3, Engine, HemisphericLight, MeshBuilder, Scene, Sound, StandardMaterial, Texture, Vector3, Vector4 } from "@babylonjs/core"
import { notes, blackKeys, whiteKeys } from "./component/notes";
import { animeteKeyPress } from "./functions/animateKeyPress";

const canvasElement = document.createElement('canvas')
canvasElement.id = "renderCanvas"

const createScene = (engine: Engine, canvas: HTMLCanvasElement) => {
  const scene = new Scene(engine)
  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);
  const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

  const groundMat = new StandardMaterial("groundmaterial", scene);
  groundMat.diffuseColor = new Color3(0, 0, 0)
  const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 5 })
  ground.material = groundMat
  ground.isPickable = false

  const box1Material = new StandardMaterial("box1material", scene)
  box1Material.diffuseTexture = new Texture("./assets/teclado.jpg", scene)
  const faceUV = [];
  faceUV[0] = new Vector4(0 * 1 / 4, 1 * 1 / 4, 1 * 1 / 4, 2 * 1 / 4); //rear face

  const box1 = MeshBuilder.CreateBox("box1", { height: .5, width: 10, depth: 3 }, scene)
  box1.position.y = 0.25
  box1.position.z = 1
  box1.material = box1Material



  const whiteKeyMaterial = new StandardMaterial('color', scene)
  whiteKeyMaterial.diffuseColor = new Color3(255, 255, 255)
  const blackKeyMaterial = new StandardMaterial('color', scene)
  blackKeyMaterial.diffuseColor = new Color3(0, 0, 0)
  const initialPos = -4
  whiteKeys.forEach((note, index) => {
    const WhiteKey = MeshBuilder.CreateBox(note.name, { height: .2, width: .5, depth: 2 }, scene)
    WhiteKey.material = whiteKeyMaterial
    WhiteKey.position.y = 0.2;
    WhiteKey.position.z = -1.35;
    WhiteKey.position.x = initialPos + 0.55 * index
  })

  let blackPosition = initialPos
  blackKeys.forEach((note, index) => {
    const BlackKey = MeshBuilder.CreateBox(note.name, { height: .3, width: 3 / 5 * 0.5, depth: 1.4 }, scene)
    if (index === 2 || index === 7)
      blackPosition += .5
    if (index === 5)
      blackPosition += .6

    BlackKey.material = blackKeyMaterial
    BlackKey.position.y = 0.2;
    BlackKey.position.z = -0.9;
    BlackKey.position.x = blackPosition + .3 + 0.55 * index
  })

  scene.onPointerDown = (evt, pickResults) => {
    if (pickResults.hit) {
      if (pickResults) {
        const note = notes.find(note => note.name === pickResults.pickedMesh?.name);
        if (note) {
          const sound = new Sound(note.name, note.sound, scene, null, { loop: false, autoplay: true })
          sound.setVolume(5)
          scene.beginDirectAnimation(pickResults.pickedMesh, [animeteKeyPress(scene, note.name)], 0, 100, false)
        }
      }

    }
  }


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
engine.resize()