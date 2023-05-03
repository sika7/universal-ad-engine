export function getProperty<T>(object: T | undefined, propertyPath: string, defaultValue?: any): any {
  if (!object) return defaultValue;

  let result: any = object;
  const propertyArray = propertyPath.split('.');
  for (const property of propertyArray) {
    if (property === '') return defaultValue;
    if (typeof result[property] === 'undefined') return defaultValue;
    result = result[property];
  }
  if (typeof result === 'object') return result;
  if (typeof result === 'function') return result;
  if (typeof result === 'string') return result;
  if (typeof result === 'number') return result;
  if (typeof result === 'boolean') return result;
  return result;
}
