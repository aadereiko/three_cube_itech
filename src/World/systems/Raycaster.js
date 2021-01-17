import { Raycaster } from 'three';
let raycaster;

function createRaycaster() {
  raycaster = new Raycaster();
  return raycaster;
}

function getRaycaster() {
  return raycaster;
}

export { createRaycaster, getRaycaster };
