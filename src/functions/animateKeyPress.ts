import { Scene, Animation } from "@babylonjs/core";

export function animeteKeyPress(scene: Scene, name: string): Animation {
  const frameRate = 100
  const animation = new Animation(
    "keyClick",
    "rotation.x",
    frameRate,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT,
    false
  )
  const frames = []
  // const keyClick = 
  frames.push({
    frame: 0,
    value: 0.0
  })
  frames.push({
    frame: 5,
    value: -0.08
  })
  frames.push({
    frame: 10,
    value: 0
  })
  animation.setKeys(frames)
  return animation
}