export interface IUniversalAdTemplate {
  style?(): string;
  render(): string;
}

function normalizeVariables(html: string): string {
  html = html.replace(/\{\{[ 　]+/g, "{{");
  html = html.replace(/[ 　]+\}\}/g, "}}");
  html = html.replace(/\[click\]/g, "c");
  return html;
}

function createVariableList(html: string): string[] {
  const findPattern = new RegExp(/\{\{(.+)\}\}/g);
  const replacePattern = new RegExp(/\{\{(.+)\}\}/);
  const data = html.match(findPattern);
  if (!data) return [];
  return data.map((data) => data.match(replacePattern)![1]);
}

function getProperty<T>(
  object: T | undefined,
  propertyPath: string,
  defaultValue?: any
): any {
  if (!object) return defaultValue;

  let result: any = object;
  const propertyArray = propertyPath.split(".");
  for (const property of propertyArray) {
    if (property === "") return defaultValue;
    if (typeof result[property] === "undefined") return defaultValue;
    result = result[property];
  }
  if (typeof result === "object") return result;
  if (typeof result === "function") return result;
  if (typeof result === "string") return result;
  if (typeof result === "number") return result;
  if (typeof result === "boolean") return result;
  return result;
}

export function executeMethod(
  universalAd: IUniversalAdTemplate,
  propertyPath: string
): any {
  const func = getProperty(universalAd, propertyPath.replace(/\(\)/g, ""));
  if (!func) return "";
  return func.call(universalAd);
}

function replaceValue(universalAd: IUniversalAdTemplate, propertyPath: string) {
  if (propertyPath.match(/.*\(\)/)) return executeMethod(universalAd, propertyPath);
  return getProperty(universalAd, propertyPath, "");
}

function replaceVariable(
  html: string,
  variables: string[],
  universalAd: IUniversalAdTemplate
) {
  variables.map(
    (data) =>
      (html = html.replace("{{" + data + "}}", replaceValue(universalAd, data)))
  );
  return html;
}

export function applyHtmlVariable(universalAd: IUniversalAdTemplate) {
  const html = normalizeVariables(universalAd.render());
  const values = createVariableList(html);
  return replaceVariable(html, values, universalAd);
}
