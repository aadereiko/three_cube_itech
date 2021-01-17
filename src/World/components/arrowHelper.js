import { ArrowHelper, Vector3 } from 'three';

function createArrowHelper(renderer, raycaster, camera, sceneMeshes) {
  const arrowHelper = new ArrowHelper(
    new Vector3(),
    new Vector3(),
    10,
    'white'
  );

  renderer.domElement.addEventListener(
    'mousemove',
    (event) => {
      raycaster.setFromCamera(
        {
          x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
          y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
        },
        camera
      );

      const intersects = raycaster.intersectObjects(sceneMeshes, false);
      if (intersects.length > 0) {
        let n = new Vector3();
        n.copy(intersects[0].face.normal);
        n.transformDirection(intersects[0].object.matrixWorld);
        arrowHelper.setDirection(n);
        arrowHelper.position.copy(intersects[0].point);
      }
    },
    false
  );
  return arrowHelper;
}

export { createArrowHelper };
