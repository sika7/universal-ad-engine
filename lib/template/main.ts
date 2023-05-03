import { getProperty } from 'common';
import { render } from 'template/engine';

export interface Template {
  style?(): string;
  update(response: unknown): void;
  render(): string;
}

type callFunc = {
  call: (template: Template) => void
}

export function executeMethod(
  template: Template,
  propertyPath: string
): void {
  const func = getProperty<callFunc, undefined>(template, propertyPath.replace(/\(\)/g, ""));
  if (!func) return;
  func.call(template);
}

export function htmlText(template: Template) {
  return render(template.render(), template);
}

export function styleText(template: Template): string {
  const func = getProperty<() => string, undefined>(template, "style");
  if (!func) return "";
  return func();
}

export function generate(template: Template): string {
  const html = htmlText(template);
  const style = styleText(template);

  return `
    <style>
    ${style}
    </style>
    ${html}
  `;
}
