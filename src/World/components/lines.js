import {
  BufferGeometry,
  Geometry,
  Line,
  LineBasicMaterial,
  Triangle,
  Vector3,
} from "three";

const calculateClosestPoint = (mesh, point) => {
  const { geometry } = mesh;
  const { index } = geometry;
  const { position } = geometry.attributes;
  const { itemSize } = position;

  let minDistance = Infinity;
  let temp = new Vector3();
  let closestPoint = new Vector3();
  let isExisting = false;
  let triangle = new Triangle();

  for (let i = 0; i < index.count; i += itemSize) {
    const a = index.getX(i);
    const b = index.getX(i + 1);
    const c = index.getX(i + 2);

    triangle.a.fromBufferAttribute(position, a);
    triangle.b.fromBufferAttribute(position, b);
    triangle.c.fromBufferAttribute(position, c);

    triangle.closestPointToPoint(point, temp);
    const distance = point.distanceToSquared(temp);

    if (distance < minDistance) {
        isExisting = true;
        minDistance = distance;
        closestPoint.copy(temp);
    }
  }

  return isExisting ? closestPoint : null;
};

function createLines(pointsVertices, meshToProject) {
  const lines = [];
  const lineMaterial = new LineBasicMaterial({
    color: "black",
  });
  const linePoints = [];

  pointsVertices.forEach((point, index) => {
      const closestPoint = calculateClosestPoint(meshToProject, point);
      // if the closest point found
      if (closestPoint) {
        linePoints.push(new Vector3(point.x, point.y, point.z));
        linePoints.push(closestPoint);
        const lineGeometry = new BufferGeometry().setFromPoints(linePoints);
        const line = new Line(lineGeometry, lineMaterial);
        line.name = `Line ${index}`;
        lines.push(line);
        linePoints.pop();
        linePoints.pop();
    }
  });
  return lines;
}

export { createLines };
