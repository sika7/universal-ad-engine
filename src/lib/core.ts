function variablesFormat(html: string): string {
  html = html.replace(/\{\{[ 　]+/g, "{{");
  html = html.replace(/[ 　]+\}\}/g, "}}");
  return html;
}

function getVariables(html: string): string[] {
  const findPattern = new RegExp(/\{\{(.+)\}\}/g);
  const replacePattern = new RegExp(/\{\{(.+)\}\}/);
  const data = html.match(findPattern);
  if (!data) return [];
  return data?.map((data) => data.match(replacePattern)![1]);
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

function execValue(test: Test, propertyPath: string): any {
  const func = getProperty(test, propertyPath.replace(/\(\)/g, ""));
  if (!func) return "";
  return func.call(test);
}

function replaceValue(test: Test, propertyPath: string) {
  if (propertyPath.match(/.*\(\)/)) return execValue(test, propertyPath);
  return getProperty(test, propertyPath, "");
}

function replaceData(html: string, variables: string[], test: Test) {
  variables.map(
    (data) =>
      (html = html.replace("{{" + data + "}}", replaceValue(test, data)))
  );
  return html;
}

function applyHtmlVariable(test: Test) {
  const html = test.render();

  const _html = variablesFormat(html);
  const values = getVariables(_html);
  return replaceData(_html, values, test);
}

class Test {
  constructor() {}

  render() {
    return `
<p>a</p>
<p>{{ name }}</p>
<p class="{{ name}}">テスト</p>
<p>{{ test() }}</p>
<p>{{name }}</p>
    `;
  }
}

export class Core {
  constructor() {}

  main() {
    // const test2 = {
    //   hoge: { fuga: [1, 2, 3], fuga2: 'a' },
    //   fuga: 9,
    //   piyo: "1",
    //   b: true,
    // };
    // console.log("test2", getProperty(test2, "b"));

    const test = new Test();
    console.log("test", applyHtmlVariable(test));
  }

  request() {}
}

// class HelloWorld extends HTMLElement {
//   connectedCallback() {
//     // this.textContent = "";
//
//     const shadow = this.attachShadow({ mode: "closed" });
//     shadow.innerHTML = `
//     <style>
//       p {
//         text-align: center;
//         font-weight: normal;
//         padding: 1em;
//         margin: 0 0 2em 0;
//         background-color: #eee;
//         border: 1px solid #666;
//       }
//     </style>
//           <p>テスト</p>
//
//     `;
//   }
// }
//
// const elm = document.querySelector('#app')!;
// customElements.define( 'hello-world', HelloWorld );
//
