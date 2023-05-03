import { getProperty } from 'utility';

export function getMethodList(object: object) {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(object));
}

function getObjectFromInstance(instance: Record<string, unknown>): Record<string, unknown> {
  const keys = Object.getOwnPropertyNames(instance);
  const obj: Record<string, unknown> = {};
  keys.forEach((key) => {
    const data = instance[key];
    if (typeof data === 'function') {
      obj[key] = data();
    } else {
      obj[key] = data;
    }
  });
  return obj;
}

export function normalizeVariables(html: string): string {
  // eslint-disable-next-line no-irregular-whitespace
  html = html.replace(/\{\{[ 　]+/g, '{{');
  // eslint-disable-next-line no-irregular-whitespace
  html = html.replace(/[ 　]+\}\}/g, '}}');
  html = html.replace(/\[click\]/g, 'c');
  return html;
}

export function createVariableList(html: string): string[] {
  const findPattern = new RegExp(/\{\{(.*?)\}\}/g);
  const replacePattern = new RegExp(/\{\{(.+)\}\}/);
  const data = html.match(findPattern);
  if (!data) return [];
  return data
    .map((data) => {
      const item = data.match(replacePattern);
      if (item === null) return '';
      if (!item[1]) return '';
      return item[1];
    })
    .filter((data) => data !== '');
}

function variableExpansion(html: string, variables: string[], object: Record<string, unknown>): string {
  variables.forEach((variable) => {
    const regex = new RegExp(`{{${variable}}}`, 'g');
    const result = getProperty<string, string>(object, variable, '');
    html = html.replace(regex, result);
  });
  return html;
}

export function render(text: string, object: object): string {
  const _text = normalizeVariables(text);
  const values = createVariableList(_text);
  const _object = getObjectFromInstance(object as Record<string, unknown>);
  return variableExpansion(_text, values, _object);
}
