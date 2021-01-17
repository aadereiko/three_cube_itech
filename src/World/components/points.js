import {
  BufferGeometry,
  Float32BufferAttribute,
  MathUtils,
  Points,
  PointsMaterial,
} from 'three';

const generateRandPositionCoordinate = () =>
  MathUtils.randFloat(0, 1) > 0.5
    ? MathUtils.randFloat(2, 10)
    : MathUtils.randFloat(-10, -2);

function createPoints() {
  const vertices = [];

  for (let i = 0; i < 15; i++) {
    const x = generateRandPositionCoordinate();
    const y = generateRandPositionCoordinate();
    const z = generateRandPositionCoordinate();

    vertices.push(x, y, z);
  }

  const material = new PointsMaterial({ color: 'black', size: 1 });
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

  const point = new Points(geometry, material);
  return point;
}

export { createPoints };
