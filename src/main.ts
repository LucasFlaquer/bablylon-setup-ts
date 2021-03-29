import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/loaders/glTF";
import { ArcRotateCamera, Color3, Engine, HemisphericLight, MeshBuilder, ParticleSystem, Scene, Sound, StandardMaterial, Texture, Vector3, Vector4, } from "@babylonjs/core"
import { notes, blackKeys, whiteKeys, Note } from "./model/notes";
import { animeteKeyPress } from "./functions/animateKeyPress";
import { AdvancedDynamicTexture, Button } from "@babylonjs/gui";

const canvasElement = document.createElement('canvas')
canvasElement.id = "renderCanvas"
let isPlayingDemo = false

const createScene = (engine: Engine, canvas: HTMLCanvasElement) => {
  const scene = new Scene(engine)
  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);
  const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

  const groundMat = new StandardMaterial("groundmaterial", scene);
  groundMat.diffuseColor = new Color3(0, 0, 0)


  const box1Material = new StandardMaterial("box1material", scene)
  box1Material.diffuseTexture = new Texture("./assets/teclado.jpg", scene)
  const faceUV = [];
  faceUV[0] = new Vector4(0 * 1 / 4, 1 * 1 / 4, 1 * 1 / 4, 2 * 1 / 4); //rear face

  const box1 = MeshBuilder.CreateBox("box1", { height: .5, width: 10, depth: 3, }, scene)
  box1.material = groundMat
  const box1Texture = MeshBuilder.CreateBox('top-box-texture', { height: .001, width: 10, depth: 3, faceUV: faceUV, wrap: true, });
  box1Texture.material = box1Material;




  const leftBox = MeshBuilder.CreateBox('leftBox', { height: .5, width: .75, depth: 2 }, scene)
  leftBox.position.y = .25
  leftBox.position.z = -1.5
  leftBox.position.x = -4.65
  const rightBox = MeshBuilder.CreateBox('rightBox', { height: .5, width: .75, depth: 2 }, scene)
  rightBox.position.y = .25
  rightBox.position.z = -1.5
  rightBox.position.x = 4.65

  leftBox.material = groundMat
  rightBox.material = groundMat

  const base = MeshBuilder.CreateBox('base', { height: 0.02, width: 10, depth: 5 })
  base.position.y = 0
  base.material = groundMat



  box1.position.y = 0.25
  box1.position.z = 1
  box1Texture.position.y = 0.5
  box1Texture.position.z = 1





  const whiteKeyMaterial = new StandardMaterial('color', scene)
  whiteKeyMaterial.diffuseColor = new Color3(255, 255, 255)
  const blackKeyMaterial = new StandardMaterial('color', scene)
  blackKeyMaterial.diffuseColor = new Color3(0, 0, 0)
  const initialPos = -3.8
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
        if (note && isPlayingDemo) {

          const ANIMATION_ARRAY = [animeteKeyPress(true, "rotate.x"), animeteKeyPress(false, "position.y")]
          const capacity = 50
          const particles = new ParticleSystem("particles", capacity, scene)
          particles.particleTexture = new Texture("./assets/particle.png", scene)
          particles.emitter = pickResults.pickedMesh
          particles.targetStopDuration = .2
          particles.start()

          const sound = new Sound(note.name, note.sound, scene, null, { loop: false, autoplay: true })
          sound.setVolume(5)
          scene.beginDirectAnimation(pickResults.pickedMesh, ANIMATION_ARRAY, 0, 100, false)
        }
      }

    }
  }

  const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI")
  const button2D = Button.CreateSimpleButton("button", "PLAY DEMO")
  button2D.width = 0.1;
  button2D.height = "40px"
  button2D.color = "cyan"
  button2D.top = "-200px"
  advancedTexture.addControl(button2D)
  button2D.onPointerClickObservable.add(() => {
    isPlayingDemo = true
    playDemo(notes, scene)
  })

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

async function playDemo(notes: Note[], scene: Scene) {
  const estrofe1 = [
    'note-e-2',
    'note-e-2',
    'note-c-2',
    'note-d-2',
    'note-e-2',
    'note-f-2',
    'note-e-2',
    'note-d-2',
    'note-c-2',
    'note-b-1',
    'note-c-2',
    'note-c-2',
    'note-a-1',
    'note-b-1',
    'note-c-2',
    'note-d-2',
    'note-c-2',
    'note-b-1',
    'note-a-1',
    'note-g-1',
    'note-c-2',
    'note-c-2',
    'note-c-2',
    'note-a-1',
    'note-b-1',
    'note-c-2',
    'note-d-2',
    'note-c-2',



  ]
  function play(noteName: string) {
    const mesh = scene.getMeshByID(noteName)
    const note = notes.find(note => note.name === noteName)
    if (!note) return
    const ANIMATION_ARRAY = [animeteKeyPress(true, "rotate.x"), animeteKeyPress(false, "position.y")]
    const capacity = 50
    const particles = new ParticleSystem("particles", capacity, scene)
    particles.particleTexture = new Texture("./assets/particle.png", scene)
    particles.emitter = mesh
    particles.targetStopDuration = .2
    particles.start()

    const sound = new Sound(noteName, note.sound, scene, null, { loop: false, autoplay: true })
    sound.setVolume(5)
    scene.beginDirectAnimation(mesh, ANIMATION_ARRAY, 0, 100, false)
  }
  const Song = async () => {
    for (let index = 0; index < estrofe1.length; index++) {
      setTimeout(() => {
        const note = estrofe1[index]
        play(note)

      }, index * 450)
    }
  }
  await Song()
  isPlayingDemo = false

}
// DO DO la si DO RE DO si la sol
// la DO FA MI RE 
// DO RE FA MI RE DO MI RE RE DO si DO 
