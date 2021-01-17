import {
  BufferGeometry,
  Float32BufferAttribute,
  Geometry,
  MathUtils,
  Points,
  PointsMaterial,
  Vector3,
} from 'three';

const generateRandPositionCoordinate = () =>
  MathUtils.randFloat(0, 1) > 0.5
    ? MathUtils.randFloat(2, 10)
    : MathUtils.randFloat(-10, -2);

function createPoints() {
  const geometry = new Geometry();

  for (let i = 0; i < 15; i++) {
    const x = generateRandPositionCoordinate();
    const y = generateRandPositionCoordinate();
    const z = generateRandPositionCoordinate();

    geometry.vertices.push(new Vector3(x, y, z));
  }

  const material = new PointsMaterial({ color: 'black', size: 1 });

  const points = new Points(geometry, material);
  return points;
}

export { createPoints };
