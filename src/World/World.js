import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";
import { createCube } from "./components/cube.js";
import { createPoints } from "./components/points.js";

import { createControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import { createSurfaceFaces } from "./components/surfaceFaces.js";
import { createLines } from "./components/lines.js";

let camera;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();

    const cube = createCube();
    const points = createPoints();
    const pointsToProjectVertices = points.geometry.vertices.slice(0, 5);
    const lines = createLines(pointsToProjectVertices, cube);
    const surfaceFaces = createSurfaceFaces(pointsToProjectVertices);

    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);
    const { directionalLight, ambientLight } = createLights();

    loop.updatables.push(controls);

    new Resizer(container, camera, renderer);
    scene.add(directionalLight, ambientLight);


    scene.add(cube);
    scene.add(points);
    scene.add(...lines);
    scene.add(surfaceFaces.frontSurface, surfaceFaces.backSurface);
    // scene.add(frontMesh, backMesh);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
