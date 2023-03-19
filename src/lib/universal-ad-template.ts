import { render } from "./template-engine";
import { getProperty } from "./utility";

export interface IUniversalAdTemplate {
  id: string;
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

export function htmlText(universalAd: IUniversalAdTemplate) {
  return render(universalAd.render(), universalAd);
}

export function styleText(universalAd: IUniversalAdTemplate): string {
  const func = getProperty(universalAd, "style");
  if (!func) return "";
  return func();
}

export function generate(universalAd: IUniversalAdTemplate): string {
  const html = htmlText(universalAd);
  const style = styleText(universalAd);

  return `
    <style>
    ${style}
    </style>
    ${html}
  `;
}

export function ssrGenerate(universalAd: IUniversalAdTemplate): string {
  // 途中
  const id = universalAd.id;
  const html = htmlText(universalAd);
  const style = styleText(universalAd);
  return `
    <style>
     #${id} {
      ${style}
     }
    </style>
    <script>
      var test = {}:
    </script>
    ${html}
  `;
}

