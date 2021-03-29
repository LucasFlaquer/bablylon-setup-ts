import { Scene, Animation } from "@babylonjs/core";

interface FrameInterface {
  frame: number
  value: number
}

const framesPosition = [
  {
    frame: 0,
    value: 0.2
  },
  {
    frame: 5,
    value: 0.15
  },
  {
    frame: 10,
    value: 0.2
  }
]

const frameRotate = [
  {
    frame: 0,
    value: 0.0
  },
  {
    frame: 5,
    value: -0.08
  },
  {
    frame: 10,
    value: 0
  }
]

export function animeteKeyPress(isRotate: boolean, animationName: string): Animation {
  const frameRate = 100
  const animation = new Animation(
    "keyClick",
    animationName,
    frameRate,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT,
    false
  )

  animation.setKeys(isRotate ? frameRotate : framesPosition)
  return animation
}