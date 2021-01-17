import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createCube } from './components/cube.js';
import { createPoints } from './components/points.js';
import { createArrowHelper } from './components/arrowHelper.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createRaycaster } from './systems/Raycaster.js';
import { createConvexSurface } from './components/convexSurface.js';

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
    const raycaster = createRaycaster();
    const arrowHelper = createArrowHelper(renderer, raycaster, camera, [cube]);
    const { frontMesh, backMesh } = createConvexSurface(points.geometry.vertices);

    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);
    const { directionalLight, ambientLight } = createLights();

    loop.updatables.push(controls);

    new Resizer(container, camera, renderer);
    scene.add(directionalLight, ambientLight);

    scene.add(cube, points, arrowHelper, frontMesh, backMesh);
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
