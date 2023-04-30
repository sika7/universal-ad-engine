import { render } from "./engine";
import { getProperty } from "../utility";

export interface Template {
  style?(): string;
  update(response: any): void;
  render(): string;
}

export function executeMethod(
  universalAd: Template,
  propertyPath: string
): any {
  const func = getProperty(universalAd, propertyPath.replace(/\(\)/g, ""));
  if (!func) return "";
  return func.call(universalAd);
}

export function htmlText(universalAd: Template) {
  return render(universalAd.render(), universalAd);
}

export function styleText(universalAd: Template): string {
  const func = getProperty(universalAd, "style");
  if (!func) return "";
  return func();
}

export function generate(universalAd: Template): string {
  const html = htmlText(universalAd);
  const style = styleText(universalAd);

  return `
    <style>
    ${style}
    </style>
    ${html}
  `;
}
