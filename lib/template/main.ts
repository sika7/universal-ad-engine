import { render } from "./engine";
import { getProperty } from "../utility";

export interface Template {
  style?(): string;
  update(response: any): void;
  render(): string;
}

export function executeMethod(
  template: Template,
  propertyPath: string
): any {
  const func = getProperty(template, propertyPath.replace(/\(\)/g, ""));
  if (!func) return "";
  return func.call(template);
}

export function htmlText(template: Template) {
  return render(template.render(), template);
}

export function styleText(template: Template): string {
  const func = getProperty(template, "style");
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
