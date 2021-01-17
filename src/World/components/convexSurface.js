import { ConvexBufferGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
import { BackSide, FrontSide, Mesh, MeshLambertMaterial } from 'three';

function createConvexSurface(vertices) {
  const material = new MeshLambertMaterial({
    color: 0xffffff,
    opacity: 0.5,
    transparent: true,
  });

  const geometry = new ConvexBufferGeometry(vertices);
  const frontMesh = new Mesh(geometry, material);
  frontMesh.material.side = BackSide;
  frontMesh.renderOrder = 0;

  const backMesh = new Mesh(geometry, material.clone());
  backMesh.material.side = FrontSide;
  backMesh.renderOrder = 1;

  return { frontMesh, backMesh };
}

export { createConvexSurface };
