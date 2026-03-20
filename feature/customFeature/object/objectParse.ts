export function getTypedObjectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function getTypedObjectValues<T extends object>(obj: T): T[keyof T][] {
  return Object.values(obj) as T[keyof T][];
}