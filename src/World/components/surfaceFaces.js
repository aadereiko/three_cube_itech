import {
  Geometry,
  Mesh,
  Vector3,
  Face3,
  DoubleSide,
  MeshLambertMaterial,
  BackSide,
  FrontSide
} from "three";

function createSurfaceFaces(vertices) {
    const material = new MeshLambertMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
      material: DoubleSide
    });



  const geometry = new Geometry();

  const verticesSortedCopy = vertices.map(
    (vertix) => new Vector3(vertix.x, vertix.y, vertix.z)
  ).sort((vertA, vertB) => vertA.x - vertB.x);
  geometry.vertices = verticesSortedCopy;
  geometry.faces = [
    //   new Face3(14, 13, 12),
    //   new Face3(11, 10, 9),
    //   new Face3(8, 7, 6),
    //   new Face3(5, 4, 3),
    //   new Face3(2, 1, 0),
    //   new Face3(4, 3, 1),
    //   new Face3(5, 3, 2),
      new Face3(4, 3, 2),
      new Face3(5, 4, 3),
      new Face3(6, 4, 5),
    ];
  geometry.computeFaceNormals();
  const frontSurface = new Mesh(geometry, material);
  const backSurface = new Mesh(geometry, material.clone());

  frontSurface.material.side = BackSide;
  frontSurface.renderOrder = 0;

  backSurface.material.side = FrontSide;
  backSurface.renderOrder = 1;

  return { frontSurface, backSurface } ;
}

export { createSurfaceFaces };
