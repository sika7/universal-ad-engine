/* eslint-disable  @typescript-eslint/no-explicit-any */
export function getProperty<T>(object: T | undefined, propertyPath: string, defaultValue?: unknown): any {
  if (!object) return defaultValue;

  let result: Record<string, unknown> = object;
  const propertyArray = propertyPath.split('.');
  for (const property of propertyArray) {
    if (property === '') return defaultValue;
    if (typeof result[property] === 'undefined') return defaultValue;
    result = result[property] as Record<string, unknown>;
  }
  if (typeof result === 'object') return result;
  if (typeof result === 'function') return result;
  if (typeof result === 'string') return result;
  if (typeof result === 'number') return result;
  if (typeof result === 'boolean') return result;
  return result;
}
