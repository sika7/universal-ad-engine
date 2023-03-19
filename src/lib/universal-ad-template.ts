import { render } from "./template-engine";
import { getProperty } from "./utility";

export interface IUniversalAdTemplate {
  style?(): string;
  render(): string;
}

export function executeMethod(
  universalAd: IUniversalAdTemplate,
  propertyPath: string
): any {
  const func = getProperty(universalAd, propertyPath.replace(/\(\)/g, ""));
  if (!func) return "";
  return func.call(universalAd);
}

export function applyHtmlVariable(universalAd: IUniversalAdTemplate) {
  return render(universalAd.render(), universalAd);
}

export function styleText(universalAd: IUniversalAdTemplate): string {
  const func = getProperty(universalAd, "style");
  if (!func) return "";
  return func();
}
