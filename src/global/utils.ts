
export function generateIdPath(id: number) {
  return [
    generateId(id, 100000),
    generateId(id, 10000),
    generateId(id, 1000),
    id,
  ].join("/");

  function generateId(id: number, range: number) {
    return Math.floor(id / range) + 1;
  }
}