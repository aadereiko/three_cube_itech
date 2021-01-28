import {
  Geometry,
  Mesh,
  Vector3,
  Face3,
  DoubleSide,
  MeshLambertMaterial,
  BackSide,
  FrontSide,
  Triangle,
} from "three";

// to get the angle beetween the middle point and the point of triangle
const getAngle = (center, point) => {
  let angle = Math.atan2(point.y - center.y, point.x - center.x);

  if (angle < 0) {
    angle += 2 * Math.PI;
  }

  return angle;
};

// indices: [number, number, number]
const getCCWOrderedIndicesArray = (geometry, indices) => {
  const a = geometry.vertices[indices[0]];
  const b = geometry.vertices[indices[1]];
  const c = geometry.vertices[indices[2]];

  const triangle = new Triangle(a, b, c);
  const triangleCenter = new Vector3();
  triangle.getMidpoint(triangleCenter);

  const aAngle = getAngle(triangleCenter, triangle.a);
  const bAngle = getAngle(triangleCenter, triangle.b);
  const cAngle = getAngle(triangleCenter, triangle.c);

  const pointsWithIndexesAndAngles = [
    { angle: aAngle, index: indices[0] },
    { angle: bAngle, index: indices[1] },
    { angle: cAngle, index: indices[2] },
  ].sort((aPoint, bPoint) => aPoint.angle - bPoint.angle);

  const orderedIndices = pointsWithIndexesAndAngles.map(({ index }) => index);
  return orderedIndices;
};

const formGeometry = (vertices) => {
  const geometry = new Geometry();

  const verticesSortedCopy = vertices
    .map((vertix) => new Vector3(vertix.x, vertix.y, vertix.z))
    .sort((vertA, vertB) => vertA.x - vertB.x);

  geometry.vertices = verticesSortedCopy;

  // took only for 5 points
  geometry.faces.push(
    new Face3(...getCCWOrderedIndicesArray(geometry, [4, 3, 2]))
  );
  geometry.faces.push(
    new Face3(...getCCWOrderedIndicesArray(geometry, [2, 1, 0]))
  );
  geometry.faces.push(
    new Face3(...getCCWOrderedIndicesArray(geometry, [3, 2, 1]))
  );
  geometry.faces.push(
    new Face3(...getCCWOrderedIndicesArray(geometry, [4, 0, 1]))
  );
  geometry.computeFaceNormals();

  return geometry;
};

function createSurfaceFaces(vertices) {
  const material = new MeshLambertMaterial({
    color: 0xffffff,
    opacity: 0.5,
    transparent: true,
    material: DoubleSide,
  });

  const geometry = formGeometry(vertices);
  const frontSurface = new Mesh(geometry, material);
  const backSurface = new Mesh(geometry, material.clone());

  frontSurface.material.side = BackSide;
  frontSurface.renderOrder = 0;

  backSurface.material.side = FrontSide;
  backSurface.renderOrder = 1;

  return { frontSurface, backSurface };
}

export { createSurfaceFaces };
