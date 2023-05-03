function getData<T>(object: unknown, propertyPath: string): T {
  const t = typeof object;
  
  if (t === 'undefined') {
    throw new Error('error data is undefined.');
  }
  if (t === 'function') {
    throw new Error('error data is function.');
  }
  if (t === 'string') {
    throw new Error('error data is string.');
  }
  if (t === 'number') {
    throw new Error('error data is number.');
  }
  if (t === 'bigint') {
    throw new Error('error data is bigint.');
  }
  if (t === 'boolean') {
    throw new Error('error data is boolean.');
  }
  if (t === 'symbol') {
    throw new Error('error data is symbol.');
  }

  let result = object as Record<string, unknown>;
  const propertyArray = propertyPath.split('.');

  for (const property of propertyArray) {
    result = result[property] as Record<string, unknown>;
  }

  return result as T;
}

export function getProperty<T, D>(object: unknown, propertyPath: string, defaultValue?: D): T | D {
  try {
    return getData<T>(object, propertyPath);
  } catch (error) {
    return defaultValue as D;
  }
}
