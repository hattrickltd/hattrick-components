
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

export function grouped(val: number): string {
  return val.toLocaleString("sv");
}

export function currency(money: number, rate: number, name: string): string {
  money = money / rate;

  if (name) {
    return grouped(money) + " " + name;
  } else {
    return grouped(money);
  }
}